import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sources: [],
  isLoading: false,
};

const slice = createSlice({
  name: "source",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSources: (state, action) => {
      state.sources = action.payload;
    },

    addSource: (state, action) => {
      state.sources.unshift(action.payload);
    },

    deleteSource: (state, action) => {
      state.sources = state.sources.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setLoading, setSources, addSource, deleteSource } =
  slice.actions;

export default slice.reducer;
