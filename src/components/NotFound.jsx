import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // For navigation

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 min-h-screen">
      <Helmet>
        <title>Page Not Found | Codeket</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <div className="flex flex-col items-center justify-center text-error p-6 min-w-full ">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-9xl font-bold mb-4 text-primary"
        >
          404
        </motion.div>

        {/* Page Not Found Message */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base-content/70 text-lg mb-8 text-center max-w-md"
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </motion.p>

        {/* Back to Home Button */}
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={() => navigate("/")} // Navigate to homepage
          className="px-8 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-accent transition-all flex items-center"
        >
          <span>Go Back Home</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default NotFoundPage;
