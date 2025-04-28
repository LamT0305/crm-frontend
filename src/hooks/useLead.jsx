import { useDispatch, useSelector } from "react-redux";
import {
  setLeads,
  sortLead,
  filterLead,
  addNewLead,
  deleteLead,
  getLeadById,
  setTotalPages,
  setLoading,
  setCurrentPage,
  resetFilter,
  filterByLeadTags,
} from "../redux/slice/LeadSlice";
import axiosInstance from "../services/Axios";
import { DELETE_API, GET_API, POST_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import useActivity from "./useActivity";
import { notify } from "../utils/Toastify";
import { useNavigate } from "react-router-dom";

const useLead = () => {
  const { handleAddActivity } = useActivity();
  const { displayedLeads, isLoading, customer, totalPages, allLeads } =
    useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const token = getToken();
  const navigate = useNavigate();

  const handleSetLeads = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API().leads, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setLeads(res.data.data.leads));
        const totalPages = Math.ceil(res.data.data.leads.length / 15);
        dispatch(setTotalPages(totalPages));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch leads");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleFilterleads = (field, value) => {
    try {
      if (!field || !value) {
        dispatch(resetFilter());
        return;
      }
      dispatch(filterLead({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterleads:", error);
      notify.error("Error filtering leads");
    }
  };

  const handleSortLeads = (field, order) => {
    try {
      if (!field || !order) {
        return;
      }
      dispatch(sortLead({ field, order }));
    } catch (error) {
      console.log(error);
      notify.error("Error sorting leads");
    }
  };

  const handleAddNewLead = async (lead) => {
    try {
      if (!lead) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().customer, lead, {
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
        await handleAddActivity(activity);
        notify.success("Lead created successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Email already exists"
      ) {
        notify.error("Customer already exists");
      } else {
        notify.error("Failed to create lead");
      }
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteLead(id));
        notify.success("Lead deleted successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to delete lead");
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
        dispatch(getLeadById(res.data.data));
      }
    } catch (error) {
      if (error.status === 404) {
        navigate("/");
      } else {
        console.log(error);
        notify.error("Failed to fetch customer");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const HandlefilterByLeadTags = (tags) => {
    try {
      if (!tags || tags.length === 0) {
        dispatch(resetFilter());
        return;
      }
      dispatch(filterByLeadTags(tags));
    } catch (error) {
      console.error("Error in filterByLeadTags:", error);
      notify.error("Error filtering leads by tags");
    }
  };

  return {
    isLoading,
    leads: displayedLeads,
    allLeads,
    customer,
    totalPages,
    handleSetLeads,
    handleFilterleads,
    handleSortLeads,
    handleAddNewLead,
    handleDeleteLead,
    handleGetCustomerById,
    handleChangePage,

    HandlefilterByLeadTags,
  };
};

export default useLead;
