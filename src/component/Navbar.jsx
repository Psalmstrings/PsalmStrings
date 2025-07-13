import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar.css";
import { authContext } from "../contexts/Authcontext";

const Navbar = () => {
  const { isAuthenticated, logout: contextLogout } = useContext(authContext);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate(); // Get userId from URL parameters
  const token = localStorage.getItem("token");
  // Update auth state when isAuthenticated changes
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [isAuthenticated]);

  const userId = JSON.parse(localStorage.getItem("user"))|| null;

  

  const handleLogout = async () => {
    try {
      await contextLogout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <h2>PsalmStrings</h2>
      </Link>

      <div className="auth-section">
        {token && ( // Only show if authenticated and userId exists
          <>
            <Link to={`/profile/${userId}`} className="profile-btn">
              Profile
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;