import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setError,
  setNotifications,
  updateNotification,
  removeNotification,
  setUnreadCount,
  markAllAsRead,
  addNotification,
} from "../redux/slice/notiSlice";
import { useEffect } from "react";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { notify } from "../utils/Toastify";
const useNotification = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading, error } = useSelector(
    (state) => state.noti
  );
  const token = getToken();

  // Initialize Socket.IO connection
  useEffect(() => {
    const socket = io("https://crm-backend-bz03.onrender.com");

    socket.on("connect", () => {
      console.log("Connected to notification socket");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (userId) {
          socket.emit("join", userId);
        }
      }
    });

    socket.on("newEmail", (data) => {
      dispatch(addNotification(data.data.notification));
      // Add toast notification for new email
      notify.info("New email received!");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().getNotifications, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setNotifications(response.data.data));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Get unread notifications count
  const fetchUnreadCount = async () => {
    try {
      const response = await axiosInstance.get(GET_API().getUnreadCount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUnreadCount(response.data.data.count));
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await axiosInstance.patch(
        PUT_API(notificationId).markNotificationAsRead,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(updateNotification(response.data.data));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Mark all notifications as read
  const markAllAsReadHandler = async () => {
    try {
      const res = await axiosInstance.patch(
        PUT_API().markAllNotificationsAsRead,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        dispatch(markAllAsRead());
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Delete notification
  const deleteNotificationHandler = async (notificationId) => {
    try {
      const res = await axiosInstance.delete(
        DELETE_API(notificationId).deleteNotification,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        dispatch(removeNotification(notificationId));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Load initial data
  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsReadHandler,
    deleteNotificationHandler,
    fetchNotifications,
    fetchUnreadCount,
  };
};

export default useNotification;
