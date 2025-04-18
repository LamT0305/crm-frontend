import { Link } from "react-router-dom";
import deal from "../assets/deal.png";
import logo from "../assets/logo.png";
import product from "../assets/product.png";
import logoutImg from "../assets/logout.png";
import { useAuth } from "../context/AuthContext";
import UserIcon from "../assets/UserIcon";
import Notification from "../pages/Notification";
import { useEffect, useState, useMemo } from "react";
import NotiIcon from "../assets/NotiIcon";
import StatisticIcon from "../assets/StatisticIcon";
import WorkspaceIcon from "../assets/Workspace";
import useWorkspace from "../hooks/useWorkspace";
import Menu from "../assets/Menu";
import ConfirmModal from "../components/ConfirmModal";
import SettingsIcon from "../assets/SettingIcon";
import MessageIcon from "../assets/MessageIcon";
import { notify } from "../utils/Toastify";

const Sidebar = ({ setAddWS }) => {
  const { logout } = useAuth();
  const [openNoti, setOpenNoti] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    workspace: null,
  });
  const [openWS, setOpenWS] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const {
    workspaces,
    currentWorkspace,
    handleGetUserWorkspaces,
    handleSwitchWorkspace,
  } = useWorkspace();

  const isDisabled = useMemo(
    () => !workspaces || workspaces.length === 0,
    [workspaces]
  );

  useEffect(() => {
    handleGetUserWorkspaces();
  }, []);

  const handleSwitchWS = (ws) => {
    setConfirmModal({
      isOpen: true,
      workspace: ws,
    });
  };

  const handleConfirmSwitch = async () => {
    try {
      await handleSwitchWorkspace(confirmModal.workspace._id);
    } catch (error) {
      notify.error("Failed to switch workspace");
    }
    setConfirmModal({ isOpen: false, workspace: null });
  };

  const handleNavigation = (e, item) => {
    if (isDisabled) {
      e.preventDefault();
      notify.warning("Please create or join a workspace first");
    } else {
      setActiveItem(item);
    }
  };

  const NavLink = ({ to, children, onClick, item }) => (
    <Link
      to={to}
      onClick={(e) => {
        handleNavigation(e, item);
        onClick?.(e);
      }}
      className={`block p-3 rounded-lg flex items-center transition-all duration-300 ${
        activeItem === item ? "bg-gray-100 shadow-sm" : ""
      } ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-50 hover:shadow-md cursor-pointer"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <div className="w-[20%] bg-white border-r border-gray-200 h-screen p-6 relative shadow-sm">
      {openNoti && <Notification setOpenNoti={setOpenNoti} />}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, workspace: null })}
        onConfirm={handleConfirmSwitch}
        title="Switch Workspace"
        message={
          confirmModal.workspace
            ? `Are you sure you want to switch to "${confirmModal.workspace.name}" workspace?`
            : ""
        }
      />

      <div className="flex items-center mb-8 p-2 hover:bg-gray-50 rounded-lg transition-all duration-300">
        <img
          src={logo}
          alt="CRM Logo"
          className="w-[60px] h-[60px] object-contain"
        />
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          CRM System
        </h2>
      </div>

      <nav className="h-[85%] overflow-y-auto custom-scrollbar">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="#"
              onClick={() => !isDisabled && setOpenNoti(true)}
              item="notifications"
            >
              <NotiIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistic" item="statistics">
              <StatisticIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Statistics</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" item="leads">
              <UserIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Leads</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/deals" item="deals">
              <img src={deal} alt="" className="w-[25px] h-[25px] mr-3" />
              <span className="text-gray-700">Deals</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" item="customers">
              <UserIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/product-services" item="products">
              <img src={product} alt="" className="w-[25px] h-[25px] mr-3" />
              <span className="text-gray-700">Product Services</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/messages" item="messages">
              <MessageIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/setting" item="settings">
              <SettingsIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Settings</span>
            </NavLink>
          </li>
          <li>
            <div
              className="block p-3 rounded-lg flex items-center transition-all duration-300 hover:bg-red-50 cursor-pointer"
              onClick={logout}
            >
              <img
                src={logoutImg}
                alt="Logout"
                className="w-[25px] h-[25px] mr-3"
              />
              <span className="text-red-600">Log out</span>
            </div>
          </li>
        </ul>

        <hr className="my-6 border-gray-200" />

        <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
          <div className="flex items-center justify-between w-full p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-300">
            <div
              onClick={() => setOpenWS(!openWS)}
              className="flex items-center w-full"
            >
              <WorkspaceIcon className="w-[25px] h-[25px] mr-3 text-gray-600" />
              <span className="text-gray-700">Spaces</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setAddWS(true);
              }}
              className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              New
            </button>
          </div>

          {openWS && (
            <ul className="bg-white">
              {workspaces &&
                currentWorkspace &&
                workspaces.map((ws) => (
                  <li
                    onClick={() => handleSwitchWS(ws)}
                    key={ws._id}
                    className="border-t border-gray-100"
                  >
                    <div
                      className={`flex items-center text-sm p-3 transition-all duration-300 ${
                        currentWorkspace.name === ws.name
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      } cursor-pointer`}
                    >
                      <Menu className="w-[15px] h-[15px] mr-3 flex-shrink-0" />
                      <p className="truncate">{ws.name}</p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </nav>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
