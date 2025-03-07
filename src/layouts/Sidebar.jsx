import { Link } from "react-router-dom";
import noti from "../assets/notifications.png";
import lead from "../assets/lead.png";
import deal from "../assets/deal.png";
import note from "../assets/note.png";
import task from "../assets/task.png";
import logo from "../assets/logo.png";
import product from "../assets/product.png";
import logoutImg from "../assets/logout.png";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-[20%] bg-white border-r-2 border-gray-100 h-screen p-4 ">
      <div className="flex items-center mb-10">
        <img src={logo} alt="" style={{ width: 70, height: 70 }} />
        <h2 className="text-xl font-bold">CRM System</h2>
      </div>
      <nav className="h-[80%]">
        <ul className="space-y-4">
          <li>
            <Link
              to="/notifications"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={noti} alt="" className="mr-2" width={30} height={30} />
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/leads"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={lead} alt="" className="mr-2" />
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
              to="/deals"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={lead} alt="" className="mr-2" />
              Customers
            </Link>
          </li>
          <li>
            <Link
              to="/deals"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={product} alt="" className="mr-2" />
              Product Services
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={task} alt="" className="mr-2" />
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="block p-2 hover:bg-gray-200 rounded flex items-center"
            >
              <img src={note} alt="" className="mr-2" />
              Notes
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
