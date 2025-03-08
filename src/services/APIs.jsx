export const GET_API = (id) => {
  return {
    profile: "/auth/profile",
    login: "/auth/google",
    getLeads: "/customer/get-all-leads",
    getCustomers: "/customer/customers",
    getCustomerById: `/customer/get-customer/${id}`,
    getSources: "/source/get-sources",
  };
};

export const POST_API = () => {
  return {
    logout: "/auth/logout",
    createlead: "customer/create-customer",
    createSource: "/source/create-source",
  };
};

export const PUT_API = (id) => {
  return {
    updateCustomer: `/customer/update-customer/${id}`,
  };
};

export const DELETE_API = (id) => {
  return {
    deleteCustomer: `/customer/delete-customer/${id}`,
    deleteSource: `/source/delete-source/${id}`,
  };
};
