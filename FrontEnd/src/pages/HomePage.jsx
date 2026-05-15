import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CTA from "../components/CTA.jsx";
import FeaturesSection from "../components/FeaturesSetion.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import roboImg from "../assets/robo.png";
import HomeDash from "../components/HomeDash.jsx";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed inset-0 -z-1">
          <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-20 rounded-full blur-[200px]" />
          <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-sky-500 opacity-20 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[180px]" />
          <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-cyan-300 opacity-20 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-180px] right-[0px] w-[500px] h-[500px] bg-teal-400 opacity-20 rounded-full blur-[160px]" />
        </div>

        <Navbar />

        <div className="flex flex-wrap items-center justify-around w-full px-4">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-10 z-10">
            <motion.h1
              className="text-6xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-sky-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,200,255,0.9)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            >
              Welcome to QuizGen
            </motion.h1>

            <motion.p
              className="text-lg text-white/80 mb-6 max-w-xl drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
            >
              Create quizzes instantly using AI. Challenge yourself, test your knowledge, and have fun!
            </motion.p>

            <motion.div
              className="flex max-sm:flex-col max-sm:gap-2 space-x-4 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
            >
              <Link
                to="/generate-quiz"
                className="relative flex items-center gap-2 px-5 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg shadow-xl overflow-hidden transition-all duration-500 
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-600 before:to-cyan-400 before:w-full before:h-full 
                before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left"
              >
                <span className="relative flex items-center gap-1 z-10">Explore Now</span>
              </Link>

              <Link
                to="/past-quizzes"
                className="relative px-4 py-2 text-lg font-semibold text-white border-2 border-cyan-400 rounded-lg shadow-xl 
                transition-all duration-500 before:absolute before:inset-0 
                before:bg-blue-500 before:w-full before:h-full 
                before:scale-x-0 before:origin-left before:transition-transform 
                before:duration-500 hover:before:scale-x-100 
                hover:before:origin-right hover:text-white"
              >
                <span className="relative z-10">View Past Quizzes</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-1/2 h-[40vw] flex items-center justify-center relative max-md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
          >
            <div className="absolute w-100 h-100 md:w-96 md:h-96 bg-teal-300 opacity-10 blur-3xl rounded-full z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <img
              src={roboImg}
              alt="AI Robot"
              className="w-full h-full object-contain bg-transparent z-10 relative"
            />
          </motion.div>
        </div>

        <HomeDash />
        <FeaturesSection />
        <HowItWorks />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;