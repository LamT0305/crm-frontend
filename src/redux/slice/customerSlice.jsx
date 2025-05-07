import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCustomers: [], // Store all customers
  customers: [], // Current customers
  filteredCustomers: [], // Filtered customers
  displayedCustomers: [], // Currently displayed customers
  customer: {},
  isLoading: false,
  totalPages: 0,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCustomers: (state, action) => {
      state.allCustomers = action.payload;
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
      state.displayedCustomers = action.payload.slice(0, 15);
      state.totalPages = Math.ceil(action.payload.length / 15);
    },
    setCurrentPage: (state, action) => {
      const page = action.payload;
      const start = (page - 1) * 15;
      const end = start + 15;
      state.displayedCustomers = state.filteredCustomers.slice(start, end);
    },
    sortCustomer: (state, action) => {
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

      state.filteredCustomers = [...state.filteredCustomers].sort(
        compareFunction
      );
      state.displayedCustomers = state.filteredCustomers.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredCustomers.length / 15);
    },
    filterCustomer: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) {
        state.filteredCustomers = state.allCustomers;
        state.displayedCustomers = state.allCustomers.slice(0, 15);
        state.totalPages = Math.ceil(state.allCustomers.length / 15);
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

      state.filteredCustomers = state.allCustomers.filter((customer) => {
        const fieldValue = getNestedValue(customer, field);
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      state.displayedCustomers = state.filteredCustomers.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredCustomers.length / 15);
    },
    deleteCustomer: (state, action) => {
      const deleteId = action.payload;
      state.allCustomers = state.allCustomers.filter(
        (customer) => customer._id !== deleteId
      );
      state.customers = state.customers.filter(
        (customer) => customer._id !== deleteId
      );
      state.filteredCustomers = state.filteredCustomers.filter(
        (customer) => customer._id !== deleteId
      );
      state.displayedCustomers = state.filteredCustomers.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredCustomers.length / 15);
    },
    clearCustomer: (state) => {
      state.customer = null;
    },
    getCustomerById: (state, action) => {
      state.customer = action.payload;
    },
    updateCustomer: (state, action) => {
      const updatedCustomer = action.payload;
      const updateInArray = (array) => {
        const index = array.findIndex(
          (customer) => customer._id === updatedCustomer._id
        );
        if (index !== -1) {
          array[index] = updatedCustomer;
        }
      };

      updateInArray(state.allCustomers);
      updateInArray(state.customers);
      updateInArray(state.filteredCustomers);
      updateInArray(state.displayedCustomers);
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    addCustomerTag: (state, action) => {
      state.customer.tags.push(action.payload);
    },

    filterCustomerTags: (state, action) => {
      const tag = action.payload;
      if (!tag || tag.length === 0) {
        state.filteredCustomers = state.allCustomers;
        state.displayedCustomers = state.allCustomers.slice(0, 15);
        state.totalPages = Math.ceil(state.allCustomers.length / 15);
        return;
      }
      state.filteredCustomers = state.allCustomers.filter((customer) => {
        return customer.tags?.some((t) => t.toLowerCase() === tag.toLowerCase());
      });
      state.displayedCustomers = state.filteredCustomers.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredCustomers.length / 15);
    },
    removeCustomerTag: (state, action) => {
      state.customer.tags = state.customer.tags.filter(
        (tag) => tag !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setCustomers,
  setCurrentPage,
  sortCustomer,
  filterCustomer,
  deleteCustomer,
  clearCustomer,
  getCustomerById,
  updateCustomer,
  setTotalPages,
  addCustomerTag,
  removeCustomerTag,
  filterCustomerTags,
} = customerSlice.actions;

export default customerSlice.reducer;
