import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_API, POST_API, PUT_API, DELETE_API } from "../services/APIs";
import axiosInstance from "../services/Axios";
import { getToken } from "../utils/auth";
import { notify } from "../utils/Toastify";
import {
  setLoading,
  setError,
  setMessages,
  addMessage,
  deleteMessage,
  setConversations,
  updateMessageReadStatus,
  setGroups,
  addGroup,
  setGroupMessages,
  addGroupMessage,
  deleteGroupMessage,
  updateGroupMessageReadStatus,
  setCurrentChat,
  incrementUnreadCount,
  setGroup,
  deleteGroup,
  updateConversationUnreadCount,
  updateGroupUnreadCount,
  setAttachments,
} from "../redux/slice/messageSlice";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const useMessage = () => {
  const dispatch = useDispatch();
  const {
    messages,
    conversations,
    groups,
    groupMessages,
    loading,
    error,
    currentChat,
    unreadCount,
    group,
    attachments
  } = useSelector((state) => state.message);
  const token = getToken();
  const BASE_URL = "http://localhost:3000";

  // Socket event handlers
  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (userId) {
          socket.emit("join", userId);
        }
      }
    });

    // Direct message events
    socket.on("newMessage", (data) => {
      dispatch(addMessage(data.message));
      if (data.message.receiver === currentChat?._id) {
        markMessageAsRead(data.message._id);
      } else {
        dispatch(incrementUnreadCount());
      }
      getConversations();
    });

    socket.on("messageRead", (message) => {
      dispatch(updateMessageReadStatus({ messageId: message._id }));
    });

    socket.on("messagesRead", ({ reader, conversation }) => {
      if (currentChat?._id === conversation) {
        dispatch(
          setMessages((prev) =>
            prev.map((msg) =>
              msg.receiver === reader && !msg.isRead
                ? { ...msg, isRead: true }
                : msg
            )
          )
        );
      }
    });

    socket.on("messageDeleted", ({ messageId }) => {
      dispatch(deleteMessage(messageId));
    });

    // Group message events
    socket.on("newGroup", (group) => {
      dispatch(addGroup(group));
    });

    socket.on("newGroupMessage", ({ groupId, message }) => {
      dispatch(addGroupMessage({ groupId, message }));
      if (currentChat?._id !== groupId) {
        dispatch(incrementUnreadCount());
      }
      getGroups();
    });

    socket.on("groupMessageDeleted", ({ messageId, groupId }) => {
      dispatch(deleteGroupMessage({ groupId, messageId }));
    });

    socket.on("groupMessagesRead", ({ groupId, readerId }) => {
      if (currentChat?._id === groupId) {
        dispatch(updateGroupMessageReadStatus({ groupId, userId: readerId }));
      }
    });

    socket.on("addedToGroup", (group) => {
      dispatch(addGroup(group));
    });

    socket.on("groupUpdated", (group) => {
      dispatch(
        setGroups((prev) => prev.map((g) => (g._id === group._id ? group : g)))
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageRead");
      socket.off("messagesRead");
      socket.off("messageDeleted");
      socket.off("newGroup");
      socket.off("newGroupMessage");
      socket.off("groupMessageDeleted");
      socket.off("groupMessagesRead");
      socket.off("addedToGroup");
      socket.off("groupUpdated");
    };
  }, [dispatch, token, currentChat]);

  // Direct Messages
  const sendMessage = async (content) => {
    try {
      if (!content) {
        return;
      }
      const response = await axiosInstance.post(
        POST_API().sendMessage,
        content,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        dispatch(addMessage(response.data.data));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(error.response?.data?.message || "Failed to send message");
      dispatch(setLoading(false));
      throw error;
    } finally {
    }
  };

  const getMessages = async (userId) => {
    try {
      const response = await axiosInstance.get(GET_API(userId).messages, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setMessages(response.data.data.messages));
      // Update conversation unread count
      dispatch(updateConversationUnreadCount({ userId, unreadCount: 0 }));
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(error.response?.data?.message || "Failed to fetch messages");
      throw error;
    }
  };

  const getConversations = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().conversations, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setConversations(response.data.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(
        error.response?.data?.message || "Failed to fetch conversations"
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      const response = await axiosInstance.put(
        PUT_API(messageId).markMessageRead,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateMessageReadStatus({ messageId }));
    } catch (error) {
      notify.error(error.response?.data?.message || "Failed to mark as read");
      throw error;
    }
  };

  const removeMessage = async (messageId) => {
    try {
      await axiosInstance.delete(DELETE_API(messageId).deleteMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteMessage(messageId));
    } catch (error) {
      notify.error(error.response?.data?.message || "Failed to delete message");
      throw error;
    }
  };

  // Group Messages
  const createGroup = async (name, members) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post(
        POST_API().createGroup,
        { name, members },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(addGroup(response.data.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(error.response?.data?.message || "Failed to create group");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getGroups = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().groups, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data.data) {
        dispatch(setGroups([]));
        return [];
      }
      dispatch(setGroups(response.data.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(error.response?.data?.message || "Failed to fetch groups");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const sendGroupMessage = async (content) => {
    try {
      if (!content) {
        return;
      }
      await axiosInstance.post(POST_API().sendGroupMessage, content, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(
        error.response?.data?.message || "Failed to send group message"
      );
      throw error;
    }
  };

  const getGroupMessages = async (groupId) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API(groupId).groupMessages, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(
        setGroupMessages({ groupId, messages: response.data.data.messages })
      );
      // Update group unread count
      dispatch(updateGroupUnreadCount({ groupId, unreadCount: 0 }));
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(
        error.response?.data?.message || "Failed to fetch group messages"
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeGroupMessage = async (groupId, messageId) => {
    try {
      await axiosInstance.delete(DELETE_API(messageId).deleteGroupMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteGroupMessage({ groupId, messageId }));
    } catch (error) {
      notify.error(
        error.response?.data?.message || "Failed to delete group message"
      );
      throw error;
    }
  };

  const addMemberToGroup = async (groupId, memberId) => {
    try {
      const response = await axiosInstance.post(
        POST_API().addGroupMember,
        { groupId, memberId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      notify.error(
        error.response?.data?.message || "Failed to add member to group"
      );
      throw error;
    }
  };

  const setActiveChat = (chatData) => {
    dispatch(setCurrentChat(chatData));
  };

  const setGroupDetails = async (groupId) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API(groupId).groupDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        dispatch(setGroup(response.data.data));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(
        error.response?.data?.message || "Failed to fetch group details"
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteGroup = async (groupId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.delete(DELETE_API(groupId).deleteGroup, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        dispatch(deleteGroup(groupId));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(error.response?.data?.message || "Failed to delete group");
      throw error;
    }
    dispatch(setLoading(false));
  };

  const handleGetAttachmentsInDirectMS = async (userId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(
        GET_API(userId).getAttachmentsInDirectMS,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        dispatch(setAttachments(response.data.data));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(
        error.response?.data?.message || "Failed to fetch attachments"
      );
      throw error;
    }
    dispatch(setLoading(false));
  };

  const handleGetAttachmentsInGroupMS = async (groupId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(
        GET_API(groupId).getAttachmentsInGroupMS,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        dispatch(setAttachments(response.data.data));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
      notify.error(
        error.response?.data?.message || "Failed to fetch attachments"
      );
      throw error;
    }
    dispatch(setLoading(false));
  };

  return {
    // State
    messages,
    conversations,
    groups,
    groupMessages,
    loading,
    error,
    currentChat,
    group,
    attachments,

    // Direct Message Methods
    sendMessage,
    getMessages,
    getConversations,
    markMessageAsRead,
    removeMessage,
    // Attachments Methods
    handleGetAttachmentsInDirectMS,
    handleGetAttachmentsInGroupMS,

    // Group Message Methods
    createGroup,
    getGroups,
    sendGroupMessage,
    getGroupMessages,
    removeGroupMessage,
    addMemberToGroup,
    setGroupDetails,
    handleDeleteGroup,

    // Utility Methods
    setActiveChat,
  };
};

export default useMessage;
