import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    currentPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      return toast.error('Password is required');
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message.includes('Incorrect')) return toast.error('Wrong password');
        if (data.message.includes('required')) return toast.error('Password is required');
        if (data.message.includes('not found')) return toast.error('User not found');
        if (data.message.includes('verify')) return toast.error(data.message);
        return toast.error(data.message || 'Something went wrong');
      }

      toast.success('Your profile has been updated');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error('Server error. Try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <ToastContainer />
      <motion.form
        onSubmit={handleUpdate}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Update Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition"
          />
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password *"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-md transition"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Save Changes
        </motion.button>
      </motion.form>
    </div>
  );
};

export default UpdateProfile;
