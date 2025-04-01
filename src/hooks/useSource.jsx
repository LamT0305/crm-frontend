import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setSources,
  addSource,
  deleteSource,
} from "../redux/slice/sourceSlice";
import axiosInstance from "../services/Axios";
import { getToken } from "../utils/auth";
import { DELETE_API, GET_API, POST_API } from "../services/APIs";

const useSource = () => {
  const { isLoading, sources } = useSelector((state) => state.source);
  const dispatch = useDispatch();
  const token = getToken();

  const handleGetSources = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API().sources, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setSources(res.data.data.sources));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddSource = async (source) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        POST_API().source,
        { name: source },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(addSource(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteSource = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).source, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteSource(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    isLoading,
    sources,
    handleGetSources,
    handleAddSource,
    handleDeleteSource,
  };
};

export default useSource;
