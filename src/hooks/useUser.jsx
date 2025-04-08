import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setUsers,
  setLoading,
  setFilterUsers,
  setUser,
  updateUserProfile,
  logout,
  setAuthenticated,
} from "../redux/slice/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const token = getToken();
  const { users, loading, filteredUsers, user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleGetUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().userList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUsers(response.data.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFilterUsers = (field, value) => {
    dispatch(setFilterUsers({ field, value }));
  };

  const handleGetWorkspaceUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().workspaceUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setUsers(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching workspace users:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        dispatch(setLoading(false));
        return true;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(setLoading(false));
      return false;
    }
  };

  const handleUpdateUserProfile = async (userData) => {
    dispatch(updateUserProfile(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSetAuthenticated = (isAuthenticated) => {
    dispatch(setAuthenticated(isAuthenticated));
  };

  return {
    users: filteredUsers,
    loading,
    user,
    isAuthenticated,
    handleGetUsers,
    handleFilterUsers,
    handleGetWorkspaceUsers,
    handleGetUser,
    handleUpdateUserProfile,
    handleLogout,
    handleSetAuthenticated,
  };
};

export default useUser;
