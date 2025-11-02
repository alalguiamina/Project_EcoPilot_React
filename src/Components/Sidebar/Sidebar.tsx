import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import dashboardIcon from "../Assests/dashboardIcon.png";
import penIcon from "../Assests/pen.png";
import leafIcon from "../Assests/leaf.png";
import chartIcon from "../Assests/chart.png";
import targetIcon from "../Assests/target.png";
import reportIcon from "../Assests/report.png";
import settingsIcon from "../Assests/settings.png";
import organisationIcon from "../Assests/organisation.png";
import logo from "../Assests/logo.png";

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  color: string;
  path: string;
};

const Sidebar = () => {
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

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
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
