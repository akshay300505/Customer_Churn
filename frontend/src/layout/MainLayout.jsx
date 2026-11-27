import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import "./MainLayout.css";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      {/* =====================================================
          MAIN APPLICATION
      ===================================================== */}

      <div className="app-main">

        <Navbar
          onMenuClick={openSidebar}
        />

        <main className="app-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;