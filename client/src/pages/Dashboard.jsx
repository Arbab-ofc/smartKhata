import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaExchangeAlt,
  FaPlus,
  FaBars,
  FaUserEdit,
  FaInfoCircle,
  FaTrash,
  FaLock,
} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const REACT_APP_API_URL = "";
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const { data } = await axios.get("https://smart-khata-api.onrender.com/api/transactions/recent-transaction" , { withCredentials: true });
        setRecentTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions", error);
        setRecentTransactions([]);
      }
    };

    if (isLoggedIn) fetchRecentTransactions();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-6 sm:px-6 md:px-12 transition-all duration-500">

      {/* Top Nav */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">📊 Dashboard</h1>
        {isLoggedIn && (
          <button
            className="text-purple-600 hover:text-purple-800 transition text-2xl"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        )}
      </div>

      {/* Animated Hamburger Menu */}
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          menuOpen ? "scale-100 opacity-100 max-h-96" : "scale-95 opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {isLoggedIn && (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <button
              onClick={() => navigate("/update-profile")}
              className="flex items-center gap-2 hover:text-purple-600 transition"
            >
              <FaUserEdit /> Update Profile
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="flex items-center gap-2 hover:text-purple-600 transition"
            >
              <FaLock /> Change Password
            </button>
            <button
              onClick={() => navigate("/delete-account")}
              className="flex items-center gap-2 hover:text-red-500 transition"
            >
              <FaTrash /> Delete User
            </button>
            <button
              onClick={() => navigate("/about-us")}
              className="flex items-center gap-2 hover:text-purple-600 transition"
            >
              <FaInfoCircle /> About Us
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-white font-semibold text-lg mb-10">
        <button
          onClick={() => navigate("/add-transaction")}
          className="bg-green-500 hover:bg-green-600 py-4 rounded-lg shadow-lg flex justify-center items-center transition-transform hover:scale-105"
        >
          <FaPlus className="mr-2" /> Add Transaction
        </button>
        <button
          onClick={() => navigate("/all-transaction")}
          className="bg-blue-500 hover:bg-blue-600 py-4 rounded-lg shadow-lg flex justify-center items-center transition-transform hover:scale-105"
        >
          <FaExchangeAlt className="mr-2" /> View Transactions
        </button>
        <button
          onClick={() => navigate("/stats")}
          className="bg-purple-500 hover:bg-purple-600 py-4 rounded-lg shadow-lg flex justify-center items-center transition-transform hover:scale-105"
        >
          <FaChartBar className="mr-2" /> View Stats
        </button>
        <button
          onClick={() => navigate("/delete-all")}
          className="bg-yellow-500 hover:bg-yellow-600 py-4 rounded-lg shadow-lg flex justify-center items-center transition-transform hover:scale-105"
        >
          <FaInfoCircle className="mr-2" /> Delete All Transactions
        </button>
      </div>

      {/* Motivation Block */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-10">
        <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-white p-6 rounded-xl shadow-md flex items-center justify-center h-40 sm:h-48 md:h-56 transition-all duration-500 ease-in-out">
          <div className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-semibold">
            <span className="animate-pulse">💡</span>
            <TypeAnimation
              sequence={[
                "You're managing finances like a pro! 💪",
                3000,
                "Small savings make a big difference 💰",
                3000,
                "Every rupee counts. Keep it up! 📈",
                3000,
                "Discipline is the key to wealth 🧠",
                3000,
                " Track it , save it , win it 🏆 ",
                3000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      {isLoggedIn && (
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">🧾 Recent Transactions</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center font-semibold text-red-500 animate-pulse">
                No recent transactions found
              </div>
            ) : (
              <ul className="space-y-3">
                {recentTransactions.slice(0, 5).map((tx) => (
                  <li
                    key={tx._id}
                    className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span>{tx.category}</span>
                    <span
                      className={`font-bold ${
                        tx.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      ₹{tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
