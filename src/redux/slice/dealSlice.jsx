import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allDeals: [],
  deals: [],
  filteredDeals: [],
  displayedDeals: [],
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
      state.allDeals = action.payload;
      state.deals = action.payload;
      state.filteredDeals = action.payload;
      state.displayedDeals = action.payload.slice(0, 15);
      state.totalPages = Math.ceil(action.payload.length / 15);
    },
    setCurrentPage: (state, action) => {
      const page = action.payload;
      const start = (page - 1) * 15;
      const end = start + 15;
      state.displayedDeals = state.filteredDeals.slice(start, end);
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
      state.displayedDeals = state.filteredDeals.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredDeals.length / 15);
    },
    filterDeal: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) {
        state.filteredDeals = state.allDeals;
        state.displayedDeals = state.allDeals.slice(0, 15);
        state.totalPages = Math.ceil(state.allDeals.length / 15);
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

      state.filteredDeals = state.allDeals.filter((deal) => {
        const fieldValue = getNestedValue(deal, field);
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      state.displayedDeals = state.filteredDeals.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredDeals.length / 15);
    },
    getDealById: (state, action) => {
      state.deal = action.payload;
    },
    addDeal: (state, action) => {
      state.allDeals.unshift(action.payload);
      state.deals.unshift(action.payload);
      state.filteredDeals = [...state.deals];
      state.displayedDeals = state.filteredDeals.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredDeals.length / 15);
    },
    updateDeal: (state, action) => {
      const updatedDeal = action.payload;
      const updateInArray = (array) => {
        const index = array.findIndex((deal) => deal._id === updatedDeal._id);
        if (index !== -1) {
          array[index] = updatedDeal;
        }
      };

      updateInArray(state.allDeals);
      updateInArray(state.deals);
      updateInArray(state.filteredDeals);
      updateInArray(state.displayedDeals);

      state.isLoading = false;
      state.error = null;
    },
    deleteDeal: (state, action) => {
      const deleteId = action.payload;
      state.allDeals = state.allDeals.filter((deal) => deal._id !== deleteId);
      state.deals = state.deals.filter((deal) => deal._id !== deleteId);
      state.filteredDeals = state.filteredDeals.filter(
        (deal) => deal._id !== deleteId
      );
      state.displayedDeals = state.filteredDeals.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredDeals.length / 15);
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
  setCurrentPage,
  sortDeal,
  filterDeal,
  getDealById,
  addDeal,
  updateDeal,
  deleteDeal,
  clearDeal,
  setTotalPages,
} = dealSlice.actions;

export default dealSlice.reducer;
