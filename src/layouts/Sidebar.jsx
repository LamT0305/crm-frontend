import { Link } from "react-router-dom";
import deal from "../assets/deal.png";
import logo from "../assets/logo.png";
import product from "../assets/product.png";
import logoutImg from "../assets/logout.png";
import { useAuth } from "../context/AuthContext";
import UserIcon from "../assets/UserIcon";
import Notification from "../pages/Notification";
import { useEffect, useState } from "react";
import NotiIcon from "../assets/NotiIcon";
import StatisticIcon from "../assets/StatisticIcon";
import WorkspaceIcon from "../assets/Workspace";
import useWorkspace from "../hooks/useWorkspace";
import Menu from "../assets/Menu";
import ConfirmModal from "../components/ConfirmModal";
import SettingsIcon from "../assets/SettingIcon";

const Sidebar = ({ setAddWS }) => {
  const { logout } = useAuth();
  const [openNoti, setOpenNoti] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    workspace: null,
  });

  const [openWS, setOpenWS] = useState(false);

  const {
    workspaces,
    currentWorkspace,
    handleGetUserWorkspaces,
    handleSwitchWorkspace,
  } = useWorkspace();
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

  return (
    <div className="w-[20%] bg-white border-r-2 border-gray-100 h-screen p-4 relative ">
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
      <div className="flex items-center mb-4">
        <img src={logo} alt="" style={{ width: 70, height: 70 }} />
        <h2 className="text-xl font-bold">CRM System</h2>
      </div>
      <nav className="h-[85%] overflow-y-auto">
        <ul className="space-y-4">
          <li onClick={() => setOpenNoti(true)}>
            <Link className="block p-2 hover:bg-gray-200 rounded flex items-center">
              <NotiIcon className={"w-[30px] h-[30px] mr-2"} />
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/leads"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <UserIcon className={"w-[30px] h-[30px] mr-2"} />
              Leads
            </Link>
          </li>
          <li>
            <Link
              to="/deals"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={deal} alt="" className="mr-2" />
              Deals
            </Link>
          </li>
          <li>
            <Link
              to="/customers"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <UserIcon className={"w-[30px] h-[30px] mr-2"} /> Customers
            </Link>
          </li>
          <li>
            <Link
              to="/product-services"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={product} alt="" className="mr-2" />
              Product Services
            </Link>
          </li>
          <li>
            <Link
              to="/statistic"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <StatisticIcon className={"w-[30px] h-[30px] mr-2"} />
              Statistic
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <SettingsIcon className={"w-[30px] h-[30px] mr-2"} />
              Setting
            </Link>
          </li>
          <li>
            <div
              className="block p-2 hover:bg-gray-200 rounded flex items-center cursor-pointer"
              onClick={logout}
            >
              <img
                src={logoutImg}
                alt=""
                width={30}
                height={30}
                className="mr-2"
              />
              <p>Log out</p>
            </div>
          </li>
        </ul>
        <hr className="border-gray-300 my-2" />
        {/* workspace */}
        <div
          onClick={() => setOpenWS(!openWS)}
          className="flex items-center justify-between w-full p-2 border-b border-gray-200 mb-2 cursor-pointer hover:bg-gray-200 hover:rounded-lg"
        >
          <div className="flex items-center">
            <WorkspaceIcon className={"w-[30px] h-[30px] mr-2"} />
            <p>Spaces</p>
          </div>

          <p
            onClick={() => setAddWS(true)}
            className="bg-black text-white font-semibold text-xs p-1 rounded-md hover:bg-gray-300 hover:text-black cursor-pointer"
          >
            New
          </p>
        </div>
        {/* list workspace */}
        {openWS && (
          <ul className="">
            {workspaces &&
              currentWorkspace &&
              workspaces.map((ws) => (
                <li
                  onClick={() => handleSwitchWS(ws)}
                  key={ws._id}
                  className="pl-5 mb-2"
                >
                  <div
                    className={`flex items-center text-sm text-black w-full overflow-x-auto ${
                      currentWorkspace.name === ws.name
                        ? "bg-gray-200 rounded-lg"
                        : "border-b border-gray-200"
                    }  p-2  hover:bg-gray-400 hover:text-white hover:rounded-lg cursor-pointer`}
                  >
                    <Menu className={`w-[15px] h-[15px] mr-2`} />{" "}
                    <p>{ws.name}</p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
