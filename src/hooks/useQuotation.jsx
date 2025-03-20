import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setQuotations,
  setQuotation,
  addQuotation,
  updateQuotation,
  deleteQuotation,
  clearQuotation,
} from "../redux/slice/quotationSlice";

const useQuotation = () => {
  const dispatch = useDispatch();
  const { quotations, quotation, isLoading } = useSelector(
    (state) => state.quotation
  );
  const token = getToken();

  const handleSetQuotations = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API().getQuotations, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setQuotations(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetQuotationById = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).getQuotationById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setQuotation(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateQuotation = async (id, quotationData) => {
    try {
      if (!id || !quotationData) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.put(
        PUT_API(id).updateQuotation,
        quotationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(updateQuotation(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteQuotation = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).deleteQuotation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteQuotation(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearQuotation = () => {
    dispatch(clearQuotation());
  };

  return {
    isLoading,
    quotations,
    quotation,
    handleSetQuotations,
    handleGetQuotationById,
    handleUpdateQuotation,
    handleDeleteQuotation,
    handleClearQuotation,
  };
};

export default useQuotation;
