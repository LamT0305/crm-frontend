import { createSlice } from "@reduxjs/toolkit";

const initState = {
  emails: [],
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
    },
    sendEmail: (state, action) => {
      state.emails.unshift(action.payload);
    },
    receiveEmail: (state, action) => {
      state.emails.push(action.payload);
    },
  },
});

export const { setEmails, setLoading, sendEmail, receiveEmail } = slice.actions;
export default slice.reducer;
