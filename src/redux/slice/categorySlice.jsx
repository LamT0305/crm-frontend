import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.unshift(action.payload);
    },

    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter(
        (category) => category._id !== categoryId
      );
    },
  },
});

export const { setLoading, setCategories, addCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
