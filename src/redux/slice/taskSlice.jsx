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
      const { field, order } = action.payload;
      if (!field) return;

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
} = slice.actions;
export default slice.reducer;
