import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    category: '',
    note: '',
    paymentMode: '',
    date: '',
  });

  // Payment Modes & Categories
  const paymentModes = ['cash', 'upi', 'card', 'bank', 'other'];
  const categories = [
    'salary',
    'freelance',
    'investment',
    'rent',
    'food',
    'groceries',
    'transport',
    'entertainment',
    'shopping',
    'utilities',
    'education',
    'healthcare',
    'others',
  ];

  // Auth check inside component
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users/me', {
          withCredentials: true,
        });

        if (res.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate('/login');
        }
      } catch (err) {
        setIsLoggedIn(false);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate, setIsLoggedIn]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:3000/api/transactions/add',
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        alert('Transaction added!');
        setFormData({
          type: '',
          amount: '',
          category: '',
          note: '',
          paymentMode: '',
          date: '',
        });
      }
      navigate('/dashboard'); // Redirect to dashboard after adding
    } catch (err) {
      console.error(err);
      alert('Error adding transaction.');
    }
  };

  if (loading) return <div className="text-center mt-10">Checking login...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">➕ Add Transaction</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select name="type" value={formData.type} onChange={handleChange} required className="p-2 border rounded">
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
          required
          className="p-2 border rounded"
        />

        <select name="category" value={formData.category} onChange={handleChange} required className="p-2 border rounded">
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          name="note"
          placeholder="Note (optional)"
          value={formData.note}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <select
          name="paymentMode"
          value={formData.paymentMode}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Payment Mode</option>
          {paymentModes.map((mode, idx) => (
            <option key={idx} value={mode}>{mode}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
