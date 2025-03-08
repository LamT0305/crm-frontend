import React from "react";

function CustomerHeader({ name }) {
  return (
    <div className="bg-white py-2 px-3 text-lg font-bold border-b border-r border-gray-300 shadow-sm">
      Mr/Ms {name}
    </div>
  );
}

export default CustomerHeader;
