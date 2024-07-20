import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      <header className="site-header">
        <div className="site-identity">
          <h1 className="site-title">
            <a href="/" className="site-link">
              Books Management
            </a>
          </h1>
        </div>
        <nav className="site-navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
