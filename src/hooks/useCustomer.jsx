import { useDispatch, useSelector } from "react-redux";
import {
  setCustomers,
  sortCustomer,
  filterCustomer,
  deleteCustomer,
  clearCustomer,
  getCustomerById,
  updateCustomer,
  setTotalPages,
  setLoading,
  setCurrentPage,
  addCustomerTag,
  removeCustomerTag,
} from "../redux/slice/customerSlice";
import axiosInstance from "../services/Axios";
import { DELETE_API, GET_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import useActivity from "./useActivity";
import { notify } from "../utils/Toastify";
import { useNavigate } from "react-router-dom";

const useCustomer = () => {
  const { handleAddActivity } = useActivity();
  const { displayedCustomers, isLoading, customer, totalPages, allCustomers } =
    useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const token = getToken();
  const navigate = useNavigate();
  const handleSetCustomers = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API().customers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setCustomers(res.data.data.customers));
        const totalPages = Math.ceil(res.data.data.customers.length / 15);
        dispatch(setTotalPages(totalPages));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch customers");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleFilterCustomers = (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }
      dispatch(filterCustomer({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterCustomers:", error);
      notify.error("Error filtering customers");
    }
  };

  const handleSortCustomers = (field, order) => {
    try {
      if (!field || order === undefined) {
        return;
      }
      dispatch(sortCustomer({ field, order }));
    } catch (error) {
      console.log(error);
      notify.error("Error sorting customers");
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteCustomer(id));
        notify.success("Customer deleted successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to delete customer");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetCustomerById = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).customerById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getCustomerById(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      if (error.status === 404) {
        navigate("/");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearCustomer = () => {
    dispatch(clearCustomer());
  };

  const handleUpdateCustomer = async (id, data) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.put(PUT_API(id).customer, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(updateCustomer(res.data.data));
        notify.success("Customer updated successfully");
        const activity = {
          customerId: id,
          type: "customer",
          subject: "has updated customer information",
        };
        await handleAddActivity(activity);
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to update customer");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddCustomerTag = async (id, tag) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(id).addCustomerTag,
        { tag: tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(addCustomerTag(tag));
        notify.success("Tag added successfully");
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to add tag");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRemoveCustomerTag = async (id, tag) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(id).removeCustomerTag,
        { tag: tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(removeCustomerTag(tag));
        notify.success("Tag removed successfully");
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to remove tag");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    isLoading,
    customers: displayedCustomers,
    allCustomers,
    customer,
    totalPages,
    handleSetCustomers,
    handleFilterCustomers,
    handleSortCustomers,
    handleDeleteCustomer,
    handleGetCustomerById,
    handleClearCustomer,
    handleUpdateCustomer,
    handleChangePage,

    handleAddCustomerTag,
    handleRemoveCustomerTag,
  };
};

export default useCustomer;
