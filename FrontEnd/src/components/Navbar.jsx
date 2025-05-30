import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Importing icons for menu toggle
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signoutFailure,signoutStart,signInSuccess } from '../redux/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const backend_url=import.meta.env.VITE_BACKEND_URL


  const onLogout= async()=>{


    try {
      dispatch(signoutStart())
  
      const res = await axios.get(backend_url+"/api/auth/signout", {
        withCredentials: true,
      })
  
      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message))
        toast.error(res.data.message)
        return
      }
  
      toast.success(res.data.message)
      dispatch(signInSuccess())
      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      dispatch(signoutFailure(error.message))
    }
  }
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      className="bg-gradient-to-r from-blue-900 via-blue-600 to-sky-400 text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-lg relative"
    >
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold tracking-wide">
        QuizGen
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8">
        {["Home", currentUser?.rest?.role=="faculty"?"Teacher Dashboard":"", "Generate Quiz", "Past Quizzes","New","LogOut"].map((item, index) => {
          return item!=""?   <motion.div
          key={item}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 * index }}
        >
         {
            item === "LogOut" ? (
              <button
                onClick={onLogout}
                className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100 group"
              >
                {item}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <Link
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100 group"
          >
            {item}
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
            )
         }
        </motion.div>:null
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3,ease: "easeInOut" }}
            className="absolute top-20 right-0 w-[40%] rounded-2xl bg-gradient-to-r from-blue-900 via-blue-600 to-sky-400 text-white flex flex-col items-center py-4 space-y-4 md:hidden"
          >
           {["Home", currentUser.rest.role=="faculty"?"Teacher Dashboard":"", "Generate Quiz", "Past Quizzes","New"].map((item, index) => {
          return item!=""?   <motion.div
          key={item}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.1 * index }}
        >
          <Link
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            className="relative text-lg font-medium transition-all duration-300 hover:text-sky-100 group"
          >
            {item}
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>:null
        })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;


