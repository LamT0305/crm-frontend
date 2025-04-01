import { useDispatch, useSelector } from "react-redux";
import { DELETE_API, GET_API, POST_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setActivity,
  addActivity,
} from "../redux/slice/activitySlice";

const useActivity = () => {
  const { activities, isLoading } = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const token = getToken();

  const handleGetActivities = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).activities, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setActivity(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddActivity = async (activity) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().activity, activity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addActivity(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).activity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        // Add appropriate dispatch action for deletion if needed
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    activities,
    isLoading,
    handleGetActivities,
    handleAddActivity,
    handleDeleteActivity,
  };
};

export default useActivity;
