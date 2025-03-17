import { useDispatch, useSelector } from "react-redux";
import {
  setComments,
  setLoading,
  addComment,
  deleteComment,
} from "../redux/slice/commentSlice";
import { GET_API, POST_API, DELETE_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";

const useComment = () => {
  const { isLoading, comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const token = getToken();

  const handleGetComments = async (customerId) => {
    try {
      if (customerId === undefined) return;
      const res = await axiosInstance.get(GET_API(customerId).getComments, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setComments(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async (comment) => {
    try {
      if (comment === undefined) return;

      const res = await axiosInstance.post(POST_API().createComment, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addComment(res.data.comment));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCmt = async (id) => {
    try {
      if (id === undefined) return;
      const res = await axiosInstance.delete(DELETE_API(id).deleteComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteComment(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isLoading,
    comments,
    handleGetComments,
    handleAddComment,
    handleDeleteCmt,
  };
};

export default useComment;
