import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leads: [],
  filteredLeads: [],
  totalPages: 0,
  isLoading: false,
  customer: {},
  totalPages: 0,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
      state.filteredLeads = action.payload;
    },
    sortLead: (state, action) => {
      const { field, order } = action.payload; // order can be 'asc' or 'desc'

      if (!field) {
        console.error("Invalid payload in sortLead:", action.payload);
        return;
      }

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

      state.filteredLeads = [...state.filteredLeads].sort(compareFunction);
    },

    filterLead: (state, action) => {
      if (
        !action.payload ||
        !action.payload.field ||
        action.payload.value === undefined
      ) {
        console.error("Invalid payload in filterLead:", action.payload);
        return;
      }

      const { field, value } = action.payload;

      if (!value || value.length === 0) {
        state.filteredLeads = state.leads;
        return;
      }

      state.filteredLeads = state.leads.filter((lead) => {
        return (
          lead[field] && lead[field].toLowerCase().includes(value.toLowerCase())
        );
      });
    },
    searchLeads: (state, action) => {
      const { field, value } = action.payload;
      state.filteredLeads = state.leads.filter((lead) =>
        lead[field].toLowerCase().includes(value.toLowerCase())
      );
    },
    addNewLead: (state, action) => {
      state.leads.unshift(action.payload);
      state.filteredLeads = [...state.leads];
    },
    deleteLead: (state, action) => {
      state.leads = state.leads.filter((i) => i._id !== action.payload);
      state.filteredLeads = [...state.leads];
    },
    getLeadById: (state, action) => {
      state.customer = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setLeads,
  sortLead,
  filterLead,
  searchLeads,
  addNewLead,
  deleteLead,
  getLeadById,
  setTotalPages,
} = leadSlice.actions;
export default leadSlice.reducer;
