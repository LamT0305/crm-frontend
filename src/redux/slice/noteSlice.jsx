import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  isLoading: false,
  note: {},
};

const slice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    getNote: (state, action) => {
      state.note = action.payload;
    },
    updateNote: (state, action) => {
      const note = action.payload;
      state.notes = state.notes.map((n) =>
        n._id === note._id ? { ...n, ...note } : n
      );
    },
  },
});

export const {
  setLoading,
  setNotes,
  addNote,
  deleteNote,
  getNote,
  updateNote,
} = slice.actions;

export default slice.reducer;
