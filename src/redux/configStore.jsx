import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "./slice/LeadSlice";

export const configStore = configureStore({
  reducer: {
    lead: leadSlice,
  },
});

export default configStore;
