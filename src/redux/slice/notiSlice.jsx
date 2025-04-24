import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  lastUpdated: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Start loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Set all notifications
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.lastUpdated = new Date().toISOString();
    },

    // Add new notification
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (action.payload.status === "Unread") {
        state.unreadCount += 1;
      }
    },

    // Update notification
    updateNotification: (state, action) => {
      state.notifications = state.notifications.map((notif) =>
        notif._id === action.payload ? { ...notif, status: "Read" } : notif
      );
    },

    // Remove notification
    removeNotification: (state, action) => {
      const notification = state.notifications.find(
        (notif) => notif._id === action.payload
      );
      if (notification && notification.status === "Unread") {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(
        (notif) => notif._id !== action.payload
      );
    },

    // Set unread count
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },

    // Mark all as read
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notif) => ({
        ...notif,
        status: "Read",
      }));
      state.unreadCount = 0;
    },

    // Clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const {
  setLoading,
  setError,
  setNotifications,
  addNotification,
  updateNotification,
  removeNotification,
  setUnreadCount,
  markAllAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
