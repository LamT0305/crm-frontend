import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API } from "../services/APIs";
import axiosInstance from "../services/Axios";
import { getToken } from "../utils/auth";
import { notify } from "../utils/Toastify";
import {
  setLoading,
  setError,
  setWorkspaces,
  setCurrentWorkspace,
  addWorkspace,
  setOnboardingStatus,
  clearWorkspaceState,
} from "../redux/slice/workspaceSlice";

const useWorkspace = () => {
  const dispatch = useDispatch();
  const {
    workspaces,
    currentWorkspace,
    isLoading,
    error,
    hasCompletedOnboarding,
  } = useSelector((state) => state.workspace);
  const token = getToken();

  const handleGetUserWorkspaces = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await axiosInstance.get(GET_API().userWorkspaces, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setWorkspaces(res.data.data.workspaces));
        dispatch(setCurrentWorkspace(res.data.data.currentWorkspace));
        // dispatch(setOnboardingStatus(res.data.data[0].hasCompletedOnboarding));
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(
          error.response?.data?.message || "Failed to get user workspaces"
        )
      );
    }
    dispatch(setLoading(false));
  };

  const handleSwitchWorkspace = async (workspaceId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        POST_API().switchWorkspace,
        { workspaceId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(setCurrentWorkspace(res.data.data.currentWorkspace));
        // dispatch(setOnboardingStatus(res.data.data.hasCompletedOnboarding));
        notify.success("Workspace switched successfully");
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(error.response?.data?.message || "Failed to switch workspace")
      );
      notify.error(
        error.response?.data?.message || "Failed to switch workspace"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetWorkspaceDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API().workspaceDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setCurrentWorkspace(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(
          error.response?.data?.message || "Failed to get workspace details"
        )
      );
      notify.error(
        error.response?.data?.message || "Failed to get workspace details"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreateWorkspace = async (workspaceData) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        POST_API().createWorkspace,
        workspaceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(addWorkspace(res.data.data));
        notify.success("Workspace created successfully");
        dispatch(setLoading(false));
        return true;
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(error.response?.data?.message || "Failed to create workspace")
      );
      notify.error(
        error.response?.data?.message || "Failed to create workspace"
      );
      dispatch(setLoading(false));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInviteMember = async (inviteData) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        POST_API().inviteMember,
        inviteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        notify.success("Invitation sent successfully");
        return true;
      }
    } catch (error) {
      console.error(error);
      notify.error(
        error.response?.data?.message || "Failed to send invitation"
      );
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleJoinWorkspace = async (token) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        `${POST_API().joinWorkspace}/${token}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(addWorkspace(res.data.data));
        notify.success("Joined workspace successfully");
        return true;
      }
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to join workspace");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearWorkspace = () => {
    dispatch(clearWorkspaceState());
  };

  return {
    workspaces,
    currentWorkspace,
    isLoading,
    error,
    hasCompletedOnboarding,
    handleGetWorkspaceDetails,
    handleCreateWorkspace,
    handleInviteMember,
    handleJoinWorkspace,
    handleClearWorkspace,
    handleGetUserWorkspaces,
    handleSwitchWorkspace,
  };
};

export default useWorkspace;
