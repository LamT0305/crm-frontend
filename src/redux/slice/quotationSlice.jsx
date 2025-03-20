import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quotations: [],
  quotation: null,
  loading: false,
  error: null,
};

const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setQuotations: (state, action) => {
      state.quotations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setQuotation: (state, action) => {
      state.quotation = action.payload;
      state.loading = false;
      state.error = null;
    },
    addQuotation: (state, action) => {
      state.quotations.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateQuotation: (state, action) => {
      const index = state.quotations.findIndex(
        (quotation) => quotation._id === action.payload._id
      );
      if (index !== -1) {
        state.quotations[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteQuotation: (state, action) => {
      state.quotations = state.quotations.filter(
        (quotation) => quotation._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    clearQuotation: (state) => {
      state.quotation = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setQuotations,
  setQuotation,
  addQuotation,
  updateQuotation,
  deleteQuotation,
  clearQuotation,
} = quotationSlice.actions;

export default quotationSlice.reducer;
