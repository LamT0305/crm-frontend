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
} from "../redux/slice/customerSlice";

import axiosInstance from "../services/Axios";
import { DELETE_API, GET_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import useActivity from "./useActivity";
import { notify } from "../utils/Toastify";

const useCustomer = () => {
  const { handleAddActivity } = useActivity();
  const { displayedCustomers, isLoading, customer, totalPages, allCustomers } =
    useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const token = getToken();

  const handleSetCustomers = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(0).getCustomers, {
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
      const res = await axiosInstance.delete(DELETE_API(id).deleteCustomer, {
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
      const res = await axiosInstance.get(GET_API(id).getCustomerById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getCustomerById(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch customer details");
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
      const res = await axiosInstance.put(PUT_API(id).updateCustomer, data, {
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
  };
};

export default useCustomer;
