import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "./slice/LeadSlice";
import sourceSlice from "./slice/sourceSlice";
import activifySlice from "./slice/activitySlice";
import emailSlice from "./slice/emailSlice";
import commentSlice from "./slice/commentSlice";
import taskSlice from "./slice/taskSlice";
import noteSLice from "./slice/noteSlice";
import productSlice from "./slice/productSlice";
import quotaionSlice from "./slice/quotationSlice";
import dealSlice from "./slice/dealSlice";
import customerSlice from "./slice/customerSlice";
import customerCareSlice from "./slice/customerCareSlice";
import notiSlice from "./slice/notiSlice";
import analyticSlice from "./slice/analyticSlice";
import workspaceSlice from "./slice/workspaceSlice";
import category from "./slice/categorySlice";

export const configStore = configureStore({
  reducer: {
    lead: leadSlice,
    source: sourceSlice,
    activity: activifySlice,
    email: emailSlice,
    comment: commentSlice,
    task: taskSlice,
    note: noteSLice,
    product: productSlice,
    quotation: quotaionSlice,
    deal: dealSlice,
    customer: customerSlice,
    customerCare: customerCareSlice,
    noti: notiSlice,
    analytic: analyticSlice,
    workspace: workspaceSlice,
    category: category,
  },
});

export default configStore;
