import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ClearAllTransactions = () => {
  const navigate = useNavigate();

  const onDeletedAll = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all transactions?");
    if (!confirmed) return;

    try {
      const res = await fetch('http://localhost:3000/api/transactions/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // <- important for cookie-based auth
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message || 'All transactions deleted successfully!');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Something went wrong while deleting.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">⚠️ Danger Zone</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          This action will delete <strong>all</strong> your transactions permanently.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDeletedAll}
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          Delete All Transactions
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ClearAllTransactions;
