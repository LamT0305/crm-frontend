import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setEmails,
  sendEmail,
  receiveEmail,
} from "../redux/slice/emailSlice";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import { GET_API, POST_API } from "../services/APIs";
import { useAuth } from "../context/AuthContext";

const useEmail = () => {
  const { logout } = useAuth();
  const { isLoading, emails } = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const token = getToken();

  const handleGetEmails = async (recipient) => {
    try {
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
      console.log(error);
      if (error.status === 401) {
        logout();
      }
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
        console.log(res.data);
        dispatch(sendEmail(res.data.email));
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };
  return {
    isLoading,
    emails,
    handleGetEmails,
    handleSendEmail,
  };
};

export default useEmail;
