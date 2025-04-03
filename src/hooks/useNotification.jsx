import { useDispatch, useSelector } from "react-redux";
import { GET_API, DELETE_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setError,
  setNotifications,
  removeNotification,
} from "../redux/slice/notiSlice";
import { useEffect } from "react";
import useWorkspace from "./useWorkspace";

const useNotification = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading, error } = useSelector(
    (state) => state.noti
  );
  const token = getToken();

  

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
    }
  }, [token]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    deleteNotificationHandler,
    fetchNotifications,
  };
};

export default useNotification;
