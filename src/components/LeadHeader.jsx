import React from "react";
import Plus from "../assets/Plus.png";

function LeadHeader({ setIsOpen }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 shadow-sm bg-white px-5 py-3">
      <h2 className="font-bold text-xl text-gray-500	">Leads</h2>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center bg-black rounded-xl py-1 px-4 cursor-pointer text-white"
      >
        <img src={Plus} alt="" className="mr-2" />
        <p>Create</p>
      </div>
    </div>
  );
}

export default LeadHeader;
