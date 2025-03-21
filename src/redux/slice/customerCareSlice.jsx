import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interactions: [],
  filteredInteractions: [],
  interaction: null,
  isLoading: false,
};

const customerCareSlice = createSlice({
  name: "customerCare",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setInteractions: (state, action) => {
      state.interactions = action.payload;
      state.filteredInteractions = action.payload;
    },
    addInteraction: (state, action) => {
      state.interactions.unshift(action.payload);
      state.filteredInteractions = [...state.interactions];
    },
    deleteInteraction: (state, action) => {
      state.interactions = state.interactions.filter(
        (interaction) => interaction._id !== action.payload
      );
      state.filteredInteractions = [...state.interactions];
    },
    updateInteraction: (state, action) => {
      const updatedInteraction = action.payload;
      state.interactions = state.interactions.map((interaction) =>
        interaction._id === updatedInteraction._id
          ? { ...interaction, ...updatedInteraction }
          : interaction
      );
      state.filteredInteractions = [...state.interactions];
    },
    getInteractionById: (state, action) => {
      state.interaction = action.payload;
    },
    filterInteractionsByType: (state, action) => {
      const type = action.payload?.toLowerCase();
      if (!type) {
        state.filteredInteractions = state.interactions;
        return;
      }
      state.filteredInteractions = state.interactions.filter((interaction) =>
        interaction.type.toLowerCase().includes(type)
      );
    },

    filterInteractionsByNotes: (state, action) => {
      const searchText = action.payload?.toLowerCase();
      if (!searchText) {
        state.filteredInteractions = state.interactions;
        return;
      }
      state.filteredInteractions = state.interactions.filter((interaction) =>
        interaction.notes.toLowerCase().includes(searchText)
      );
    },

    sortInteractionsByDate: (state, action) => {
      const order = action.payload || "desc";
      state.filteredInteractions = [...state.filteredInteractions].sort(
        (a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return order === "asc" ? dateA - dateB : dateB - dateA;
        }
      );
    },
    clearInteraction: (state) => {
      state.interaction = null;
    },
  },
});

export const {
  setLoading,
  setInteractions,
  addInteraction,
  deleteInteraction,
  updateInteraction,
  getInteractionById,
  filterInteractionsByNotes,
  filterInteractionsByType,
  sortInteractionsByDate,
  clearInteraction,
} = customerCareSlice.actions;

export default customerCareSlice.reducer;
