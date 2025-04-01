import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setNotes,
  addNote,
  deleteNote,
  getNote,
} from "../redux/slice/noteSlice";
import { notify } from "../utils/Toastify";
import useActivity from "./useActivity";

const useNote = () => {
  const { isLoading, notes, note } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const token = getToken();
  const { handleAddActivity } = useActivity();

  const handleGetCustomerNotes = async (customerId) => {
    try {
      if (!customerId) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(customerId).customerNotes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setNotes(res.data.data));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch customer notes");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddNote = async (note, customerId, title) => {
    try {
      if (!note) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().note, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addNote(res.data.data));
        notify.success("Note added successfully");
        const activity = {
          customerId: customerId,
          type: "note",
          subject: "added a note: " + '"' + title + '"',
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to add note");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateNote = async (id, note) => {
    try {
      if (!id || !note) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.put(PUT_API(id).note, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getNote(res.data.data));
        notify.success("Note updated successfully");
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to update note");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteNote = async (id, customerId, content) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteNote(id));
        notify.success("Note deleted successfully");
        const activity = {
          customerId: customerId,
          type: "comment",
          subject: "has deleted comment: " + '"' + content + '"',
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to delete note");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetNoteById = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).noteById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getNote(res.data.data));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch note details");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    isLoading,
    notes,
    note,
    handleGetCustomerNotes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
    handleGetNoteById,
  };
};

export default useNote;
