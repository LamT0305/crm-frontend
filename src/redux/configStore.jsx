import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "./slice/LeadSlice";
import sourceSlice from "./slice/sourceSlice";

export const configStore = configureStore({
  reducer: {
    lead: leadSlice,
    source: sourceSlice,
  },
});

export default configStore;
