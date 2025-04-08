import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilterUsers: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) {
        state.filteredUsers = state.users;
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

      state.filteredUsers = state.users.filter((user) => {
        const fieldValue = getNestedValue(user, field);
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  setUsers,
  setLoading,
  setFilterUsers,
  setUser,
  updateUserProfile,
  logout,
  setAuthenticated,
} = userSlice.actions;
export default userSlice.reducer;
