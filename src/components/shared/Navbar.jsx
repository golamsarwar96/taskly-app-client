import { IoMdAddCircle } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logoTaskly.png";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 text-white text-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "bg-accentColor px-4 py-2 md:rounded-3xl text-white flex items-center justify-center gap-1"
            : "text-white flex items-center justify-center gap-1"
        }
      >
        <IoHome className="font-bold text-base" />
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-accentColor px-4 py-2 md:rounded-3xl text-white flex items-center justify-center gap-1"
            : "text-white flex items-center justify-center gap-1"
        }
        to="/add-task"
      >
        <IoMdAddCircle className="text-lg" />
        Add Tasks
      </NavLink>
    </div>
  );
  return (
    <div>
      <div className="navbar bg-primaryColor px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="text-accentColor lg:hidden mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primaryColor rounded-box z-1 mt-3 w-36 p-5 mt-4"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            <img className="w-8 h-8" src={logo} alt="" />
            <h1>
              Task<span className="text-accentColor">ly</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {user && user?.email ? (
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-white">{user?.email}</h1>
              <button
                className="px-4 py-2 rounded-full text-white bg-accentColor"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-white bg-accentColor"
              >
                Login
              </Link>
              <h1>{user?.email}</h1>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full text-white bg-accentColor"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
