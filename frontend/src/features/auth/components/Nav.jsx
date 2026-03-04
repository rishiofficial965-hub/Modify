import React from "react";
import { Link, useLocation } from "react-router";

const Nav = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white/40 backdrop-blur-3xl rounded-full px-8 py-3 flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-white/40 z-50">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <div className="text-red-900 text-[28px] leading-none drop-shadow-md mt-1">
          {/* <i className="fa-brands fa-instagram"></i> */}
        </div>
        <span 
          className="text-gray-900 text-3xl font-medium tracking-wide"
          style={{ fontFamily: "'Grand Hotel', cursive" }}
        >
          Modify
        </span>
      </Link>

      <div className="flex-1"></div>

      <div className="flex justify-end gap-6 text-[black] text-[22px] px-2">
        {isLoginPage ? (
          <Link to="/register" className="hover:text-red-900 transition flex items-center" title="Sign Up">
            <i className="fa-solid fa-user-plus"></i>
          </Link>
        ) : (
          <Link to="/login" className="hover:text-red-900 transition flex items-center" title="Login">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
