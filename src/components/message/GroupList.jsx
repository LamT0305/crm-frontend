import React from "react";
import { formatDistanceToNow } from "date-fns";

const GroupList = ({ groups, currentChat, onSelectChat, onCreateGroup }) => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 pb-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Groups</h2>
        <button
          onClick={onCreateGroup}
          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Group
        </button>
      </div>
      <hr className="border-gray-200" />
      <ul className="p-0">
        {groups.map((group) => (
          <li
            key={group._id}
            onClick={() => onSelectChat({ ...group, type: "group" })}
            className={`flex items-center p-3 cursor-pointer transition-colors ${
              currentChat?._id === group._id
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="relative flex -space-x-2">
              {group.members?.length > 0 ? (
                group.members.slice(0, 2).map((member) => (
                  <div
                    key={member._id}
                    className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white overflow-hidden"
                  >
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-blue-600">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium">{group.name}</span>
                {group.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(
                      new Date(group.lastMessage.createdAt),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {group.lastMessage?.content || "No messages yet"}
              </p>
            </div>

            {group.unreadCount > 0 && currentChat?._id !== group._id && (
              <div className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {group.unreadCount}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
