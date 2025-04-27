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
  filterByStatus,
} from "../redux/slice/taskSlice";
import { notify } from "../utils/Toastify";
import useActivity from "./useActivity";

const useTask = () => {
  const { isLoading, filteredTasks, task } = useSelector((state) => state.task);
  const { handleAddActivity } = useActivity();

  const dispatch = useDispatch();
  const token = getToken();

  const handleGetTasksOfCustomer = async (customerId) => {
    try {
      if (!customerId) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(customerId).customerTasks, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setTasks(res.data.data));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch customer tasks");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddTask = async (task, customerId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().task, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addTask(res.data.data));
        notify.success("Task added successfully");
        const activity = {
          customerId: customerId,
          type: "task",
          subject: "updated a task: " + '"' + task.get("title") + '"',
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to add task");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateTask = async (id, task, customerId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.put(PUT_API(id).task, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(updateTask(res.data.data));
        notify.success("Task updated successfully");
        const activity = {
          customerId: customerId,
          type: "task",
          subject: "updated a task: " + '"' + task.get("title") + '"',
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to update task");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteTask(id));
        notify.success("Task deleted successfully");
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to delete task");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetTaskById = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).taskById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getTask(res.data.data));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch task details");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFilterTasks = (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }
      dispatch(filterTask({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterTasks:", error);
      notify.error("Error filtering tasks");
    }
  };

  const handleSortTasks = (order) => {
    try {
      if (order === undefined) {
        return;
      }
      dispatch(sortTask({ order }));
    } catch (error) {
      console.log(error);
      notify.error("Error sorting tasks");
    }
  };

  const handleFilterByStatus = (status) => {
    dispatch(filterByStatus({ status }));
  };

  return {
    isLoading,
    tasks: filteredTasks,
    task,
    handleGetTasksOfCustomer,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleGetTaskById,
    handleFilterTasks,
    handleSortTasks,
    handleFilterByStatus,
  };
};

export default useTask;
