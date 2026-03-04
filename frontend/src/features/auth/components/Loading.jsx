import React from "react";
import Nav from "./Nav"
const Loader = () => {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
    <Nav/>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#1DB954]"></div>
    </div>
    </>
  );
};

export default Loader;