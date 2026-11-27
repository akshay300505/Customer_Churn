import React from "react";

import {
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

import "./Navbar.css";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="app-navbar">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="navbar-left">

        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

      </div>


      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div className="navbar-right">

        {/* Notification */}

        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          <Bell size={17} />

          <span className="notification-dot" />
        </button>


        {/* Profile */}

        <button
          type="button"
          className="navbar-profile"
        >

          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">

            <strong>
              Admin User
            </strong>

            <span>
              Administrator
            </span>

          </div>

          <ChevronDown
            size={14}
            className="profile-chevron"
          />

        </button>

      </div>

    </header>
  );
};

export default Navbar;