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
  return (
    <div className="bg-white h-full px-8 py-5">
      <p className="font-bold text-xl">Activity</p>
      {activities.length === 0 ? (
        <>
          <p>No activity</p>
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="max-h-[clamp(200px,75vh,75vh)] flex flex-col overflow-y-auto">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="text-sm flex items-center mt-5 px-2"
              >
                <p>
                  {activity.type === "comment" ? (
                    <ChatIcon className={"mr-2 w-5 h-5 text-gray-400"} />
                  ) : null}
                </p>
                <p>
                  {activity.type === "task" ? (
                    <TodoIcon className={"mr-2 w-5 h-5 text-gray-400"} />
                  ) : null}
                </p>
                <p>
                  {activity.type === "note" ? (
                    <NoteIcon className={"mr-2 w-5 h-5 text-gray-400"} />
                  ) : null}
                </p>
                <p>
                  {activity.type === "email" ? (
                    <MailIcon className={"mr-2 w-5 h-5 text-gray-400"} />
                  ) : null}
                </p>
                <p>
                  {activity.type === "customer" ? (
                    <UserIcon className={"mr-2 w-5 h-5 text-gray-400"} />
                  ) : null}
                </p>
                <p>
                  {activity.type === "deal" ? (
                    <DealIcon className={"mr-2 w-5 h-5 text-gray-400"} />
                  ) : null}
                </p>
                <p className="font-semibold mr-2">{activity.userId.name}</p>
                <p className="text-gray-400">{activity.subject}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Activity;
