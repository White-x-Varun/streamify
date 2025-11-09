import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { BellIcon, HomeIcon, LogOutIcon, SearchIcon, UserIcon, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { ShipWheelIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import ThemeSelector from "./ThemeSelector.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatpage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
    },
  });
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center px-4 sm:px-6 lg:px-8">
      <div className="flex items-center w-full">
        {/* Left (home icon always visible) */}
        <Link to="/" className="btn btn-ghost" title="Home">
          <HomeIcon className="h-6 w-6" />
        </Link>

        {/* Left (only shows on chat page) */}
        {isChatpage && (
          <Link to="/" className="flex items-center gap-2.5 ml-4">
            <ShipWheelIcon className="size-9 text-primary " />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </Link>
        )}

        {/* Right (always aligned to end) */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <Link to="/search">
            <button
              className="btn btn-ghost"
              title="Search Users"
            >
              <SearchIcon className="h-6 w-6" />
            </button>
          </Link>

          <Link to="/notifications">
            <button
              className="btn btn-ghost"
              title="Notifications"
            >
              <BellIcon className="h-6 w-6" />
            </button>
          </Link>

          <ThemeSelector />

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full">
                <img src={authUser?.Profilepic} alt="Profile" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="/edit-profile" className="justify-between">
                  <span>Edit Profile</span>
                  <UserIcon className="h-4 w-4" />
                </Link>
              </li>
              {authUser?.role === "admin" && (
                <li>
                  <Link to="/admin" className="justify-between">
                    <span>Admin Panel</span>
                    <Shield className="h-4 w-4" />
                  </Link>
                </li>
              )}
              <li>
                <a onClick={logoutMutation}>
                  <span>Logout</span>
                  <LogOutIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
