import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { validateEmail } from "../utils/helper";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      const data = await login(email, password);
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090e1a] text-white flex items-center justify-center overflow-hidden px-4">
      <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-10 rounded-full blur-[180px]" />
      <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] bg-fuchsia-600 opacity-10 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-150px] left-[0px] w-[600px] h-[600px] bg-purple-500 opacity-10 rounded-full blur-[200px]" />

      <motion.div
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-12 shadow-[0_0_60px_#0ff3] border border-white/10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <form onSubmit={handleLogin}>
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-blue-400 to-white text-transparent bg-clip-text drop-shadow-xl mb-8">
            Sign In to QuizGen
          </h2>

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#1a2238] text-white placeholder:text-gray-400 focus:ring-2 ring-cyan-400 outline-none transition-all"
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#1a2238] text-white placeholder:text-gray-400 focus:ring-2 ring-cyan-400 outline-none transition-all"
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Login
            </button>
          </div>

          <p className="text-sm text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-300 font-semibold underline hover:text-white transition">
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;