import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const REACT_APP_API_URL = "";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("https://smart-khata-api.onrender.com/api/users/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <header className="bg-white z-55 shadow-md px-4 py-3 flex items-center justify-between w-full">
      {/* Left: Type Animated Brand */}
      <div className="text-blue-600 font-bold text-xl sm:text-2xl">
        <TypeAnimation
          sequence={[
            "SmartKhata",
            1500,
            "Personal Expense Tracker",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>

      {/* Right: Navigation */}
      <nav className="flex gap-4 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
          {isMobile ? <FaHome size={20} /> : "Home"}
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
          {isMobile ? <FaEnvelope size={20} /> : "Contact Us"}
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
              {isMobile ? <FaUser size={20} /> : "Dashboard"}
            </Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition">
              {isMobile ? <FaSignOutAlt size={20} /> : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
              {isMobile ? <FaSignInAlt size={20} /> : "Login"}
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">
              {isMobile ? <FaUserPlus size={20} /> : "Register"}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;