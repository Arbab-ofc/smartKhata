import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// Dynamic HSL-based color generator
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

const Stats = () => {
  const REACT_APP_API_URL = "";
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://smart-khata-api.onrender.com/api/transactions/stats", {
          withCredentials: true,
        });
        if (res.data.success) {
          setStats(res.data.stats);
        } else {
          setError("We aren't able to fetch data.");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("We aren't able to fetch data.");
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10 text-lg animate-fade-in">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg animate-pulse">
        Loading your statistics...
      </div>
    );
  }

  const { income, expense, balance, categoryBreakdown } = stats;
  const savings = balance;

  const summaryData = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
    { name: "Savings", amount: savings },
  ];

  // Random colors for BarChart bars
  const barColors = summaryData.map(() => getRandomColor());

  const pieData = Object.entries(categoryBreakdown).map(([key, val]) => ({
    name: key,
    value: val,
    fill: getRandomColor(),
  }));

  const isGood = savings >= income * 0.1;

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-red-800 dark:text-red">
        📊 Your Financial Overview
      </h2>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
        {/* Bar Chart */}
        <div className="w-full lg:w-1/2 h-72 transition-all duration-700 transform hover:scale-[1.02]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount">
                {summaryData.map((_, index) => (
                  <Cell key={index} fill={barColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 h-72 transition-all duration-700 transform hover:scale-[1.02]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={85}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Remarks */}
      <div className="mt-10 text-center">
        <div
          className={`inline-block px-6 py-4 rounded-xl shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 ${
            isGood
              ? "bg-green-100 text-green-900 animate-bounce"
              : "bg-red-100 text-red-900 animate-shake"
          }`}
        >
          {isGood ? (
            <p className="text-lg sm:text-xl font-semibold">
              ✅ Great job! You're saving well.
            </p>
          ) : (
            <p className="text-lg sm:text-xl font-semibold">
              ⚠️ Keep an eye on spending!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
