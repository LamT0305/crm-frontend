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
  updateInteraction,
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
      dispatch(setLoading(true));
      const res = await axiosInstance.get(
        GET_API(customerId).getCustomerCareByCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
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
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        POST_API().createCustomerCare,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(addInteraction(res.data.data));
        await handleAddActivity({
          customerId: data.customerId,
          type: "customer",
          subject: `Created a new ${data.type.toLowerCase()} interaction`,
        });
        notify.success("Interaction recorded successfully");
        return true;
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to record interaction");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateInteraction = async (id, data) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.put(
        PUT_API(id).updateCustomerCare,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(updateInteraction(res.data.data));
        notify.success("Interaction updated successfully");
        return true;
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to update interaction");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteInteraction = async (id, data) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(
        DELETE_API(id).deleteCustomerCare,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).getCustomerCareById, {
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
    handleUpdateInteraction,
    handleDeleteInteraction,
    handleGetInteractionById,
    handleFilterByType,
    handleFilterByNotes,
    handleSortByDate,
    handleClearInteraction,
  };
};

export default useCustomerCare;
