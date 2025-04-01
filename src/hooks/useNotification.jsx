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
      notify.info("New email received!");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, token]);

  const fetchNotifications = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().notifications, {
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

  const fetchUnreadCount = async () => {
    try {
      const response = await axiosInstance.get(
        GET_API().unreadNotificationsCount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setUnreadCount(response.data.data.count));
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await axiosInstance.patch(
        PUT_API(notificationId).notificationRead,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(updateNotification(response.data.data));
        fetchUnreadCount();
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const markAllAsReadHandler = async () => {
    try {
      const res = await axiosInstance.patch(
        PUT_API().allNotificationsRead,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        dispatch(markAllAsRead());
        fetchUnreadCount();
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const deleteNotificationHandler = async (notificationId) => {
    try {
      const res = await axiosInstance.delete(
        DELETE_API(notificationId).notification,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        dispatch(removeNotification(notificationId));
        fetchUnreadCount();
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [token]);

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
