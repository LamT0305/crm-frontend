import { useDispatch, useSelector } from "react-redux";
import {
  setCustomers,
  sortCustomer,
  filterCustomer,
  deleteCustomer,
  clearCustomer,
  getCustomerById,
  updateCustomer,
} from "../redux/slice/customerSlice";

import axiosInstance from "../services/Axios";
import { DELETE_API, GET_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import useActivity from "./useActivity";
import { notify } from "../utils/Toastify";

const useCustomer = () => {
  const { handleAddActivity } = useActivity();
  const { filteredCustomers, isLoading, customer } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();
  const token = getToken();

  const handleSetCustomers = async () => {
    try {
      const res = await axiosInstance.get(GET_API().getCustomers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setCustomers(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterCustomers = async (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }

      dispatch(filterCustomer({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterCustomers:", error);
    }
  };

  const handleSortCustomers = async (field, order) => {
    try {
      if (!field || order === undefined) {
        return;
      }

      dispatch(sortCustomer({ field, order }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      if (!id) return;
      const res = await axiosInstance.delete(DELETE_API(id).deleteCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteCustomer(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCustomerById = async (id) => {
    try {
      if (!id) return;
      const res = await axiosInstance.get(GET_API(id).getCustomerById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getCustomerById(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearCustomer = () => {
    dispatch(clearCustomer());
  };

  const handleUpdateCustomer = async (id, data) => {
    try {
      const res = await axiosInstance.put(PUT_API(id).updateCustomer, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data.data);
        dispatch(updateCustomer(res.data.data));
        notify.success("Customer updated successfully");
        const activity = {
          customerId: id,
          type: "customer",
          subject: "has updated customer information",
        };
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isLoading,
    customers: filteredCustomers,
    customer,
    handleSetCustomers,
    handleFilterCustomers,
    handleSortCustomers,
    handleDeleteCustomer,
    handleGetCustomerById,
    handleClearCustomer,
    handleUpdateCustomer,
  };
};

export default useCustomer;
