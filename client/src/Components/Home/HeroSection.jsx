// src/components/HeroSection/HeroSection.jsx

import { motion } from "framer-motion";
import React from "react";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Animation variants for each child
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center mb-4"
          variants={childVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          <FaCarSide className="text-6xl animate-bounce" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-4"
          variants={childVariants}
        >
          Drive Your Dreams
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-2xl mb-8 max-w-2xl mx-auto"
          variants={childVariants}
        >
          Experience the freedom of the open road with our premium car rental
          services.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={childVariants}
        >
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300"
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/availablecars">View Cars</Link>
          </motion.button>
          <motion.button
            className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#ffffff",
              color: "#000000",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
