import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import { setUsers, setLoading, setFilterUsers } from "../redux/slice/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const token = getToken();
  const { users, loading, filteredUsers } = useSelector((state) => state.user);

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

  const handleFilterUsers = (value) => {
    dispatch(setFilterUsers({ field: "email", value }));
  };

  return {
    users: filteredUsers,
    loading,
    handleGetUsers,
    handleFilterUsers,
  };
};

export default useUser;
