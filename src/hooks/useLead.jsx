import { useDispatch, useSelector } from "react-redux";
import {
  setLeads,
  sortLead,
  filterLead,
  addNewLead,
  deleteLead,
  getLeadById,
  setTotalPages,
} from "../redux/slice/LeadSlice";

import axiosInstance from "../services/Axios";
import { DELETE_API, GET_API, POST_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import useActivity from "./useActivity";

const useLead = () => {
  const { handleAddActivity } = useActivity();
  const { filteredLeads, isLoading, customer, totalPages } = useSelector(
    (state) => state.lead
  );
  const dispatch = useDispatch();
  const token = getToken();

  const handleSetLeads = async (page) => {
    try {
      const res = await axiosInstance.get(GET_API(0, page).getLeads, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data.data);
        dispatch(setLeads(res.data.data.leads));
        dispatch(setTotalPages(res.data.data.pagination.pages));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterleads = async (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }

      dispatch(filterLead({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterleads:", error);
    }
  };

  const handleSortLeads = async (field, order) => {
    try {
      if (!field || order === undefined) {
        return;
      }

      dispatch(sortLead({ field, order }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewLead = async (lead) => {
    try {
      if (!lead) {
        return;
      }
      const res = await axiosInstance.post(POST_API().createlead, lead, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addNewLead(res.data.data));
        const activity = new FormData();
        activity.append("customerId", res.data.data._id);
        activity.append("type", "customer");
        activity.append("subject", "Created this lead");
        handleAddActivity(activity);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 400 &&
        error.response.data.message === "Email already exists"
      ) {
        alert("Customer already exists");
      }
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      if (!id) return;
      const res = await axiosInstance.delete(DELETE_API(id).deleteCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteLead(id));
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
        dispatch(getLeadById(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isLoading,
    leads: filteredLeads,
    customer,
    totalPages,
    handleSetLeads,
    handleFilterleads,
    handleSortLeads,
    handleAddNewLead,
    handleDeleteLead,
    handleGetCustomerById,
  };
};

export default useLead;
