import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setCategories,
  addCategory,
  deleteCategory,
} from "../redux/slice/categorySlice";
import { notify } from "../utils/Toastify";

const useCategory = () => {
  const dispatch = useDispatch();
  const token = getToken();
  const { categories, isLoading } = useSelector((state) => state.category);

  const handleSetCategories = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API().category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setCategories(res.data.data));
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to fetch categories");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreateCategory = async (data) => {
    try {
      if (!data?.name?.trim()) {
        notify.error("Category name is required");
        return;
      }
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().category, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addCategory(res.data.data));
        notify.success("Category created successfully");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409) {
        notify.error("Category already exists");
      } else {
        notify.error("Failed to create category");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteCategory(id));
        notify.success("Category deleted successfully");
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to delete category");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    categories,
    isLoading,
    handleSetCategories,
    handleCreateCategory,
    handleDeleteCategory,
  };
};

export default useCategory;
