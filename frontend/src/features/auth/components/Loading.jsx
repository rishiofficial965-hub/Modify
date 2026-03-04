import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#1DB954]"></div>
    </div>
  );
};

export default Loader;