export const GET_API = (id) => {
  return {
    profile: "/auth/profile",
    login: "/auth/google",
    getLeads: `/customer/get-all-leads`,
    getCustomers: `/customer/customers`,
    getCustomerById: `/customer/get-customer/${id}`,
    getSources: "/source/get-sources",
    getActivities: `/activity/get-activities/${id}`,
    getComments: `/comment/get-comments/${id}`,
    getAllTasks: `/task/get-tasks`,
    getTasksOfCustomer: `/task/get-tasks-of-customer/${id}`,
    getTaskById: `/task/get-task/${id}`,
    getAllNote: `/note/get-notes`,
    getCustomerNote: `/note/get-customer-notes/${id}`,
    getNoteById: `/note/get-note/${id}`,
    getAllproducts: `/product/products`,
    getProduct: `/product/get-product/${id}`,
    getDeals: `/deal/get-deals`,
    getDealById: `/deal/get-deal/${id}`,
    getCustomerCareByCustomer: `/customer-care/customer-care/${id}`,
    getCustomerCareById: `/customer-care/get-customer-care/${id}`,
  };
};

export const POST_API = () => {
  return {
    logout: "/auth/logout",
    createlead: "customer/create-customer",
    createSource: "/source/create-source",
    createActivity: "/activity/create-activity",
    sendEmail: "/email/send",
    getEmails: "/email/get-emails",
    createComment: "/comment/create-comment",
    createTask: "/task/create-task",
    createNote: "/note/create-note",
    createProduct: "/product/create-product",
    createDeal: "/deal/create-deal",
    createCustomerCare: "/customer-care/create-customer-care",
  };
};

export const PUT_API = (id) => {
  return {
    updateCustomer: `/customer/update-customer/${id}`,
    updateTask: `/task/update-task/${id}`,
    updateNote: `/note/update-note/${id}`,
    updateProduct: `/product/update-product/${id}`,
    updateQuotation: `/quotation/update-quotation/${id}`,
    updateDeal: `/deal/update-deal/${id}`,
    updateCustomerCare: `/customer-care/update-customer-care/${id}`,
  };
};

export const DELETE_API = (id) => {
  return {
    deleteCustomer: `/customer/delete-customer/${id}`,
    deleteSource: `/source/delete-source/${id}`,
    deleteComment: `/comment/delete-comment/${id}`,
    deleteTask: `/task/delete-task/${id}`,
    deleteNote: `/note/delete-note/${id}`,
    deleteProduct: `/product/delete-product/${id}`,
    deleteQuotation: `/quotation/delete-quotation/${id}`,
    deleteDeal: `/deal/delete-deal/${id}`,
    deleteCustomerCare: `/customer-care/delete-customer-care/${id}`,
  };
};
