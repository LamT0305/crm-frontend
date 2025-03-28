import { Link } from "react-router-dom";
import noti from "../assets/notifications.png";
import deal from "../assets/deal.png";
import logo from "../assets/logo.png";
import product from "../assets/product.png";
import logoutImg from "../assets/logout.png";
import { useAuth } from "../context/AuthContext";
import UserIcon from "../assets/UserIcon";
import Notification from "../pages/Notification";
import { useState } from "react";
import NotiIcon from "../assets/NotiIcon";
import StatisticIcon from "../assets/StatisticIcon";

const Sidebar = () => {
  const { logout } = useAuth();
  const [openNoti, setOpenNoti] = useState(false);
  return (
    <div className="w-[20%] bg-white border-r-2 border-gray-100 h-screen p-4 relative">
      {openNoti && <Notification setOpenNoti={setOpenNoti} />}

      <div className="flex items-center mb-10">
        <img src={logo} alt="" style={{ width: 70, height: 70 }} />
        <h2 className="text-xl font-bold">CRM System</h2>
      </div>
      <nav className="h-[80%]">
        <ul className="space-y-4">
          <li onClick={() => setOpenNoti(!openNoti)}>
            <Link
              // to="/notifications"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
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
      </nav>
    </div>
  );
};

export default Sidebar;
