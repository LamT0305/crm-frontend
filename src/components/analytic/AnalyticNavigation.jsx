import React from "react";

function AnalyticNavigation({ tag, setTag }) {
  return (
    <div>
      <ul className="flex items-center bg-white mb-2 px-2 font-semibold shadow-sm cursor-pointer">
        <li
          onClick={() => setTag("customer-analytics")}
          className={`px-2 py-5 hover:bg-gray-100 cursor-pointer ${
            tag === "customer-analytics" ? "bg-gray-100" : ""
          }`}
        >
          Customer analytics
        </li>
        <li
          onClick={() => setTag("deal-analytics")}
          className={`px-2 py-5 hover:bg-gray-100 cursor-pointer ${
            tag === "deal-analytics" ? "bg-gray-100" : ""
          }`}
        >
          Deal analytics
        </li>
        <li
          onClick={() => setTag("customer-interaction")}
          className={`px-2 py-5 hover:bg-gray-100 cursor-pointer ${
            tag === "customer-interaction" ? "bg-gray-100" : ""
          }`}
        >
          Customer Interaction Analytics
        </li>
        <li
          onClick={() => setTag("sale-performance")}
          className={`px-2 py-5 hover:bg-gray-100 cursor-pointer ${
            tag === "sale-performance" ? "bg-gray-100" : ""
          }`}
        >
          Sales Performance
        </li>
      </ul>
    </div>
  );
}

export default AnalyticNavigation;
