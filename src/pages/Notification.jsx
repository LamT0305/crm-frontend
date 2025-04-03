import React, { useEffect, useRef } from "react";
import ReloadIcon from "../assets/Reload";
import useNotification from "../hooks/useNotification";
import NotiIcon from "../assets/NotiIcon";
import CloseIcon from "../assets/CloseIcon";

function Notification({ setOpenNoti }) {
  const { notifications, fetchNotifications, deleteNotificationHandler } =
    useNotification();
  useEffect(() => {
    fetchNotifications();
  }, []);

  const notiRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setOpenNoti(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log(notifications);
  return (
    <div className="absolute left-full top-0 w-[100vw] h-full bg-black/10 z-1000">
      <div
        ref={notiRef}
        className="w-[30%] h-full bg-white border-l border-gray-300 flex flex-col"
      >
        {/* header */}
        <div className="p-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-500">Notifications</p>
          <div className="flex items-center">
            <div onClick={() => fetchNotifications()}>
              <ReloadIcon
                className={
                  "w-6 h-6 bg-gray-200 p-1 rounded-lg cursor-pointer hover:bg-gray-100 mr-3"
                }
              />
            </div>
            <div onClick={() => setOpenNoti(false)}>
              <CloseIcon
                className={
                  "w-6 h-6 bg-gray-200 p-1 rounded-lg cursor-pointer hover:bg-gray-100"
                }
              />
            </div>
          </div>
        </div>
        {/* body */}
        {notifications.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center">
            <NotiIcon className={"w-[30px] h-[30px] mr-2"} />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="h-[85vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => {
                  if (notification.link !== "") {
                    window.location.href = notification.link;
                  }
                }}
                className="px-4 py-2 border-b border-gray-200 cursor-pointer flex items-center justify-between hover:bg-gray-100"
              >
                <div>
                  <p className="font-semibold text-sm">{notification.title}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {notification.message}
                  </p>

                  <p className="text-xs bg-gray-100 w-fit px-2 py-1 rounded-lg">
                    {new Date(notification.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div
                  onClick={() => deleteNotificationHandler(notification._id)}
                >
                  <CloseIcon
                    className={
                      "w-5 h-5 bg-gray-200 p-1 rounded-lg cursor-pointer hover:bg-gray-100"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
