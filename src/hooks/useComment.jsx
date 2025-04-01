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
import { notify } from "../utils/Toastify";
import useActivity from "./useActivity";

const useComment = () => {
  const { isLoading, comments } = useSelector((state) => state.comment);
  const { handleAddActivity } = useActivity();

  const dispatch = useDispatch();
  const token = getToken();

  const handleGetComments = async (customerId) => {
    try {
      if (!customerId) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(customerId).comments, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setComments(res.data.data));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch comments");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddComment = async (comment, customerId) => {
    try {
      if (!comment) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().comment, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addComment(res.data.data));
        notify.success("Comment added successfully");
        const activity = {
          customerId: customerId,
          type: "comment",
          subject: `added a comment "${comment.get("content")}"`,
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to add comment");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCmt = async (id, customerId, content) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteComment(id));
        notify.success("Comment deleted successfully");
        const activity = {
          customerId: customerId,
          type: "comment",
          subject: "has deleted comment: " + '"' + content + '"',
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to delete comment");
    } finally {
      dispatch(setLoading(false));
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
