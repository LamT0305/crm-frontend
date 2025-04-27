import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filteredTasks: [],
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
      state.filteredTasks = action.payload;
    },
    sortTask: (state, action) => {
      const { order } = action.payload;
      const field = "createdAt";
      const compareFunction = (a, b) => {
        const dateA = new Date(a[field]).getTime();
        const dateB = new Date(b[field]).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      };

      state.filteredTasks = [...state.filteredTasks].sort(compareFunction);
    },
    filterTask: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) return;

      if (!value || value.length === 0) {
        state.filteredTasks = state.tasks;
        return;
      }

      state.filteredTasks = state.tasks.filter((task) => {
        const fieldValue = task[field]?.toString().toLowerCase();
        return fieldValue && fieldValue.includes(value.toLowerCase());
      });
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
      state.filteredTasks = [...state.tasks];
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.filteredTasks = [...state.tasks];
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
      state.filteredTasks = [...updatedTasks];
    },

    filterByStatus: (state, action) => {
      const { status } = action.payload;
      if (!status || status === "all") {
        state.filteredTasks = state.tasks;
        return;
      }
      state.filteredTasks = state.tasks.filter(
        (task) => task.status === status
      );
    },
  },
});

export const {
  setLoading,
  setTasks,
  sortTask,
  filterTask,
  addTask,
  deleteTask,
  getTask,
  updateTask,
  filterByStatus,
} = slice.actions;
export default slice.reducer;
