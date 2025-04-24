import { useDispatch, useSelector } from "react-redux";
import { DELETE_API, GET_API, POST_API, PUT_API } from "../services/APIs";
import axiosInstance from "../services/Axios";
import { getToken } from "../utils/auth";
import { notify } from "../utils/Toastify";
import {
  setLoading,
  setError,
  setWorkspaces,
  setCurrentWorkspace,
  addWorkspace,
  clearWorkspaceState,
  setWorkspaceDetails,
  updateWorkspaceDetails,
} from "../redux/slice/workspaceSlice";
import { useNavigate } from "react-router-dom";

const useWorkspace = () => {
  const dispatch = useDispatch();
  const {
    workspaces,
    currentWorkspace,
    isLoading,
    error,
    hasCompletedOnboarding,
    workspace,
  } = useSelector((state) => state.workspace);
  const token = getToken();
  const navigate = useNavigate();

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
        handleGetWorkspaceDetails();
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
        dispatch(setWorkspaceDetails(res.data.data));
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
        handleGetUserWorkspaces();
        handleGetWorkspaceDetails();
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
        console.log(res.data.data);
        notify.success("Invitation sent successfully");
      }
    } catch (error) {
      console.error(error);
      notify.error(
        error.response?.data?.message || "Failed to send invitation"
      );
      if (error.response?.status === 403) {
        notify.error("Only Admin can invite people");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleJoinWorkspace = async (token) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(
        `${GET_API().joinWorkspace}/${token}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.status === 200) {
        // Refresh workspaces list
        await handleGetUserWorkspaces();
        notify.success("Joined workspace successfully");
        navigate("/");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Join workspace error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to join workspace";
      notify.error(errorMessage);
      setError(errorMessage);
      navigate("/");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearWorkspace = () => {
    dispatch(clearWorkspaceState());
  };

  const handleUpdateWorkspaceName = async (workspaceId, newName) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.put(
        PUT_API().updateWorkspaceName,
        { workspaceId: workspaceId, name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        handleGetWorkspaceDetails();
        handleGetUserWorkspaces();
        notify.success("Workspace name updated successfully");
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(
          error.response?.data?.message || "Failed to update workspace name"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(
        DELETE_API(workspaceId).deleteWorkspace,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        notify.success("Workspace deleted successfully");
        handleGetUserWorkspaces();
        handleGetWorkspaceDetails();
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(error.response?.data?.message || "Failed to delete workspace")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLeaveWorkspace = async (workspaceId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(
        DELETE_API(workspaceId).leaveWorkspace,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        notify.success("Left workspace successfully");
        handleGetUserWorkspaces();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMember = async (workspaceId, memberId) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(
        `${DELETE_API(workspaceId).kickMember}/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        notify.success("Member deleted successfully");
        handleGetWorkspaceDetails();
      }
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to delete member");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetMemberRole = async (workspaceId, memberId, role) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.put(
        PUT_API().setMemberRole,
        { workspaceId: workspaceId, userId: memberId, role: role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(updateWorkspaceDetails(res.data.data.workspace));
        notify.success("Member role updated successfully");
      }
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.error || "Failed to set member role");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    workspaces,
    currentWorkspace,
    isLoading,
    error,
    hasCompletedOnboarding,
    workspace,
    handleGetWorkspaceDetails,
    handleCreateWorkspace,
    handleInviteMember,
    handleJoinWorkspace,
    handleClearWorkspace,
    handleGetUserWorkspaces,
    handleSwitchWorkspace,
    handleUpdateWorkspaceName,
    handleDeleteWorkspace,
    handleLeaveWorkspace,
    handleDeleteMember,
    handleSetMemberRole,
  };
};

export default useWorkspace;
