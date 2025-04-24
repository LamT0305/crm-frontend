import React, { useEffect, useState } from "react";
import useWorkspace from "../hooks/useWorkspace";
import useUser from "../hooks/useUser";
import ConfirmModal from "../components/ConfirmModal";
import AddWorkspaceForm from "../components/form/AddWorkspaceForm";
import { useNavigate } from "react-router-dom";
import Feedback from "../components/setting/Feedback";
import WorkspaceSettings from "../components/setting/WorkspaceSetting";

function Setting() {
  const {
    currentWorkspace,
    workspaces,
    workspace,
    handleInviteMember,
    isLoading,
    handleGetUserWorkspaces,
    handleSwitchWorkspace,
    handleGetWorkspaceDetails,
    handleUpdateWorkspaceName,
    handleDeleteWorkspace,
    handleLeaveWorkspace,
    handleDeleteMember,
    handleSetMemberRole,
  } = useWorkspace();

  const {
    users,
    handleGetUsers,
    handleFilterUsers,
    handleGetUser,
    handleUpdateUserProfile,
    user,
    loading,
  } = useUser();

  const [state, setState] = useState({
    activeTab: "workspace",
    showDeleteModal: false,
    showLeaveModal: false,
    showKickMemberModal: false,
    member: null,
    addNewWS: false,
  });

  const navigate = useNavigate();

  // Check user onboarding status
  useEffect(() => {
    if (!loading && user && !user.hasCompletedOnboarding) {
      navigate("/welcome");
    }
  }, [loading, user, workspaces, navigate]);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          handleGetUserWorkspaces(),
          handleGetWorkspaceDetails(),
          handleGetUsers(),
          handleGetUser(),
        ]);
      } catch (error) {
        console.error("Failed to initialize data:", error);
      }
    };

    initializeData();
  }, []);

  const handleModalState = (modalType, value) => {
    setState((prev) => ({ ...prev, [modalType]: value }));
  };

  const handleDeleteWorkspaceAction = () => {
    handleDeleteWorkspace(workspace.workspace?._id);
    if (workspaces.length <= 1) {
      handleUpdateUserProfile({ ...user, hasCompletedOnboarding: false });
      navigate("/welcome");
    }
    handleModalState("showDeleteModal", false);
  };

  const handleLeaveWorkspaceAction = () => {
    handleLeaveWorkspace(workspace.workspace?._id);
    handleModalState("showLeaveModal", false);
  };

  const handleKickMemberAction = () => {
    if (state.member) {
      handleDeleteMember(workspace.workspace?._id, state.member);
      handleModalState("showKickMemberModal", false);
      setState((prev) => ({ ...prev, member: null }));
    }
  };

  const renderModals = () => (
    <>
      <ConfirmModal
        isOpen={state.showDeleteModal}
        onClose={() => handleModalState("showDeleteModal", false)}
        onConfirm={handleDeleteWorkspaceAction}
        title="Delete Workspace"
        message="Are you sure you want to delete this workspace? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
      <ConfirmModal
        isOpen={state.showLeaveModal}
        onClose={() => handleModalState("showLeaveModal", false)}
        onConfirm={handleLeaveWorkspaceAction}
        title="Leave Workspace"
        message="Are you sure you want to leave this workspace? This action cannot be undone."
        confirmText="Yes, Leave"
        cancelText="Cancel"
      />
      <ConfirmModal
        isOpen={state.showKickMemberModal}
        onClose={() => handleModalState("showKickMemberModal", false)}
        onConfirm={handleKickMemberAction}
        title="Remove member out of Workspace"
        message="Are you sure you want to remove this member? This action cannot be undone."
        confirmText="Yes, remove"
        cancelText="Cancel"
      />
    </>
  );

  const renderTabs = () => (
    <div className="flex items-center gap-6 mb-6 bg-white p-6">
      {["workspace", "feedback"].map((tab) => (
        <h2
          key={tab}
          onClick={() => setState((prev) => ({ ...prev, activeTab: tab }))}
          className={`text-xl font-bold px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
            state.activeTab === tab
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-50"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </h2>
      ))}
    </div>
  );

  return (
    <div className="p-6 w-[80%] h-full flex flex-col bg-white/30">
      {renderModals()}
      {state.addNewWS && (
        <AddWorkspaceForm
          setWS={(value) => handleModalState("addNewWS", value)}
        />
      )}
      {renderTabs()}

      <div className="h-[85vh] overflow-x-auto">
        {state.activeTab === "workspace" ? (
          <WorkspaceSettings
            workspace={workspace}
            workspaces={workspaces}
            currentWorkspace={currentWorkspace}
            isLoading={isLoading}
            onSwitchWorkspace={handleSwitchWorkspace}
            onSaveNewName={handleUpdateWorkspaceName}
            onShowDeleteModal={() => handleModalState("showDeleteModal", true)}
            onShowLeaveModal={() => handleModalState("showLeaveModal", true)}
            onShowKickMemberModal={() =>
              handleModalState("showKickMemberModal", true)
            }
            onSetMember={(member) => setState((prev) => ({ ...prev, member }))}
            onAddNewWorkspace={() => handleModalState("addNewWS", true)}
            onInviteMember={handleInviteMember}
            users={users}
            setMemberRole={handleSetMemberRole}
          />
        ) : (
          <Feedback />
        )}
      </div>
    </div>
  );
}

export default Setting;
