export const GET_API = (id) => {
  return {
    // Auth & User
    login: "/auth/google",
    profile: "/auth/profile",
    userProfile: "/user/profile",
    userList: "/user/list",
    workspaceUsers: "/user/list/workspace",
    getUserById: `/user/${id}`,

    // Customer & Leads
    customers: `/customer/customers`,
    leads: `/customer/leads`,
    customerById: `/customer/${id}`,

    // Sources
    sources: "/source/get-sources",

    // Activities
    activities: `/activity/${id}`,

    // Comments
    comments: `/comment/${id}`,

    // Tasks
    tasks: `/task`,
    customerTasks: `/task/customer/${id}`,
    taskById: `/task/${id}`,

    // Notes
    notes: `/note`,
    customerNotes: `/note/customer/${id}`,
    noteById: `/note/${id}`,

    // Products
    products: `/product`,
    productById: `/product/${id}`,

    // Deals
    deals: `/deal`,
    dealById: `/deal/${id}`,
    customerDeals: `/deal/customer/${id}`,

    // Customer Care
    customerCare: `/customer-care/customer/${id}`,
    customerCareById: `/customer-care/${id}`,

    // Notifications
    notifications: "/notification",
    unreadNotificationsCount: "/notification/unread/count",

    // Quotations
    quotations: "/quotation",
    quotationById: `/quotation/${id}`,

    // Emails
    emails: `/email/${id}`,

    // Analytics
    analytics: {
      customerStatus: "/analytic/customer/status",
      customerIndustry: "/analytic/customer/industry",
      customerSource: "/analytic/customer/source",
      customerIncome: "/analytic/customer/income",
      dealStatus: "/analytic/deal/status",
      dealValue: "/analytic/deal/value",
      productPerformance: "/analytic/deal/products",
      interactionType: "/analytic/interaction/type",
      interactionTimeline: "/analytic/interaction/timeline",
      quotations: "/analytic/sales/quotations",
      discounts: "/analytic/sales/discounts",
    },

    // Workspace
    workspaceDetails: "/workspace/details",
    userWorkspaces: "/workspace/user-workspaces",
    joinWorkspace: `/workspace/join`,

    //category
    category: "/category",

    // Messages
    conversations: "/message/conversations",
    messages: `/message/user/${id}`,
    groupMessages: `/message/group/${id}/messages`,
    groups: "/message/list/groups",
    groupDetails: `/message/group/details/${id}`,
    getAttachmentsInDirectMS: `/message/user/${id}/attachments`,
    getAttachmentsInGroupMS: `/message/group/${id}/attachments`,
  };
};

export const POST_API = () => {
  return {
    // Auth
    logout: "/auth/logout",

    // Workspace
    createWorkspace: "/workspace/create",
    inviteMember: "/workspace/invite",
    switchWorkspace: "/workspace/switch",
    // Resources
    customer: "/customer",
    source: "/source/create-source",
    activity: "/activity",
    email: "/email",
    comment: "/comment",
    task: "/task",
    note: "/note",
    product: "/product",
    deal: "/deal",
    customerCare: "/customer-care",
    notification: "/notification",
    upload: "/upload",
    category: "/category",
    // Messages
    sendMessage: "/message/send",
    createGroup: "/message/group/new",
    sendGroupMessage: `/message/group/message`,
    addGroupMember: "/message/group/:groupId/member",
  };
};

export const PUT_API = (id) => {
  return {
    userProfile: "/user/profile",
    customer: `/customer/${id}`,
    task: `/task/${id}`,
    note: `/note/${id}`,
    product: `/product/${id}`,
    quotation: `/quotation/${id}`,
    deal: `/deal/${id}`,
    customerCare: `/customer-care/${id}`,
    notificationRead: `/notification/${id}/read`,
    allNotificationsRead: "/notification/mark-all-read",
    updateWorkspaceName: "/workspace/update-name",
    // Messages
    markMessageRead: `/message/message/read/${id}`,
  };
};

export const DELETE_API = (id) => {
  return {
    customer: `/customer/${id}`,
    source: `/source/delete-source/${id}`,
    comment: `/comment/${id}`,
    task: `/task/${id}`,
    note: `/note/${id}`,
    product: `/product/${id}`,
    quotation: `/quotation/${id}`,
    deal: `/deal/${id}`,
    customerCare: `/customer-care/${id}`,
    notification: `/notification/${id}`,
    email: `/email/${id}`,
    activity: `/activity/${id}`,
    category: `/category/${id}`,
    deleteWorkspace: `/workspace/delete/${id}`,
    leaveWorkspace: `/workspace/leave/${id}`,
    kickMember: `/workspace/member/${id}`,
    // Messages
    deleteMessage: `/message/message/${id}`,
    deleteGroupMessage: `/message/group/message/${id}`,
    deleteGroup: `/message/group/${id}`,
    removeGroupMember: `/message/group/${id}/member`,
  };
};
