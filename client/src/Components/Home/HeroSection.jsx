// src/components/HeroSection/HeroSection.jsx

import { motion } from "framer-motion";
import React from "react";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-[50vh] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>

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
        >
          <FaCarSide className="text-5xl text-tealLight" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold mb-4"
          variants={childVariants}
        >
          Explore the World Your Way
        </motion.h1>

        <motion.p
          className="text-base sm:text-xl mb-6 max-w-lg mx-auto text-gray-200"
          variants={childVariants}
        >
          Discover a curated selection of vehicles that perfectly match your
          adventure, whether for business or leisure.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={childVariants}
        >
          <motion.button
            className="bg-tealLight hover:bg-tealDark text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300"
            whileHover={{ scale: 1.05, backgroundColor: "#2f7585" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/availablecars">Explore Cars</Link>
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
            Contact Us
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
