import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  filteredCustomers: [],
  customer: null,
  isLoading: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
    },
    sortCustomer: (state, action) => {
      const { field, order } = action.payload;

      if (!field) return;

      const compareFunction = (a, b) => {
        if (typeof a[field] === "string" && typeof b[field] === "string") {
          return order === "asc"
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field]);
        }
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return order === "asc" ? a[field] - b[field] : b[field] - a[field];
        }
        return 0;
      };

      state.filteredCustomers = [...state.filteredCustomers].sort(
        compareFunction
      );
    },
    filterCustomer: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) return;

      if (!value || value.length === 0) {
        state.filteredCustomers = state.customers;
        return;
      }

      state.filteredCustomers = state.customers.filter((customer) => {
        const fieldValue = customer[field]?.toString().toLowerCase();
        return fieldValue && fieldValue.includes(value.toLowerCase());
      });
    },

    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer._id !== action.payload
      );
      state.filteredCustomers = [...state.customers];
    },
    clearCustomer: (state) => {
      state.customer = null;
    },
  },
});

export const {
  setLoading,
  setCustomers,
  sortCustomer,
  filterCustomer,
  deleteCustomer,
  clearCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
