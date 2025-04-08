import React, { useEffect, useState } from "react";
import useMessage from "../hooks/useMessage";
import ChatList from "../components/message/ChatList";
import ChatBox from "../components/message/ChatBox";
import GroupList from "../components/message/GroupList";
import CreateGroup from "../components/message/CreateGroup";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/message/LoadingScreen";
import useWorkspace from "../hooks/useWorkspace";

const Message = () => {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const {
    messages,
    conversations,
    groups,
    groupMessages,
    loading,
    currentChat,
    sendMessage,
    getMessages,
    getConversations,
    markMessageAsRead,
    removeMessage,
    createGroup,
    getGroups,
    sendGroupMessage,
    getGroupMessages,
    removeGroupMessage,
    addMemberToGroup,
    setActiveChat,
  } = useMessage();

  useEffect(() => {
    const initializeChat = async () => {
      await Promise.all([getConversations(), getGroups()]);
    };
    initializeChat();
  }, [currentWorkspace]);

  useEffect(() => {
    if (!currentChat) {
      if (conversations.length > 0) {
        const firstChat = { ...conversations[0], type: "direct" };
        setActiveChat(firstChat);
        getMessages(firstChat._id);
      } else if (groups.length > 0) {
        const firstGroup = { ...groups[0], type: "group" };
        setActiveChat(firstGroup);
        getGroupMessages(firstGroup._id);
      }
    } else {
      // Fetch messages when currentChat changes
      if (currentChat.type === "direct") {
        getMessages(currentChat._id);
      } else if (currentChat.type === "group") {
        getGroupMessages(currentChat._id);
      }
    }
  }, [conversations, groups, currentChat]);

  const handleSendMessage = async (content) => {
    if (!currentChat) return;

    if (currentChat.type === "group") {
      await sendGroupMessage(content);
    } else {
      await sendMessage(content);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!currentChat) return;

    if (currentChat.type === "direct") {
      await removeMessage(messageId);
    } else if (currentChat.type === "group") {
      await removeGroupMessage(currentChat._id, messageId);
    }
  };

  const handleCreateGroup = async (name, members) => {
    await createGroup(name, members);
    setShowCreateGroup(false);
  };

  const handleAddMember = async (groupId, memberId) => {
    await addMemberToGroup(groupId, memberId);
  };

  return (
    <div className="h-screen w-[80%] bg-white">
      <div className="h-full flex">
        {/* Sidebar */}
        <div className="w-full sm:w-1/3 md:w-1/4 border-r border-gray-200 flex flex-col">
          <div className="h-full flex flex-col overflow-hidden">
            {/* Split container */}
            <div className="flex-1 flex flex-col">
              {/* Direct Messages - 50% */}
              <div className="h-1/2 overflow-y-auto border-b border-gray-200">
                <ChatList
                  conversations={conversations}
                  currentChat={currentChat}
                  onSelectChat={setActiveChat}
                />
              </div>
              {/* Group Messages - 50% */}
              <div className="h-1/2 overflow-y-auto">
                <GroupList
                  groups={groups}
                  currentChat={currentChat}
                  onSelectChat={setActiveChat}
                  onCreateGroup={() => setShowCreateGroup(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="hidden sm:flex sm:w-2/3 md:w-3/4 flex-col">
          <ChatBox
            currentUser={user}
            currentChat={currentChat}
            messages={
              currentChat?.type === "direct"
                ? messages
                : groupMessages[currentChat?._id] || []
            }
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
            loading={loading}
          />
        </div>
      </div>

      <CreateGroup
        open={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default Message;
