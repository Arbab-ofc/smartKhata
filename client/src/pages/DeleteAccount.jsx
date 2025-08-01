import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const DeleteAccount = () => {
  const REACT_APP_API_URL = "";
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error('Current password is required');
    }

    try {
      const res = await fetch('https://smart-khata-api.onrender.com/api/users/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || 'Something went wrong');
      }

      toast.success('Your account has been deleted successfully');

      // ✅ Logout after account deletion
      await fetch('https://smart-khata-api.onrender.com/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // ✅ Redirect to login after short delay
      setTimeout(() => {
        navigate('/login');
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error('Server error while deleting account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Delete Account</h2>

        <form onSubmit={handleDelete} className="space-y-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition hover:shadow-lg"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Confirm Delete
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          This action is <span className="font-semibold text-red-600">permanent</span>. You will be logged out.
        </p>
      </motion.div>
    </div>
  );
};

export default DeleteAccount;
