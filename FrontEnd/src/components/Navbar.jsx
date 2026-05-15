import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = [
    "Home",
    user?.role === "faculty" ? "Teacher Dashboard" : "",
    "Generate Quiz",
    "New",
  ].filter(Boolean);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      className="bg-gradient-to-r from-blue-900 via-blue-600 to-sky-400 text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-lg relative"
    >
      <Link to="/" className="text-3xl font-bold tracking-wide">
        QuizGen
      </Link>

      <div className="hidden md:flex space-x-8">
        {navLinks.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 * index }}
          >
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100 group"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 * navLinks.length }}
        >
          <button
            onClick={onLogout}
            className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100 group"
          >
            LogOut
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </motion.div>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 right-0 w-[40%] rounded-2xl bg-gradient-to-r from-blue-900 via-blue-600 to-sky-400 text-white flex flex-col items-center py-4 space-y-4 md:hidden"
          >
            {navLinks.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.1 * index }}
              >
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100 group"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <button
              onClick={() => { onLogout(); setIsOpen(false); }}
              className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100"
            >
              LogOut
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;