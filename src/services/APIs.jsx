export const GET_API = () => {
  return {
    profile: "/auth/profile",
    login: "/auth/google",
  };
};

export const POST_API = () => {
  return {
    logout: "/auth/logout",
  };
};
