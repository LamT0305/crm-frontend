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
import useActivity from "./useActivity";

const useEmail = () => {
  const { logout } = useAuth();
  const { handleAddActivity } = useActivity();
  const { isLoading, emails, filteredEmails } = useSelector(
    (state) => state.email
  );
  const dispatch = useDispatch();
  const token = getToken();
  const currentRecipientRef = useRef(null);

  useEffect(() => {
    const socket = io("https://crm-backend-bz03.onrender.com");

    socket.on("connect", () => {
      console.log("📧 Connected to email socket");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (userId) {
          socket.emit("join", userId);
          console.log("🔗 Joined email room:", userId);
        }
      }
    });

    socket.on("updateEmails", (data) => {
      handleGetEmails(data.customerId);
      
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      notify.error("Connection error occurred");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from email socket");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      console.log("🔌 Cleaning up socket connection");
      socket.disconnect();
      currentRecipientRef.current = null;
    };
  }, [token]); // Add token dependency to reconnect if token changes

  const handleGetEmails = async (recipient) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(recipient).emails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setEmails(res.data.data.emails));
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      if (error.response?.status === 401) {
        logout();
        alert("Session expired. Please login again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendEmail = async (email, customerId, subject) => {
    try {
      const res = await axiosInstance.post(POST_API().email, email, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        dispatch(sendEmail(res.data.email));
        // activity

        const activity = {
          customerId: customerId,
          type: "email",
          subject: "has sent an email with subject: " + '"' + subject + '"',
        };
        handleAddActivity(activity);
        notify.success("Email sent successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        logout();
        alert("Session expired. Please login again.");
      }
    }
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      const res = await axiosInstance.delete(DELETE_API(emailId).email, {
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
        alert("Session expired. Please login again.");
      }
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
