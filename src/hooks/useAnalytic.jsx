import { useDispatch, useSelector } from "react-redux";
import { GET_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setError,
  setCustomerStatusDistribution,
  setCustomerIndustryDistribution,
  setCustomerSourceDistribution,
  setCustomerIncomeDistribution,
  setDealStatusDistribution,
  setDealValueAnalysis,
  setProductPerformance,
  clearAnalytics,
  setSelectedDate,
  setInteractionTypeDistribution,
  setInteractionTimeline,
  setQuotationAnalysis,
  setDiscountAnalysis,
} from "../redux/slice/analyticSlice";
import { notify } from "../utils/Toastify";

const useAnalytic = () => {
  const dispatch = useDispatch();
  const {
    customerAnalytics,
    dealAnalytics,
    interactionAnalytics,
    salesAnalytics,
    isLoading,
    error,
  } = useSelector((state) => state.analytic);
  const token = getToken();

  // Customer Analytics Functions
  const fetchCustomerStatusDistribution = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getCustomerStatusDistribution}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setCustomerStatusDistribution(response.data.data));
    } catch (error) {
      console.error("Error fetching status distribution:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch customer status distribution");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCustomerIndustryDistribution = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getCustomerIndustryDistribution}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setCustomerIndustryDistribution(response.data.data));
    } catch (error) {
      console.error("Error fetching industry distribution:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch customer industry distribution");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCustomerSourceDistribution = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getCustomerSourceDistribution}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setCustomerSourceDistribution(response.data.data));
    } catch (error) {
      console.error("Error fetching source distribution:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch customer source distribution");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchMonthlyIncomeDistribution = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getMonthlyIncomeDistribution}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setCustomerIncomeDistribution(response.data.data));
    } catch (error) {
      console.error("Error fetching income distribution:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch monthly income distribution");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Deal Analytics Functions
  const fetchDealStatusDistribution = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getDealStatusDistribution}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setDealStatusDistribution(response.data.data));
    } catch (error) {
      console.error("Error fetching deal status distribution:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch deal status distribution");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchDealValueAnalysis = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getDealValueAnalysis}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setDealValueAnalysis(response.data.data));
    } catch (error) {
      console.error("Error fetching deal value analysis:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch deal value analysis");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchProductPerformance = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getProductPerformance}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setProductPerformance(response.data.data));
    } catch (error) {
      console.error("Error fetching product performance:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch product performance");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Interaction Analytics Functions
  const fetchInteractionTypeDistribution = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getInteractionTypeDistribution}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setInteractionTypeDistribution(response.data.data));
    } catch (error) {
      console.error("Error fetching interaction type distribution:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch interaction type distribution");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchInteractionTimeline = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getInteractionTimeline}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setInteractionTimeline(response.data.data));
    } catch (error) {
      console.error("Error fetching interaction timeline:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch interaction timeline");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Sales Analytics Functions
  const fetchQuotationAnalysis = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getQuotationAnalysis}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setQuotationAnalysis(response.data.data));
    } catch (error) {
      console.error("Error fetching quotation analysis:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch quotation analysis");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchDiscountAnalysis = async (month, year) => {
    try {
      dispatch(setLoading(true));
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await axiosInstance.get(
        `${GET_API().getDiscountAnalysis}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setDiscountAnalysis(response.data.data));
    } catch (error) {
      console.error("Error fetching discount analysis:", error);
      dispatch(setError(error.message));
      notify.error("Failed to fetch discount analysis");
    } finally {
      dispatch(setLoading(false));
    }
  };
  // Combined Analytics Functions
  const fetchAllAnalytics = async (month, year) => {
    dispatch(setLoading(true));
    await Promise.all([
      // Customer Analytics
      fetchCustomerStatusDistribution(month, year),
      fetchCustomerIndustryDistribution(month, year),
      fetchCustomerSourceDistribution(month, year),
      fetchMonthlyIncomeDistribution(month, year),
      // Deal Analytics
      fetchDealStatusDistribution(month, year),
      fetchDealValueAnalysis(month, year),
      fetchProductPerformance(month, year),
      //interaction analytics
      fetchInteractionTypeDistribution(month, year),
      fetchInteractionTimeline(month, year),
      //sales analytics
      fetchQuotationAnalysis(month, year),
      fetchDiscountAnalysis(month, year),
    ]);
  };

  const handleClearAnalytics = () => {
    dispatch(clearAnalytics());
  };

  const setDateFilter = (month, year) => {
    dispatch(setSelectedDate({ month, year }));
  };

  return {
    customerAnalytics,
    dealAnalytics,
    interactionAnalytics,
    salesAnalytics,
    isLoading,
    error,
    fetchCustomerStatusDistribution,
    fetchCustomerIndustryDistribution,
    fetchCustomerSourceDistribution,
    fetchMonthlyIncomeDistribution,
    fetchDealStatusDistribution,
    fetchDealValueAnalysis,
    fetchProductPerformance,
    fetchInteractionTypeDistribution,
    fetchInteractionTimeline,
    fetchQuotationAnalysis,
    fetchDiscountAnalysis,
    fetchAllAnalytics,
    handleClearAnalytics,
    setDateFilter,
  };
};

export default useAnalytic;
