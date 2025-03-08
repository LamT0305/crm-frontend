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
      const res = await axiosInstance.get(GET_API().getSources, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setSources(res.data.sources));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSource = async (source) => {
    try {
      const res = await axiosInstance.post(
        POST_API().createSource,
        { name: source },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(addSource(res.data.source));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSource = async (id) => {
    try {
      const res = await axiosInstance.delete(DELETE_API(id).deleteSource, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteSource(id));
      }
    } catch (error) {
      console.log(error);
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
