import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  conversations: [],
  groups: [],
  groupMessages: {},
  loading: false,
  error: null,
  currentChat: null,
  unreadCount: 0,
  group: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Direct Messages
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    updateMessageReadStatus: (state, action) => {
      const { messageId } = action.payload;
      const message = state.messages.find((msg) => msg._id === messageId);
      if (message) {
        message.isRead = true;
      }
    },
    // Group Messages
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    setGroupMessages: (state, action) => {
      const { groupId, messages } = action.payload;
      state.groupMessages[groupId] = messages;
    },
    addGroupMessage: (state, action) => {
      const { groupId, message } = action.payload;
      if (!state.groupMessages[groupId]) {
        state.groupMessages[groupId] = [];
      }
      state.groupMessages[groupId].push(message);
    },
    deleteGroupMessage: (state, action) => {
      const { groupId, messageId } = action.payload;
      if (state.groupMessages[groupId]) {
        state.groupMessages[groupId] = state.groupMessages[groupId].filter(
          (message) => message._id !== messageId
        );
      }
    },
    updateGroupMessageReadStatus: (state, action) => {
      const { groupId, messageId, userId } = action.payload;
      if (state.groupMessages[groupId]) {
        const message = state.groupMessages[groupId].find(
          (msg) => msg._id === messageId
        );
        if (message) {
          if (!message.readBy) {
            message.readBy = [];
          }
          if (!message.readBy.some((read) => read.userId === userId)) {
            message.readBy.push({ userId, readAt: new Date() });
          }
        }
      }
    },
    // Current Chat
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    // Unread Count
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    decrementUnreadCount: (state) => {
      if (state.unreadCount > 0) {
        state.unreadCount -= 1;
      }
    },
    // Reset
    resetMessages: (state) => {
      return initialState;
    },

    // group details
    setGroup: (state, action) => {
      state.group = action.payload;
    },

    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group._id !== action.payload
      );
    },

    updateConversationUnreadCount: (state, action) => {
      const { userId, unreadCount } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv._id === userId
      );
      if (conversation) {
        conversation.unreadCount = unreadCount;
      }
    },

    updateGroupUnreadCount: (state, action) => {
      const { groupId, unreadCount } = action.payload;
      const group = state.groups.find((g) => g._id === groupId);
      if (group) {
        group.unreadCount = unreadCount;
      }
    },
  },
});

export const {
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
  setUnreadCount,
  incrementUnreadCount,
  decrementUnreadCount,
  resetMessages,
  setGroup,
  deleteGroup,
  updateConversationUnreadCount,
  updateGroupUnreadCount,
} = messageSlice.actions;

export default messageSlice.reducer;
