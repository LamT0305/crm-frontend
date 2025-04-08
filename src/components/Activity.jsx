import React, { useEffect } from "react";
import useActivity from "../hooks/useActivity";
import TodoIcon from "../assets/TodoIcon";
import ChatIcon from "../assets/commentIcon";
import NoteIcon from "../assets/NoteIcon";
import MailIcon from "../assets/mailIcon";
import UserIcon from "../assets/UserIcon";
import DealIcon from "../assets/DealIcon";

function Activity({ id }) {
  const { activities, handleGetActivities } = useActivity();

  useEffect(() => {
    if (id) {
      handleGetActivities(id);
    }
  }, [id]);

  const getActivityIcon = (type) => {
    const iconClass = "w-5 h-5 text-gray-500";
    switch (type) {
      case "comment":
        return <ChatIcon className={iconClass} />;
      case "task":
        return <TodoIcon className={iconClass} />;
      case "note":
        return <NoteIcon className={iconClass} />;
      case "email":
        return <MailIcon className={iconClass} />;
      case "customer":
        return <UserIcon className={iconClass} />;
      case "deal":
        return <DealIcon className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm h-full p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Activity Timeline</h2>
        <span className="ml-3 px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-600">
          {activities.length}
        </span>
      </div>

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[200px] text-gray-500 bg-gray-50 rounded-lg">
          <NoteIcon className="w-12 h-12 mb-3 text-gray-300" />
          <p className="text-lg font-medium">No activities yet</p>
          <p className="text-sm text-gray-400">Activities will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="max-h-[clamp(200px,75vh,75vh)] flex flex-col overflow-y-auto pr-4 space-y-4">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <p className="font-medium text-gray-900">
                      {activity.userId.name}
                    </p>
                    <span className="mx-2 text-gray-300">•</span>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <p className="text-gray-600">{activity.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Activity;
