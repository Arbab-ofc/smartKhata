import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    category: '',
    note: '',
    paymentMode: '',
    date: '',
  });

  // Fetch existing transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/transactions/all`, {
          withCredentials: true,
        });
        const transaction = res.data.transaction;

        if (transaction) {
          setFormData({
            type: transaction.type || '',
            amount: transaction.amount || '',
            category: transaction.category || '',
            note: transaction.note || '',
            paymentMode: transaction.paymentMode || '',
            date: transaction.date ? transaction.date.split('T')[0] : '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch transaction:', err);
        alert('Unable to fetch transaction data.');
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdated = () => {
    alert('Transaction updated successfully');
    navigate('/all-transaction');
  };

  const onCancel = () => {
    navigate(-1); // back
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/transactions/update/${id}`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        onUpdated();
      } else {
        alert('Failed to update transaction.');
      }
    } catch (err) {
      console.error('Update failed:', err);
      alert('Server error while updating transaction.');
    }
  };

  return (
    <div className="3 inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4 pt-20 pb-20">
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl p-6 w-full max-w-lg animate-fade-in-down transition-all duration-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          ✨ Update Transaction
        </h2>

        <div className="grid gap-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm transition"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
          >
            <option value="">Select Category</option>
            {[
              'salary', 'freelance', 'investment', 'rent', 'food',
              'groceries', 'transport', 'entertainment', 'shopping',
              'utilities', 'education', 'healthcare', 'others',
            ].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <textarea
            name="note"
            placeholder="Note (optional)"
            value={formData.note}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm resize-none"
          />

          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
          >
            <option value="">Select Payment Method</option>
            {['cash', 'upi', 'card', 'bank', 'other'].map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition font-semibold"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;
