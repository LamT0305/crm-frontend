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
  updateNote,
} from "../redux/slice/noteSlice";

const useNote = () => {
  const { isLoading, notes, note } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const token = getToken();

  const handleGetCustomerNotes = async (id) => {
    try {
      const res = await axiosInstance.get(GET_API(id).getCustomerNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setNotes(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const res = await axiosInstance.post(POST_API().createNote, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addNote(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await axiosInstance.delete(DELETE_API(id).deleteNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteNote(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetNoteById = async (id) => {
    try {
      const res = await axiosInstance.get(GET_API(id).getNoteById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getNote(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isLoading,
    notes,
    note,
    handleGetCustomerNotes,
    handleAddNote,
    handleDeleteNote,
    handleGetNoteById,
  };
};

export default useNote;
