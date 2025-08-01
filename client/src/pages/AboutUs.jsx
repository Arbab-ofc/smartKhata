import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function AboutUs() {
  const REACT_APP_API_URL = "";
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: "#00000000" },
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.3 },
      size: { value: 3 },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#292943] to-[#1e1e2f] text-white px-4 py-10 flex items-center justify-center">
      {/* 🎇 Particles Background */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />

      {/* 🎁 Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-extrabold text-yellow-300 drop-shadow mb-6">
          About <span className="text-white">SmartKhata</span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-center text-white/90 mb-8">
          SmartKhata is a modern, full-stack MERN-based expense management application that helps users track and manage their income and expenses. Designed with performance and aesthetics in mind, it offers complete mobile, tablet, and large-screen responsive support with smooth animations, alerts, and secure APIs.
        </p>

        {/* ✨ Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-[1.02] transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">🔐 Auth & Security</h3>
            <ul className="text-sm text-white/80 list-disc list-inside">
              <li>JWT Auth with cookies</li>
              <li>Password encryption using bcrypt</li>
              <li>Email verification using OTP</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-[1.02] transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">📊 Expense Management</h3>
            <ul className="text-sm text-white/80 list-disc list-inside">
              <li>Add, edit, delete transactions</li>
              <li>Clear all expenses</li>
              <li>Dashboard with insights</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-[1.02] transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">⚙️ Profile Controls</h3>
            <ul className="text-sm text-white/80 list-disc list-inside">
              <li>Update profile details</li>
              <li>Change password with validation</li>
              <li>Delete account with password confirmation</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-[1.02] transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-yellow-200">📧 Email Service</h3>
            <ul className="text-sm text-white/80 list-disc list-inside">
              <li>Currently uses Gmail (via Nodemailer)</li>
              <li>Other services (Yahoo, Apple, Zoho) integrated</li>
              <li>Only Gmail is active by default</li>
            </ul>
          </div>
        </motion.div>

        {/* 💌 Contact Section */}
        <div className="text-center mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Connect with Developer</h2>
          <p className="text-white/70 mb-4">Created by <strong>Arbab</strong></p>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="https://github.com/Arbab-ofc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:smartkhataofc@gmail.com"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
