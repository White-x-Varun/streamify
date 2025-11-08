import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
