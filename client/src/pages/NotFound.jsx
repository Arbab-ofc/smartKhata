import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 dark:bg-gray-900 dark:text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-purple-600 mb-4 animate-bounce">
          404
        </h1>

        <TypeAnimation
          sequence={[
            "Oops! Page Not Found 😢",
            1500,
            "Seems like you're lost 🧭",
            1500,
            "Let's get you back home 🔙",
            1500,
          ]}
          speed={50}
          repeat={Infinity}
          wrapper="h2"
          className="text-2xl md:text-3xl font-semibold mb-6"
        />

        <p className="text-black-300 dark:text-gray-400 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-all duration-300"
        >
          <FaArrowLeft /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
