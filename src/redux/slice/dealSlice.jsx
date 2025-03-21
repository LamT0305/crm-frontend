import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deals: [],
  filteredDeals: [],
  deal: null,
  isLoading: false,
  totalPages: 0,
};

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDeals: (state, action) => {
      state.deals = action.payload;
      state.filteredDeals = action.payload;
    },
    sortDeal: (state, action) => {
      const { field, order } = action.payload;
      if (!field) return;

      const getNestedValue = (obj, path) => {
        const keys = path.split(".");
        let value = obj;
        for (const key of keys) {
          value = value?.[key];
          if (value === undefined) return "";
        }
        return value;
      };

      const compareFunction = (a, b) => {
        const aValue = getNestedValue(a, field);
        const bValue = getNestedValue(b, field);

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      };

      state.filteredDeals = [...state.filteredDeals].sort(compareFunction);
    },

    filterDeal: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) return;

      if (!value || value.length === 0) {
        state.filteredDeals = state.deals;
        return;
      }

      const getNestedValue = (obj, path) => {
        const keys = path.split(".");
        let value = obj;
        for (const key of keys) {
          value = value?.[key];
          if (value === undefined) return "";
        }
        return value;
      };

      state.filteredDeals = state.deals.filter((deal) => {
        const fieldValue = getNestedValue(deal, field);
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    },
    getDealById: (state, action) => {
      state.deal = action.payload;
    },
    addDeal: (state, action) => {
      state.deals.unshift(action.payload);
      state.filteredDeals = [...state.deals];
    },
    updateDeal: (state, action) => {
      const index = state.deals.findIndex(
        (deal) => deal._id === action.payload._id
      );
      if (index !== -1) {
        state.deals[index] = action.payload;
        state.filteredDeals = [...state.deals];
      }
      state.isLoading = false;
      state.error = null;
    },
    deleteDeal: (state, action) => {
      state.deals = state.deals.filter((deal) => deal._id !== action.payload);
      state.filteredDeals = [...state.deals];
    },
    clearDeal: (state) => {
      state.deal = null;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setLoading,
  setDeals,
  sortDeal,
  filterDeal,
  getDealById,
  addDeal,
  updateDeal,
  deleteDeal,
  clearDeal,
  setTotalPages
} = dealSlice.actions;

export default dealSlice.reducer;
