import React from "react";

function CustomerNavigation({ tagName, setTagName }) {
  return (
    <div className="w-[100%]">
      <ul className="flex items-center justify-start w-[100%] bg-white  px-4 py-1">
        <li
          onClick={() => setTagName("activity")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "activity" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Activities
        </li>
        <li
          onClick={() => setTagName("email")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "email" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Emails
        </li>
        <li
          onClick={() => setTagName("comment")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "comment" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Comments
        </li>
        <li
          onClick={() => setTagName("data")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "data" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Data
        </li>
        <li
          onClick={() => setTagName("task")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "task" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Tasks
        </li>
        <li
          onClick={() => setTagName("note")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "note" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Notes
        </li>
        <li
          onClick={() => setTagName("customer_care")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "customer_care"
              ? "text-black border-b"
              : "text-gray-400"
          }`}
        >
          Customer Care
        </li>
        <li
          onClick={() => setTagName("deal")}
          className={`px-6 py-4 hover:bg-gray-200 cursor-pointer rounded-t-lg  ${
            tagName === "deal" ? "text-black border-b" : "text-gray-400"
          }`}
        >
          Deals
        </li>
      </ul>
    </div>
  );
}

export default CustomerNavigation;
