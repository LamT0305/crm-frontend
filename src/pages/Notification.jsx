import React, { useEffect, useRef } from "react";
import ReloadIcon from "../assets/Reload";
import useNotification from "../hooks/useNotification";
import NotiIcon from "../assets/NotiIcon";
import CloseIcon from "../assets/CloseIcon";

function Notification({ setOpenNoti }) {
  const { notifications, fetchNotifications, deleteNotificationHandler } =
    useNotification();
  const notiRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setOpenNoti(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-100 transition-all duration-300">
      <div
        ref={notiRef}
        className="absolute right-0 top-0 w-[400px] h-full bg-white shadow-2xl animate-slide-in"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <NotiIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fetchNotifications()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ReloadIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setOpenNoti(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <CloseIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Body */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] space-y-4 text-gray-500">
            <NotiIcon className="w-16 h-16 text-gray-300" />
            <p className="text-lg font-medium">No notifications yet</p>
            <p className="text-sm">We'll notify you when something arrives</p>
          </div>
        ) : (
          <div className="h-[calc(100%-80px)] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="group relative hover:bg-gray-50 transition-all duration-200"
              >
                <div
                  onClick={() => {
                    if (notification.link && notification.link !== "") {
                      window.location.href = notification.link;
                    }
                  }}
                  className="p-6 border-b border-gray-100 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotificationHandler(notification._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-full transition-all duration-200"
                    >
                      <CloseIcon className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <time className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {new Date(notification.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Notification;
