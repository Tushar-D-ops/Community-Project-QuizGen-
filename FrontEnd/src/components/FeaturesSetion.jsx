import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaClock, FaUsers } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <div className="py-25 px-15 bg-opacity-20 mt-20 max-md:mt-1">
        <div className="flex flex-col justify-center items-center">
        <motion.h2 className="text-4xl font-bold text-white mb-10"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 1, ease: "easeOut" }}
       >
        Why Choose <span className="bg-gradient-to-r from-blue-700 via-sky-400 to-white 
             bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,200,255,0.9)]">QuizGen?</span>
      </motion.h2>
      <motion.p 
        className="text-xl  max-w-3xl mb-10 text-white px-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        QuizGen uses cutting-edge AI to generate quizzes on any topic instantly! 
        Whether you're a student, teacher, or just curious, QuizGen makes learning fun and interactive.  
      </motion.p>
        </div>
      
      <div className="flex flex-wrap justify-center gap-20">
        
        <motion.div 
          className="w-80 p-6 bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg text-center border border-cyan-500 "
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaBrain className="text-4xl text-cyan-400 mb-3 mx-auto" />
          <h3 className="text-2xl font-semibold text-white">AI-Powered Quizzes</h3>
          <p className="text-gray-300">Generate quizzes instantly using advanced AI technology.</p>
        </motion.div>

        <motion.div 
          className="w-80 p-6 bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg text-center border border-cyan-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FaClock className="text-4xl text-cyan-400 mb-3 mx-auto" />
          <h3 className="text-2xl font-semibold text-white">Time Management</h3>
          <p className="text-gray-300">Customize quiz duration to match your learning pace.</p>
        </motion.div>

        <motion.div 
          className="w-80 p-6 bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg text-center border border-cyan-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <FaUsers className="text-4xl text-cyan-400 mb-3 mx-auto" />
          <h3 className="text-2xl font-semibold text-white">Multiplayer Mode</h3>
          <p className="text-gray-300">Challenge friends and compete on leaderboards.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default FeaturesSection;
