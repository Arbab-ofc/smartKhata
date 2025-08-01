import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 to-purple-300 dark:from-gray-900 dark:to-gray-800 transition-all">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-lg p-8 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          <span className="text-purple-600">Login</span> to SmartKhata
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Password with Toggle */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2 relative">
            <FaLock className="text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white pr-8"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 text-gray-500 hover:text-purple-600"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span
              onClick={() => navigate("/forget-password")}
              className="text-sm text-purple-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
          >
            Login
          </motion.button>

          {/* Navigate to Register */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
