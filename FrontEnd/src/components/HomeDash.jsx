import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DashBoardImg from "../assets/DashBoardimg.png";
import { Link } from "react-router-dom";

export default function FeaturedDashboard() {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
    
    className="py-16 px-6 md:px-20 my-10 bg-gradient-to-br  rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-10">
        {/* Text Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5,delay: 0.5 }}
          className="md:w-1/2 w-full pl-6"
        >
          <h2 className="text-6xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to Your<br/> <span className="bg-gradient-to-r from-blue-700 via-sky-400 to-white 
             bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,200,255,0.9)]">Smart Dashboard</span>
          </h2>
          <p className=" mb-6 text-lg">
            Track student progress, analyze test results, and stay ahead with real-time performance metrics. Designed for teachers who care about results.
          </p>
          
          <motion.div
                        className="flex max-sm:flex-col max-sm:gap-2 space-x-4 px-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}>
          <Link
                to="/teacher-dashboard"
                className="relative flex items-center gap-2 px-5 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg shadow-xl overflow-hidden transition-all duration-500 
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-600 before:to-cyan-400 before:w-full before:h-full 
                before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left"
              >
                <span className="relative flex items-center gap-1 z-10">Explore Now <ArrowRight className="h-5 w-5" /></span>
              </Link>
          {/* <button className="flex items-center gap-2 px-5 py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-all text-sm md:text-base shadow-lg">
            Explore Now <ArrowRight className="h-5 w-5" />
          </button> */}
          </motion.div>
        </motion.div>

        {/* Image Section with Glow */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative md:w-1/2 w-full flex justify-center"
        >
          {/* Glowing Background */}
          {/* <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-teal-300 opacity-5 blur-3xl rounded-full z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
          
          {/* Main Image */}
          <img
            src={DashBoardImg}
            alt="Dashboard Preview"
            className="w-full max-w-md rounded-xl shadow-xl z-10 relative"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

