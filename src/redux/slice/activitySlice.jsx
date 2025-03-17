import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activities: [],
  isLoading: false,
};

const slice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActivity: (state, action) => {
      state.activities = action.payload;
    },
    addActivity: (state, action) => {
      state.activities.push(action.payload);
    },
  },
});

export const { setLoading, setActivity, addActivity } = slice.actions;
export default slice.reducer;
