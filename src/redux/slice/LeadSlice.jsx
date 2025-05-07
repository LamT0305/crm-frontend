import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLeads: [],
  leads: [],
  filteredLeads: [],
  displayedLeads: [],
  customer: {},
  isLoading: false,
  totalPages: 0,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setLeads: (state, action) => {
      state.allLeads = action.payload;
      state.leads = action.payload;
      state.filteredLeads = action.payload;
      state.displayedLeads = action.payload.slice(0, 15);
      state.totalPages = Math.ceil(action.payload.length / 15);
    },

    setCurrentPage: (state, action) => {
      const page = action.payload;
      const start = (page - 1) * 15;
      const end = start + 15;
      state.displayedLeads = state.filteredLeads.slice(start, end);
    },

    sortLead: (state, action) => {
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

      state.filteredLeads = [...state.filteredLeads].sort(compareFunction);
      state.displayedLeads = state.filteredLeads.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredLeads.length / 15);
    },

    filterLead: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) {
        state.filteredLeads = state.allLeads;
        state.displayedLeads = state.allLeads.slice(0, 15);
        state.totalPages = Math.ceil(state.allLeads.length / 15);
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

      state.filteredLeads = state.allLeads.filter((lead) => {
        const fieldValue = getNestedValue(lead, field);
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      state.displayedLeads = state.filteredLeads.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredLeads.length / 15);
    },

    addNewLead: (state, action) => {
      state.allLeads.unshift(action.payload);
      state.leads.unshift(action.payload);
      state.filteredLeads = [...state.leads];
      state.displayedLeads = state.filteredLeads.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredLeads.length / 15);
    },

    deleteLead: (state, action) => {
      const deleteId = action.payload;
      state.allLeads = state.allLeads.filter((lead) => lead._id !== deleteId);
      state.leads = state.leads.filter((lead) => lead._id !== deleteId);
      state.filteredLeads = state.filteredLeads.filter(
        (lead) => lead._id !== deleteId
      );
      state.displayedLeads = state.filteredLeads.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredLeads.length / 15);
    },

    getLeadById: (state, action) => {
      state.customer = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    filterByLeadTags: (state, action) => {
      const tag = action.payload;
      if (!tag || tag.length === 0) {
        state.filteredLeads = state.allLeads;
        state.displayedLeads = state.allLeads.slice(0, 15);
        state.totalPages = Math.ceil(state.allLeads.length / 15);
        return;
      }

      const filteredLeads = state.allLeads.filter((lead) => {
        return lead.tags?.some((t) => t.toLowerCase() === tag.toLowerCase());
      });

      state.filteredLeads = filteredLeads;
      state.displayedLeads = filteredLeads.slice(0, 15);
      state.totalPages = Math.ceil(filteredLeads.length / 15);
    },

    resetFilter: (state) => {
      state.filteredLeads = state.allLeads;
      state.displayedLeads = state.allLeads.slice(0, 15);
      state.totalPages = Math.ceil(state.allLeads.length / 15);
    },
  },
});

export const {
  setLoading,
  setLeads,
  setCurrentPage,
  sortLead,
  filterLead,
  addNewLead,
  deleteLead,
  getLeadById,
  setTotalPages,
  resetFilter,
  filterByLeadTags,
} = leadSlice.actions;

export default leadSlice.reducer;
