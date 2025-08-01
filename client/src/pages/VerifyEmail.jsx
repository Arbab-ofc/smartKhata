import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const VerifyEmail = () => {
  const REACT_APP_API_URL = "";
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://smart-khata-api.onrender.com/api/users/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ensures cookies are included
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        alert(data.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 transition-all">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-lg p-8 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          <span className="text-green-600">Verify</span> Your Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              value={email}
              disabled
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
            />
          </div>

          {/* OTP */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2">
            <FaCheckCircle className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Verify
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
