import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  
  const isLoginPage = location.pathname === "/login";

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white/20 backdrop-blur-3xl rounded-full px-8 py-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6)] border border-gray-800 z-50">
      
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <div className="text-[#1DB954] text-[28px] leading-none mt-1">
          {/* <i className="fa-brands fa-spotify"></i> */}
        </div>

        <span
          className="text-white text-3xl font-medium tracking-wide"
          style={{ fontFamily: "'Grand Hotel', cursive" }}
        >
          Modify
        </span>
      </Link>

      <div className="flex-1"></div>

      <div className="flex justify-end gap-6 text-white text-[22px] px-2">
        {user ? (
          <button
            onClick={onLogout}
            className="hover:text-[#1DB954] transition flex items-center cursor-pointer"
            title="Logout"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        ) : isLoginPage ? (
          <Link
            to="/register"
            className="hover:text-[#1DB954] transition flex items-center"
            title="Sign Up"
          >
            <i className="fa-solid fa-user-plus"></i>
          </Link>
        ) : (
          <Link
            to="/login"
            className="hover:text-[#1DB954] transition flex items-center"
            title="Login"
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;