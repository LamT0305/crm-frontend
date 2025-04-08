import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";

const CreateGroup = ({ open, onClose, onCreate }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { users, handleGetUsers } = useUser();

  useEffect(() => {
    if (open) {
      handleGetUsers();
    }
  }, [open]);

  const handleCreate = () => {
    if (groupName && selectedMembers.length > 0) {
      onCreate(
        groupName,
        selectedMembers.map((member) => member._id)
      );

      console.log(selectedMembers.map((member) => member._id))
      handleReset();
    }
  };

  const handleReset = () => {
    setGroupName("");
    setSelectedMembers([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Group</h2>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedMembers.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs">{member.name.charAt(0)}</span>
                      )}
                    </div>
                    {member.name}
                    <button
                      onClick={() =>
                        setSelectedMembers(
                          selectedMembers.filter((m) => m._id !== member._id)
                        )
                      }
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="border border-gray-300 rounded-lg">
                <ul className="max-h-40 overflow-y-auto">
                  {users
                    .filter(
                      (user) =>
                        !selectedMembers.find(
                          (member) => member._id === user._id
                        )
                    )
                    .map((user) => (
                      <li
                        key={user._id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() =>
                          setSelectedMembers([...selectedMembers, user])
                        }
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs">
                              {user.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        {user.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!groupName || selectedMembers.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !groupName || selectedMembers.length === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
