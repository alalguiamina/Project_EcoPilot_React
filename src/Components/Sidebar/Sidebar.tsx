import { useNavigate, useLocation } from "react-router-dom";
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
import { User } from "App";

interface SidebarProps {
  user: User;
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

      // SUB-PAGES
      children: [
        {
          id: "canevas",
          label: "Canevas de Saisie",
          icon: penIcon,
          color: "#16a34a",
          path: "/data-entry/canevas",
        },
        {
          id: "validation",
          label: "Validation de Données",
          icon: penIcon,
          color: "#555",
          path: "/data-entry/validation",
        },
      ],
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
  const isActive = (path: string) => location.pathname === path;
  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || user.role === "Admin",
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-nav">
        {filteredMenuItems.map((item) => (
          <div key={item.id}>
            {/* Parent button */}
            <button
              className="sidebar-item"
              onClick={() => {
                if (item.path) navigate(item.path);
                // If it has children, toggle expand/collapse
              }}
            >
              <img src={item.icon} className="sidebar-icon" />
              <span>{item.label}</span>
            </button>

            {/* Sub-items */}
            {item.children && (
              <div className="sidebar-submenu">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => navigate(child.path!)}
                    className={`sidebar-item sub ${
                      isActive(child.path!) ? "active" : ""
                    }`}
                  >
                    <span className="sidebar-label">{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
