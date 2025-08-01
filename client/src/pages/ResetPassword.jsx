import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/reset-password", formData, {
        withCredentials: true,
      });

      alert(res.data.message);
      // Optionally redirect to login
    } catch (err) {
      alert(
        err.response?.data?.message || "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 dark:bg-gray-900 bg-white">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          <span className="text-purple-600">Reset </span>
          <span className="text-white">Password</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
            <FaEnvelope className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* New Password */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
            <FaLock className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="password"
              name="newPassword"
              required
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
            <FaLock className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
