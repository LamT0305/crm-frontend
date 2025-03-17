import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  isLoading: false,
  task: {},
};

const slice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    getTask: (state, action) => {
      state.task = action.payload;
    },
    updateTask: (state, action) => {
      const task = action.payload;
      const updatedTasks = state.tasks.map((t) =>
        t._id === task._id ? { ...t, ...task } : t
      );
      state.tasks = updatedTasks;
    },
  },
});

export const {
  setLoading,
  setTasks,
  addTask,
  deleteTask,
  getTask,
  updateTask,
} = slice.actions;
export default slice.reducer;
