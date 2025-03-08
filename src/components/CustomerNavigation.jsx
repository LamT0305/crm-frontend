import React from "react";

function CustomerNavigation({ tagName, setTagName }) {
  return (
    <div className="w-[100%]">
      <ul className="flex items-center justify-start w-[100%] bg-white border-r border-gray-300 px-4 py-1">
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
      </ul>
    </div>
  );
}

export default CustomerNavigation;
