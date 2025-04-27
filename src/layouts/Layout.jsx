// src/components/Layout.js
import { data, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import AddWorkspaceForm from "../components/form/AddWorkspaceForm";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { notify } from "../utils/Toastify";
import { getToken } from "../utils/auth";
import useNotification from "../hooks/useNotification";
import useWorkspace from "../hooks/useWorkspace";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { handleGetUserWorkspaces, handleGetWorkspaceDetails } = useWorkspace();

  const navigate = useNavigate();
  const [addWS, setAddWS] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect inside useEffect to avoid render issues
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Prevent rendering while redirecting
  }

  const token = getToken();
  const BASE_URL = "https://auth.leadmastercrm.pro";
  // http://localhost:3000
  const { fetchNotifications } = useNotification();
  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (userId) {
          socket.emit("join", userId);
        }
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // task
    socket.on("new_task", (data) => {
      fetchNotifications();
      notify.info("New task received!");
    });
    //email
    socket.on("newEmail", (data) => {
      fetchNotifications();
      notify.info("New email received!");
    });

    //workspace
    socket.on("notiInvite", (data) => {
      notify.info("New invitation received!");
      fetchNotifications();
    });

    socket.on("notiJoin", (data) => {
      notify.info(data.data);
      fetchNotifications();
      handleGetUserWorkspaces();
      handleGetWorkspaceDetails();
    });
    socket.on("workspaceUpdated", (data) => {
      console.log("Received workspace update:", data);
      handleGetUserWorkspaces();
      handleGetWorkspaceDetails();
      notify.info(data.data.message || "Workspace updated!");
    });

    socket.on("workspaceDeleted", (data) => {
      console.log("Received workspace delete:", data);
      handleGetUserWorkspaces();
      handleGetWorkspaceDetails();
      notify.info(data.data.message || "Workspace deleted!");
    });

    socket.on("notiLeaveWS", (data) => {
      notify.info(data.data.message);
      handleGetUserWorkspaces();
      handleGetWorkspaceDetails();
    });

    socket.on("workspaceRemoval", (data) => {
      handleGetUserWorkspaces();
      handleGetWorkspaceDetails();
      notify.info(data.data.message || "Workspace removed!");
    });

    //message
    socket.on("newGroupNoti", (data) => {
      fetchNotifications();
      notify.info(data.data.message);
    });

    socket.on("newMessage", (data) => {
      fetchNotifications();
      if (!window.location.href.includes("/messages")) {
        notify.info(data.notification.title);
      }
    });

    socket.on("addedToGroup", (data) => {
      fetchNotifications();
      notify.success(data.noti.title);
    });

    socket.on("removedFromGroup", (data) => {
      fetchNotifications();
      notify.error(data.noti.title);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar setAddWS={setAddWS} />
      {/* Dynamic Page Content */}
      <Outlet />

      {addWS && <AddWorkspaceForm setWS={setAddWS} />}
    </div>
  );
};

export default Layout;
