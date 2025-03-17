import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "./slice/LeadSlice";
import sourceSlice from "./slice/sourceSlice";
import activifySlice from "./slice/activitySlice";
import emailSlice from "./slice/emailSlice";
import commentSlice from "./slice/commentSlice";
import taskSlice from "./slice/taskSlice";
import noteSLice from "./slice/noteSlice";

export const configStore = configureStore({
  reducer: {
    lead: leadSlice,
    source: sourceSlice,
    activity: activifySlice,
    email: emailSlice,
    comment: commentSlice,
    task: taskSlice,
    note: noteSLice,
  },
});

export default configStore;
