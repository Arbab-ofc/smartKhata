import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const countryOptions = [
  { code: "+1", label: "USA 🇺🇸" },
  { code: "+91", label: "India 🇮🇳" },
  { code: "+44", label: "UK 🇬🇧" },
  { code: "+81", label: "Japan 🇯🇵" },
  { code: "+61", label: "Australia 🇦🇺" },
  { code: "+49", label: "Germany 🇩🇪" },
  { code: "+33", label: "France 🇫🇷" },
  { code: "+39", label: "Italy 🇮🇹" },
  { code: "+86", label: "China 🇨🇳" },
  { code: "+971", label: "UAE 🇦🇪" },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,
        password: formData.password,
      };

      const res = await axios.post("http://localhost:3000/api/users/register", payload, {
        withCredentials: true,
      });

      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-all">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-lg p-8 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          <span className="text-blue-600">Create</span> an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
              required
            />
          </div>

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

          {/* Phone */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2">
            <FaPhoneAlt className="text-gray-500" />
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              className="bg-transparent text-gray-700 dark:text-white outline-none"
              required
            >
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 py-2">
            <FaLock className="text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Register
          </motion.button>

          {/* Navigate to Login */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
