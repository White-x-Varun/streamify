import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useLocation } from "react-router-dom";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen stricky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.0">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold text-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Streamify
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content backdrop-opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content backdrop-opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`btn btn-ghost w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content backdrop-opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>
      {/**User Profile Section */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img
                src={authUser?.Profilepic || "/default-profile.png"}
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block"></span>
            </p>{" "}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
