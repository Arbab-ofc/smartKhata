import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/transactions/all", {
          withCredentials: true,
        });
        setTransactions(res.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isLoggedIn]);

  const handleDelete = (id) => {
    // Placeholder - no logic added
     navigate(`/delete/${id}`);
  };

  const handleUpdate = (id) => {
    // ✅ navigate to update page with transaction ID
    navigate(`/update/${id}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center text-xl mt-10 font-semibold text-red-600">
        Please log in to view transactions.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-xl mt-10 font-semibold text-purple-600 animate-pulse">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 md:px-12 py-6 text-gray-800 dark:text-white transition-all">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        📜 All Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-lg font-semibold animate-pulse text-red-500">
          No transactions found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto">
          {transactions.map((txn, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 border-l-8 shadow-xl transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800 ${
                txn.type === "income"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-sm px-2 py-1 rounded-full font-semibold ${
                    txn.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {txn.type.toUpperCase()}
                </span>
                <span className="text-lg font-bold">
                  ₹{txn.amount}
                </span>
              </div>

              <p className="text-sm mb-1">
                <strong>Category:</strong> {txn.category}
              </p>
              <p className="text-sm mb-1">
                <strong>Payment:</strong> {txn.paymentMode}
              </p>

              <hr className="my-2 border-gray-300 dark:border-gray-600" />

              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                <p>📅 Created: {new Date(txn.createdAt).toLocaleString()}</p>
                <p>🔁 Updated: {new Date(txn.updatedAt).toLocaleString()}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-3 mt-4">
                <button
                  onClick={() => handleUpdate(txn._id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-1.5 rounded-lg transition"
                >
                  📝 Update
                </button>
                <button
                  onClick={() => handleDelete(txn._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 rounded-lg transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
