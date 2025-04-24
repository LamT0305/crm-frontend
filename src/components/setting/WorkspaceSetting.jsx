import React, { useState } from "react";
import WorkspaceIcon from "../../assets/Workspace";
import Menu from "../../assets/Menu";
import EditIcon from "../../assets/EditIcon";
import SaveIcon from "../../assets/SaveIcon";

const WorkspaceSettings = ({
  workspace,
  workspaces,
  currentWorkspace,
  isLoading,
  onSwitchWorkspace,
  onSaveNewName,
  onShowDeleteModal,
  onShowLeaveModal,
  onShowKickMemberModal,
  onSetMember,
  onAddNewWorkspace,
  onInviteMember,
  users,
}) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const form = new FormData();
    form.append("email", inviteEmail);
    onInviteMember(form);
    setInviteEmail("");
    setDisplayResults(false);
  };

  const handleSaveNewName = () => {
    onSaveNewName(workspace.workspace._id, name);
    setEditName(false);
    setName("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex w-full h-full overflow-x-auto">
      <div className="w-[65%] px-4 border-r border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 mb-6">
          <h2 className="text-xl font-semibold mb-4">Workspace Details</h2>

          {workspace.isOwner ? (
            <span
              onClick={onShowDeleteModal}
              className="px-2 py-1 cursor-pointer mb-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-500 hover:text-white"
            >
              Delete
            </span>
          ) : (
            <span
              onClick={onShowLeaveModal}
              className="px-2 py-1 cursor-pointer mb-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-500 hover:text-white"
            >
              Leave
            </span>
          )}
        </div>

        {workspace && (
          <>
            <div className="mb-6">
              <p className="text-gray-600 font-semibold mb-4">
                Workspace name:
              </p>
              <div className="flex justify-between items-center">
                {editName ? (
                  <input
                    type="text"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="font-medium bg-gray-100 px-4 py-2 rounded-lg w-[75%] shadow-sm border-0"
                  />
                ) : (
                  <p className="font-medium bg-gray-100 px-4 py-2 rounded-lg w-[75%] shadow-sm">
                    {workspace.workspace?.name}
                  </p>
                )}

                <div>
                  {editName ? (
                    <div onClick={handleSaveNewName}>
                      <SaveIcon className="w-[30px] h-[30px] cursor-pointer hover:text-gray-400" />
                    </div>
                  ) : (
                    <div onClick={() => setEditName(true)}>
                      <EditIcon className="w-[30px] h-[30px] cursor-pointer hover:text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 font-semibold mb-4">Owner:</p>
              <p className="font-medium bg-gray-100 px-4 py-2 rounded-lg w-[75%] shadow-sm">
                {workspace.workspace?.owner?.name}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Invite Team Member</h3>
              <form
                onSubmit={handleInvite}
                className="flex justify-between relative"
              >
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="px-4 py-2 rounded-lg border w-[75%]"
                  onClick={() => setDisplayResults(true)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Invite"}
                </button>
                {inviteEmail.length > 0 && displayResults && (
                  <div className="absolute bg-white shadow-md w-full left-0 top-full p-4 max-h-[30vh] mt-2">
                    {users.map((user) => (
                      <div
                        onClick={() => {
                          setInviteEmail(user.email);
                          setDisplayResults(false);
                        }}
                        key={user._id}
                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <p>{user.email}</p>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Team Members</h3>
              <div className="overflow-x-auto max-h-[30vh]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {workspace.isOwner && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workspace.workspace?.members?.map((member) => (
                      <tr key={member._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              {member.user?.name?.charAt(0)}
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {member.user?.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.user?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {member.status}
                          </span>
                        </td>
                        {workspace.isOwner && (
                          <>
                            {member.role !== "Admin" && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  onClick={() => {
                                    onShowKickMemberModal();
                                    onSetMember(member.user._id);
                                  }}
                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-500 hover:text-white cursor-pointer"
                                >
                                  Remove
                                </span>
                              </td>
                            )}
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-[35%] px-4 h-full">
        <div className="flex items-center justify-between border-b border-gray-200 mb-6">
          <div className="flex items-center mb-4">
            <WorkspaceIcon className="w-[25px] h-[25px] mr-3" />
            <h2 className="text-lg font-semibold">All spaces</h2>
          </div>

          <p
            onClick={onAddNewWorkspace}
            className="px-2 py-1 cursor-pointer mb-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-grey-800 hover:bg-green-500 hover:text-white"
          >
            New
          </p>
        </div>
        <div className="flex flex-col justify-end items-center">
          {workspaces.map((ws) => (
            <div
              key={ws._id}
              onClick={() => onSwitchWorkspace(ws._id)}
              className={`cursor-pointer px-4 py-2 rounded-xl mb-2 w-[85%] ${
                currentWorkspace && currentWorkspace.name === ws.name
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              <p className="flex items-center font-semibold">
                <Menu className="w-[20px] h-[20px] mr-2" /> {ws.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettings;
