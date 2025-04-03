import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
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
  },
});

export const { setUsers, setLoading, setFilterUsers } = userSlice.actions;
export default userSlice.reducer;
