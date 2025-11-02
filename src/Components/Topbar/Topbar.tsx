import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Topbar.css";
type TopbarProps = {
  title: string;
  userName: string;
  onLogout: () => void;
};
const Topbar = ({ title, userName, onLogout }: TopbarProps) => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };
  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-actions">
        <div className="user-badge">
          <span className="user-avatar">👤</span>
          <span className="user-name">{userName}</span>
        </div>
        <button className="btn-logout" onClick={handleLogoutClick}>
          Déconnexion
        </button>
      </div>
    </header>
  );
};
export default Topbar;
