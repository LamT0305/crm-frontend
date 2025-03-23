import { createSlice } from "@reduxjs/toolkit";

const initState = {
  emails: [],
  filteredEmails: [],
  isLoading: false,
};

const slice = createSlice({
  name: "email",
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
      state.filteredEmails = action.payload;
    },
    sendEmail: (state, action) => {
      state.emails.unshift(action.payload);
      state.filteredEmails = [...state.emails];
    },
    receiveEmail: (state, action) => {
      state.emails.push(action.payload);
      state.filteredEmails = [...state.emails];
    },
    filterEmail: (state, action) => {
      const { field, value } = action.payload;
      if (!field || value === undefined) {
        state.filteredEmails = state.emails;
        return;
      }
      state.filteredEmails = state.emails.filter((email) => {
        return email[field]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    },
    sortEmailsByDate: (state, action) => {
      const order = action.payload;
      state.filteredEmails = [...state.filteredEmails].sort((a, b) => {
        const dateA = new Date(a.sentAt);
        const dateB = new Date(b.sentAt);
        return order === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    },
    deleteEmail: (state, action) => {
      state.emails = state.emails.filter(
        (email) => email._id !== action.payload
      );
      state.filteredEmails = state.filteredEmails.filter(
        (email) => email._id !== action.payload
      );
    },
  },
});

export const {
  setEmails,
  setLoading,
  sendEmail,
  receiveEmail,
  deleteEmail,
  filterEmail,
  sortEmailsByDate,
} = slice.actions;

export default slice.reducer;
