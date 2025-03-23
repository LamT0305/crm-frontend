import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setEmails,
  sendEmail,
  receiveEmail,
  deleteEmail,
  filterEmail,
  sortEmailsByDate,
} from "../redux/slice/emailSlice";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import { DELETE_API, GET_API, POST_API } from "../services/APIs";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef } from "react";
import { notify } from "../utils/Toastify";

const useEmail = () => {
  const { logout } = useAuth();
  const { isLoading, emails, filteredEmails } = useSelector(
    (state) => state.email
  );
  const dispatch = useDispatch();
  const token = getToken();
  const currentRecipientRef = useRef(null);

  useEffect(() => {
    const socket = io("https://crm-backend-bz03.onrender.com");

    socket.on("connect", () => {
      console.log("Connected to email socket");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (userId) {
          socket.emit("join", userId);
        }
      }
    });

    socket.on("newEmail", (data) => {
      if (currentRecipientRef.current) {
        handleGetEmails(currentRecipientRef.current);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGetEmails = async (recipient) => {
    try {
      currentRecipientRef.current = recipient;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        POST_API().getEmails,
        { recipient },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(setEmails(res.data.emails));
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendEmail = async (email) => {
    try {
      const res = await axiosInstance.post(POST_API().sendEmail, email, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        dispatch(sendEmail(res.data.email));
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      const res = await axiosInstance.delete(DELETE_API(emailId).deleteEmail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteEmail(emailId));
        notify.success("Email deleted successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        logout();
      }
      alert("Session expired. Please login again.");
    }
  };

  const handleFilterEmails = (field, value) => {
    dispatch(filterEmail({ field, value }));
  };

  const handleSortEmails = (order) => {
    dispatch(sortEmailsByDate(order));
  };
  return {
    isLoading,
    emails: filteredEmails,
    handleGetEmails,
    handleSendEmail,
    handleDeleteEmail,
    handleFilterEmails,
    handleSortEmails,
  };
};

export default useEmail;
