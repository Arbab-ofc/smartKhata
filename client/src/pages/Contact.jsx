import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaUser, FaCommentAlt, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/contact/create", formData);
      toast.success(res.data.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error?.response?.data?.message || "Failed to send your message"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Contact <span className="text-purple-600">Us</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 border-gray-300">
            <FaUser className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 border-gray-300">
            <FaEnvelope className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* Subject */}
          <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 border-gray-300">
            <FaCommentAlt className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none text-gray-800 dark:text-white"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300"
          >
            <FaPaperPlane />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
