import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerAnalytics: {
    statusDistribution: [],
    industryDistribution: [],
    sourceDistribution: [],
    incomeDistribution: [],
    selectedMonth: null,
    selectedYear: null,
  },
  dealAnalytics: {
    statusDistribution: [],
    valueAnalysis: [],
    productPerformance: [],
    selectedMonth: null,
    selectedYear: null,
  },
  interactionAnalytics: {
    typeDistribution: [],
    timeline: [],
    selectedMonth: null,
    selectedYear: null,
  },
  salesAnalytics: {
    quotationAnalysis: [],
    discountAnalysis: [],
    selectedMonth: null,
    selectedYear: null,
  },
  isLoading: false,
  error: null,
};

const analyticSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // Customer Analytics
    setCustomerStatusDistribution: (state, action) => {
      state.customerAnalytics.statusDistribution = action.payload;
    },
    setCustomerIndustryDistribution: (state, action) => {
      state.customerAnalytics.industryDistribution = action.payload;
    },
    setCustomerSourceDistribution: (state, action) => {
      state.customerAnalytics.sourceDistribution = action.payload;
    },
    setCustomerIncomeDistribution: (state, action) => {
      state.customerAnalytics.incomeDistribution = action.payload;
    },
    // Deal Analytics
    setDealStatusDistribution: (state, action) => {
      state.dealAnalytics.statusDistribution = action.payload;
    },
    setDealValueAnalysis: (state, action) => {
      state.dealAnalytics.valueAnalysis = action.payload;
    },
    setProductPerformance: (state, action) => {
      state.dealAnalytics.productPerformance = action.payload;
    },

    // Interaction Analytics
    setInteractionTypeDistribution: (state, action) => {
      state.interactionAnalytics.typeDistribution = action.payload;
    },
    setInteractionTimeline: (state, action) => {
      state.interactionAnalytics.timeline = action.payload;
    },
    // Sales Analytics
    setQuotationAnalysis: (state, action) => {
      state.salesAnalytics.quotationAnalysis = action.payload;
    },
    setDiscountAnalysis: (state, action) => {
      state.salesAnalytics.discountAnalysis = action.payload;
    },

    clearAnalytics: (state) => {
      state.customerAnalytics = {
        statusDistribution: [],
        industryDistribution: [],
        sourceDistribution: [],
        incomeDistribution: [],
        selectedMonth: null,
        selectedYear: null,
      };
      state.dealAnalytics = {
        statusDistribution: [],
        valueAnalysis: [],
        productPerformance: [],
        selectedMonth: null,
        selectedYear: null,
      };
      state.interactionAnalytics = {
        typeDistribution: [],
        timeline: [],
        selectedMonth: null,
        selectedYear: null,
      };
      state.salesAnalytics = {
        quotationAnalysis: [],
        discountAnalysis: [],
        selectedMonth: null,
        selectedYear: null,
      };
      state.error = null;
    },
    
    setSelectedDate: (state, action) => {
      const month = Number(action.payload.month);
      const year = Number(action.payload.year);

      // Update customer analytics date
      state.customerAnalytics.selectedMonth = month;
      state.customerAnalytics.selectedYear = year;

      // Update deal analytics date
      state.dealAnalytics.selectedMonth = month;
      state.dealAnalytics.selectedYear = year;

      // Update interaction analytics date
      state.interactionAnalytics.selectedMonth = month;
      state.interactionAnalytics.selectedYear = year;

      // Update sales analytics date
      state.salesAnalytics.selectedMonth = month;
      state.salesAnalytics.selectedYear = year;

      if (month && year) {
        // Filter customer analytics
        state.customerAnalytics.statusDistribution =
          state.customerAnalytics.statusDistribution.filter(
            (item) => item.month === month && item.year === year
          );
        state.customerAnalytics.industryDistribution =
          state.customerAnalytics.industryDistribution.filter(
            (item) => item.month === month && item.year === year
          );
        state.customerAnalytics.sourceDistribution =
          state.customerAnalytics.sourceDistribution.filter(
            (item) => item.month === month && item.year === year
          );
        state.customerAnalytics.incomeDistribution =
          state.customerAnalytics.incomeDistribution.filter(
            (item) => item.month === month && item.year === year
          );

        // Filter deal analytics
        state.dealAnalytics.statusDistribution =
          state.dealAnalytics.statusDistribution.filter(
            (item) => item.month === month && item.year === year
          );
        state.dealAnalytics.valueAnalysis =
          state.dealAnalytics.valueAnalysis.filter(
            (item) => item.month === month && item.year === year
          );
        state.dealAnalytics.productPerformance =
          state.dealAnalytics.productPerformance.filter(
            (item) => item.month === month && item.year === year
          );

        // Filter interaction analytics
        state.interactionAnalytics.typeDistribution =
          state.interactionAnalytics.typeDistribution.filter(
            (item) => item.month === month && item.year === year
          );
        state.interactionAnalytics.timeline =
          state.interactionAnalytics.timeline.filter(
            (item) => item.month === month && item.year === year
          );
        // Filter sales analytics
        state.salesAnalytics.quotationAnalysis =
          state.salesAnalytics.quotationAnalysis.filter(
            (item) => item.month === month && item.year === year
          );
        state.salesAnalytics.discountAnalysis =
          state.salesAnalytics.discountAnalysis.filter(
            (item) => item.month === month && item.year === year
          );
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setCustomerStatusDistribution,
  setCustomerIndustryDistribution,
  setCustomerSourceDistribution,
  setCustomerIncomeDistribution,
  setDealStatusDistribution,
  setDealValueAnalysis,
  setProductPerformance,
  setInteractionTypeDistribution,
  setInteractionTimeline,
  setQuotationAnalysis,
  setDiscountAnalysis,
  clearAnalytics,
  setSelectedDate,
} = analyticSlice.actions;

export default analyticSlice.reducer;
