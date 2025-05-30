import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CTA = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
    className="border-cyan-500 border-2 mb-3 mt-20 flex flex-col md:flex-row items-center justify-between rounded-2xl text-white py-16 px-6 md:px-12 mx-4 md:mx-10">
      {/* Left Section */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Try Our{" "}
          <span className="bg-gradient-to-r from-blue-700 via-sky-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,200,255,0.9)]">
            QuizGen Now!
          </span>
        </h1>
        <p className="text-base md:text-lg mt-4 max-w-lg">
          Generate quizzes on the go and improve yourself regularly!
        </p>
      </div>

      {/* Right Section - Button */}
      <div className="mt-8 md:mt-0">
        <Link
          to="/generate-quiz"
          className="w-full relative px-10 md:px-8 py-3 text-xl md:text-2xl font-semibold text-white 
                    bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg shadow-xl 
                    transition-all duration-500 
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-blue-600 before:to-cyan-400 before:w-full before:h-full 
                    before:scale-x-0 before:origin-right before:transition-transform 
                    before:duration-500 hover:before:scale-x-100 hover:before:origin-left"
        >
          <span className="relative z-10">Generate Quiz</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CTA;
