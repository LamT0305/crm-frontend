import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { GET_API, POST_API } from "../services/APIs";
import axiosInstance from "../services/Axios";
import { getToken } from "../utils/auth";

const AuthContext = createContext();
const baseURL = "https://crm-backend-bz03.onrender.com/api/v1";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(!!getToken());

  // ✅ Fetch user info using token
  const getUser = useCallback(async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(GET_API().profile, {
        headers: { Authorization: `Bearer ${token}` }, // 🔥 Use token in headers
      });
      if (res.status === 200) {
        setUser(res.data.user);
        setAuthenticated(true);
      } else {
        logout(); // Token invalid -> Logout
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser(); // ✅ Fetch user when component mounts
  }, [getUser]);

  // ✅ Login & store token
  const loginWithGoogle = () => {
    window.location.href = `${baseURL}${GET_API().login}`;
  };

  // ✅ Logout user & clear token
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY); // ❌ Remove token
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
