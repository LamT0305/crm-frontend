import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setTasks,
  addTask,
  deleteTask,
  getTask,
  updateTask,
  filterTask,
  sortTask,
} from "../redux/slice/taskSlice";

const useTask = () => {
  const { isLoading, filteredTasks, task } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const token = getToken();

  const handleGetAllTasks = async () => {
    try {
      const res = await axiosInstance.get(GET_API().getAllTasks, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setTasks(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTasksOfCustomer = async (customerId) => {
    try {
      if (customerId === undefined) return;
      const res = await axiosInstance.get(
        GET_API(customerId).getTasksOfCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(setTasks(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const res = await axiosInstance.post(POST_API().createTask, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addTask(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (id, task) => {
    try {
      const res = await axiosInstance.put(PUT_API(id).updateTask, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(updateTask(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await axiosInstance.delete(DELETE_API(id).deleteTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteTask(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTaskById = async (id) => {
    try {
      const res = await axiosInstance.get(GET_API(id).getTaskById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getTask(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterTasks = async (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }
      dispatch(filterTask({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterTasks:", error);
    }
  };

  const handleSortTasks = async (field, order) => {
    try {
      if (!field || order === undefined) {
        return;
      }
      dispatch(sortTask({ field, order }));
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isLoading,
    tasks: filteredTasks,
    task,
    handleGetAllTasks,
    handleGetTasksOfCustomer,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleGetTaskById,
    handleFilterTasks,
    handleSortTasks,
  };
};

export default useTask;
