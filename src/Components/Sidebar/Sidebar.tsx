import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import dashboardIcon from "../../Assets/dashboard.png";
import penIcon from "../../Assets/pen.png";
import leafIcon from "../../Assets/leaf.png";
import chartIcon from "../../Assets/chart.png";
import targetIcon from "../../Assets/target.png";
import reportIcon from "../../Assets/report.png";
import settingsIcon from "../../Assets/settings.png";
import organisationIcon from "../../Assets/organisation.png";
import logo from "../../Assets/logo.png";
import type { User as BackendUser } from "../../types/user";

// minimal, tolerant user shape used by Sidebar so pages can pass their app User
interface SidebarUser {
  role?: string;
  username?: string;
  first_name?: string;
  id?: number;
  sites?: number[];
}

interface SidebarProps {
  user?: SidebarUser | null;
}

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  color: string;
  path?: string; // now optional
  children?: MenuItem[]; // add sub-items
  adminOnly?: boolean;
};
const Sidebar = ({ user }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: dashboardIcon,
      color: "#3b82f6",
      path: "/dashboard",
    },
    // Parent "Saisie de données"
    {
      id: "data-entry",
      label: "Saisie de données",
      icon: penIcon,
      color: "#16a34a",
      path: "/data-entry",
    },
    {
      id: "carbon",
      label: "Bilan Carbone",
      icon: leafIcon,
      color: "#059669",
      path: "/carbon",
    },
    {
      id: "esg",
      label: "Indicateurs ESG",
      icon: chartIcon,
      color: "#f97316",
      path: "/esg",
    },
    {
      id: "alignment",
      label: "Alignement RSE",
      icon: targetIcon,
      color: "#8b5cf6",
      path: "/alignment",
    },
    {
      id: "reports",
      label: "Rapports RSE",
      icon: reportIcon,
      color: "#b45309",
      path: "/reports",
    },
    {
      id: "organisation",
      label: "Organisation",
      icon: organisationIcon,
      color: "#125a8eff",
      path: "/organisation",
      adminOnly: true,
    },

    {
      id: "settings",
      label: "Paramètres",
      icon: settingsIcon,
      color: "#64748b",
      path: "/settings",
    },
  ];

  // Détermine la page active selon l'URL
  const isActive = (path?: string) =>
    path ? location.pathname === path : false;

  // normalize role for checks (tolerant to different shapes / capitalizations)
  const userRole = (user?.role || "").toString().toLowerCase();

  // Filter menu items based on user role (tolerant to missing user)
  const filteredMenuItems = menuItems.filter(
    (item) =>
      !item.adminOnly ||
      userRole === "admin" ||
      userRole === "super_user" || // treat super_user as admin-level
      userRole === "super user",
  );

  const isAdmin = user?.role === "admin" || user?.role === "super_user";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-nav">
        {filteredMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.path && navigate(item.path)}
            className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            style={
              isActive(item.path)
                ? {
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }
                : {}
            }
          >
            <img
              src={item.icon}
              alt={item.label}
              className="sidebar-icon"
              style={{
                width: "24px",
                height: "24px",
                objectFit: "contain",
                marginRight: "8px",
              }}
            />
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
