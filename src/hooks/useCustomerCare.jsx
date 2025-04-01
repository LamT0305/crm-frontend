import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../services/Axios";
import { GET_API, POST_API, PUT_API, DELETE_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import { notify } from "../utils/Toastify";
import {
  setLoading,
  setInteractions,
  addInteraction,
  deleteInteraction,
  getInteractionById,
  filterInteractionsByType,
  filterInteractionsByNotes,
  sortInteractionsByDate,
  clearInteraction,
} from "../redux/slice/customerCareSlice";
import useActivity from "./useActivity";

const useCustomerCare = () => {
  const { handleAddActivity } = useActivity();
  const dispatch = useDispatch();
  const token = getToken();
  const { filteredInteractions, isLoading, interaction } = useSelector(
    (state) => state.customerCare
  );

  const handleSetInteractions = async (customerId) => {
    try {
      if (!customerId) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(customerId).customerCare, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log();
        dispatch(setInteractions(res.data.data.interactions));
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to fetch interactions");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreateInteraction = async (data) => {
    try {
      if (!data) return false;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().customerCare, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(addInteraction(res.data.data));
        await handleAddActivity({
          customerId: data.customerId,
          type: "customer",
          subject: `Created a new ${data.type.toLowerCase()} interaction`,
        });
        notify.success("Interaction recorded successfully");
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to record interaction");
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const handleDeleteInteraction = async (id, data) => {
    try {
      if (!id || !data) return false;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).customerCare, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteInteraction(id));
        await handleAddActivity({
          customerId: data.customerId._id,
          type: "customer",
          subject: `deleted "${data.type.toLowerCase()}" interaction`,
        });
        notify.success("Interaction deleted successfully");
        return true;
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to delete interaction");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetInteractionById = async (id) => {
    try {
      if (!id) return null;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).customerCareById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(getInteractionById(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to fetch interaction details");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFilterByType = (type) => {
    dispatch(filterInteractionsByType(type));
  };

  const handleFilterByNotes = (searchText) => {
    dispatch(filterInteractionsByNotes(searchText));
  };

  const handleSortByDate = (order) => {
    dispatch(sortInteractionsByDate(order));
  };

  const handleClearInteraction = () => {
    dispatch(clearInteraction());
  };

  return {
    interactions: filteredInteractions,
    isLoading,
    interaction,
    handleSetInteractions,
    handleCreateInteraction,
    handleDeleteInteraction,
    handleGetInteractionById,
    handleFilterByType,
    handleFilterByNotes,
    handleSortByDate,
    handleClearInteraction,
  };
};

export default useCustomerCare;
