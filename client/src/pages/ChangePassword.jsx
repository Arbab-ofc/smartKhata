import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const REACT_APP_API_URL = "";
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    // Frontend validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (newPassword === oldPassword) {
      return toast.error('New password must be different from old password');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match');
    }

    try {
      const res = await fetch('https://smart-khata-api.onrender.com/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong');
      } else {
        toast.success('Password changed successfully');
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md md:max-w-3xl lg:max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Panel for Tablet */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-500 text-white p-6 w-full md:w-1/2">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-2"
          >
            Change Your Password
          </motion.h2>
          <p className="text-sm text-blue-100 text-center">Keep your account secure by updating your password regularly.</p>
        </div>

        {/* Form Section */}
        <div className="w-full p-6 sm:p-8 md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-700 text-center">Update Password</h3>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition hover:shadow-md"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition hover:shadow-md"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition hover:shadow-md"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              Change Password
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
