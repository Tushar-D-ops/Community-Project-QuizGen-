import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="py-25 px-15 mt-20">
        <div className="flex flex-col justify-center items-center">
      <motion.h2 className="text-4xl font-bold text-center text-white mb-10"
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 1, ease: "easeOut" }}
     >How It <span className="bg-gradient-to-r from-blue-700 via-sky-400 to-white 
             bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,200,255,0.9)]">Works?</span></motion.h2>
      <motion.p 
              className="text-lg  max-w-3xl mb-10 text-white px-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Creating quizzes has never been easier! Simply enter a topic and prompt, and let our AI generate engaging questions instantly 
            </motion.p>
            </div>
      
      <div className="flex flex-wrap justify-center gap-20">
        
        <motion.div 
          className="w-72 p-6 bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg text-center border border-cyan-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-white">Step 1</h3>
          <p className="text-gray-300 text-xl">Enter your topic and desired quiz prompt.</p>
        </motion.div>

        <motion.div 
          className="w-72 p-6 bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg text-center border border-cyan-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-white">Step 2</h3>
          <p className="text-gray-300 text-xl">AI generates unique quiz questions in seconds.</p>
        </motion.div>

        <motion.div 
          className="w-72 p-6 bg-opacity-30 backdrop-blur-md rounded-3xl shadow-lg text-center border border-cyan-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h3 className="text-2xl font-semibold text-white">Step 3</h3>
          <p className="text-gray-300 text-xl">Take the quiz, review your answers, and improve your knowledge.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default HowItWorks;
