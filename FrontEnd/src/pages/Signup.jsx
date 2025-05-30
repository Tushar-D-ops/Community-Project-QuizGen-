import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, seterror] = useState("");
  const backend_url=import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) return seterror("Please enter your name");
    if (!validateEmail(email)) return seterror("Please enter a valid email");
    if (!password) return seterror("Please enter a password");
   //  if (!role || !["student", "faculty"].includes(role))
   //    return seterror("Invalid role selected");

    seterror("");

    try {
      const res = await axios.post(
        backend_url+"/api/auth/signup",
        { username: name, email, password, role },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        seterror(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      seterror(error.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090e1a] text-white flex items-center justify-center overflow-hidden px-4">
      {/* Glowing Blurred Backgrounds */}
      <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-10 rounded-full blur-[180px]" />
      <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] bg-fuchsia-600 opacity-10 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-150px] left-[0px] w-[600px] h-[600px] bg-purple-500 opacity-10 rounded-full blur-[200px]" />

      <motion.div
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-12 shadow-[0_0_60px_#0ff3] border border-white/10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <form onSubmit={handleSignUp}>
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-blue-400 to-white text-transparent bg-clip-text drop-shadow-xl mb-8">
            Create Your Account
          </h2>

          <div className="space-y-5">
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="w-full p-4 rounded-xl bg-[#1a2238] text-white placeholder:text-gray-400 focus:ring-2 ring-cyan-400 outline-none transition-all"
            />

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-xl bg-[#1a2238] text-white placeholder:text-gray-400 focus:ring-2 ring-cyan-400 outline-none transition-all"
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#1a2238] text-white placeholder:text-gray-400 focus:ring-2 ring-cyan-400 outline-none transition-all"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#1a2238] text-white placeholder:text-gray-400 focus:ring-2 ring-cyan-400 outline-none transition-all"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-300 font-semibold underline hover:text-white transition"
            >
              Login Here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
