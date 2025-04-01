import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  isLoading: false,
};

const slice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (cmt) => cmt._id !== action.payload
      );
    },
  },
});

export const { setLoading, setComments, addComment, deleteComment } =
  slice.actions;

export default slice.reducer;
