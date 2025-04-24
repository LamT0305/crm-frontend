import React from "react";

function CustomerHeader({ name, setOpenDeal }) {
  return (
    <div className="bg-white py-2 px-3 border-b border-r border-gray-300 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Mr/Ms {name}</p>
        <p
          onClick={() => setOpenDeal(true)}
          className="py-1 px-2 rounded-lg bg-black text-white cursor-pointer"
        >
          Create deal
        </p>
      </div>
    </div>
  );
}

export default CustomerHeader;
