import React from "react";

function CustomerCare() {
  return (
    <div className="w-full h-full bg-white">
      <div className="flex items-center justify-between shadow-md py-2 px-8">
        <p className="font-bold text-lg">Customer care</p>
        <p
          onClick={() => setOpenEmailForm(true)}
          className="bg-black py-1 px-2 cursor-pointer rounded-xl text-white hover:bg-gray-200 hover:text-black"
        >
          + New email
        </p>
      </div>
    </div>
  );
}

export default CustomerCare;
