import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar.css";
import { authContext } from "../contexts/Authcontext";

const Header = () => {
  

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <h2>PsalmStrings</h2>
      </Link>

      <div className="auth-section">
       
            <Link to="/login" className="signin-button">
              Sign In
            </Link>
            <Link to="/signup" className="signup-button">
              Sign Up
            </Link>
      </div>
    </div>
  );
};

export default Header;