import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setDeals,
  getDealById,
  addDeal,
  updateDeal,
  deleteDeal,
  clearDeal,
  sortDeal,
  filterDeal,
  setTotalPages,
  setCurrentPage,
  getDealsOfCustomer,
  filterDealsOfCustomer,
  sortDealsByDate,
} from "../redux/slice/dealSlice";
import { notify } from "../utils/Toastify";

const useDeal = () => {
  const { displayedDeals, isLoading, deal, totalPages, allDeals } = useSelector(
    (state) => state.deal
  );
  const dispatch = useDispatch();
  const token = getToken();

  const handleSetDeals = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(0).getDeals, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setDeals(res.data.data.deals));
        const totalPages = Math.ceil(res.data.data.deals.length / 15);
        dispatch(setTotalPages(totalPages));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch deals");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleGetDealById = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).getDealById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getDealById(res.data.data));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch deal details");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddNewDeal = async (deal) => {
    try {
      if (!deal) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().createDeal, deal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addDeal(res.data.data));
        notify.success("Deal created successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Deal creation failed");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateDeal = async (id, dealData) => {
    try {
      if (!id || !dealData) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.put(PUT_API(id).updateDeal, dealData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(updateDeal(res.data.data));
        notify.success("Deal updated successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Deal update failed");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteDeal = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).deleteDeal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteDeal(id));
        notify.success("Deal deleted successfully");
      }
    } catch (error) {
      console.log(error);
      notify.error("Deal deletion failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSortDeals = (field, order) => {
    try {
      dispatch(sortDeal({ field, order }));
    } catch (error) {
      console.log(error);
      notify.error("Error sorting deals");
    }
  };

  const handleFilterDeals = (field, value) => {
    try {
      if (!field || !value) {
        dispatch(setDeals(allDeals)); // Reset to original data
        return;
      }
      dispatch(filterDeal({ field, value }));
    } catch (error) {
      console.log(error);
      notify.error("Error filtering deals");
    }
  };

  const handleClearDeal = () => {
    dispatch(clearDeal());
  };

  const handleGetCustomerDeals = async (customerId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(
        GET_API(customerId).getDealsOfCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(getDealsOfCustomer(res.data.data.deals));
        return res.data.data.deals;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch customer deals");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFilterCustomerDeals = (field, value) => {
    try {
      dispatch(filterDealsOfCustomer({ field, value }));
    } catch (error) {
      console.log(error);
      notify.error("Error filtering customer deals");
    }
  };

  const handleSortCustomerDealsByDate = (order) => {
    try {
      dispatch(sortDealsByDate(order));
    } catch (error) {
      console.log(error);
      notify.error("Error sorting customer deals");
    }
  };

  return {
    isLoading,
    deals: displayedDeals,
    allDeals,
    deal,
    totalPages,
    handleSetDeals,
    handleGetDealById,
    handleAddNewDeal,
    handleUpdateDeal,
    handleDeleteDeal,
    handleClearDeal,
    handleSortDeals,
    handleFilterDeals,
    handleChangePage,
    handleGetCustomerDeals,
    handleFilterCustomerDeals,
    handleSortCustomerDealsByDate,
  };
};

export default useDeal;
