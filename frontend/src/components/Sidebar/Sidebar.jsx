import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  ChartNoAxesCombined,
  Upload,
  Settings,
  X,
  Activity,
} from "lucide-react";

import "./Sidebar.css";

const mainNavigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    label: "Churn Prediction",
    path: "/churn-prediction",
    icon: BrainCircuit,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: ChartNoAxesCombined,
  },
];

const managementNavigation = [
  {
    label: "Data Upload",
    path: "/data-upload",
    icon: Upload,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`app-sidebar ${
        isOpen ? "sidebar-open" : ""
      }`}
    >

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="sidebar-brand">

        <div className="brand-logo">
          <span>C</span>
          <span>C</span>
        </div>

        <div className="brand-text">
          <h1>ChurnGuidance</h1>
          <p>Customer Intelligence</p>
        </div>

        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={19} />
        </button>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="sidebar-navigation">

        {/* MAIN */}

        <div className="sidebar-section">

          <div className="sidebar-section-title">
            Main
          </div>

          <nav className="sidebar-nav">

            {mainNavigation.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-nav-item ${
                      isActive
                        ? "sidebar-nav-active"
                        : ""
                    }`
                  }
                >

                  <Icon size={15} strokeWidth={1.8} />

                  <span>{item.label}</span>

                </NavLink>
              );
            })}

          </nav>

        </div>


        {/* MANAGEMENT */}

        <div className="sidebar-section">

          <div className="sidebar-section-title">
            Management
          </div>

          <nav className="sidebar-nav">

            {managementNavigation.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-nav-item ${
                      isActive
                        ? "sidebar-nav-active"
                        : ""
                    }`
                  }
                >

                  <Icon size={15} strokeWidth={1.8} />

                  <span>{item.label}</span>

                </NavLink>
              );
            })}

          </nav>

        </div>

      </div>


      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <div className="sidebar-bottom">

        <div className="system-status">

          <div className="system-status-indicator" />

          <div>
            <strong>System Online</strong>
            <span>All services operational</span>
          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;