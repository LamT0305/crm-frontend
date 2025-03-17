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
      const res = await axiosInstance.get(GET_API(id).getActivities, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setActivity(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddActivity = async (activity) => {
    try {
      const res = await axiosInstance.post(
        POST_API().createActivity,
        activity,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(addActivity(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    activities,
    handleGetActivities,
    handleAddActivity,
  };
};

export default useActivity;
