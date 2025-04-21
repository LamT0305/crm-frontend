import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 w-[80%]">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      {/* <h2 className="text-xl text-gray-600">Loading...</h2> */}
    </div>
  );
};

export default LoadingScreen;
