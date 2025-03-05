// src/utils/auth.js
export const storeToken = (token) => {
  localStorage.setItem("crm_token", token);
};

export const getToken = () => {
  return localStorage.getItem("crm_token");
};

export const removeToken = () => {
  localStorage.removeItem("crm_token");
};
