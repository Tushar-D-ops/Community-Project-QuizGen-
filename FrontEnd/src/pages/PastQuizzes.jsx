import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SplineBackground from "../components/SplineBackground";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const PastQuizzes = () => {
  const [quizzes, setQuizzes] = useState([ ]);
  const backend_url=import.meta.env.VITE_BACKEND_URL
const navigate = useNavigate();
  const {currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    axios.get(backend_url+"/api/quizzes").then((res) => setQuizzes(res.data));
  }, []);
  console.log(quizzes);
  
  const handleQuizClick = (quiz, id) => {
    
    
    // navigate(`/quiz/${id}`, {
    //   state: { questions: quiz?.questions, topic: quiz?.topic },
    // });
    navigate(`/result/${currentUser.rest._id}/${quiz._id}`);
  };
  return (
    <>
    <div className="fixed inset-0 -z-1">
    {/* Blobs */}
    <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-20 rounded-full blur-[200px]" />
    <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-sky-500 opacity-20 rounded-full blur-[140px]" />
    <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[180px]" />
    <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-cyan-300 opacity-20 rounded-full blur-[140px]" />
    <div className="absolute bottom-[-180px] right-[0px] w-[500px] h-[500px] bg-teal-400 opacity-20 rounded-full blur-[160px]" />
  </div>
    
      {/* Background Animation */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        {/* <SplineBackground /> */}
      </div>

      <Navbar />

      {/* Main Container */}
      <motion.div 
        className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0a0f1a] to-[#000000]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          📚 Past Quizzes
        </h1>

       
        <div className="w-full max-w-2xl space-y-6">
          {quizzes.map((quiz, index) => (
            <motion.div 
              key={quiz.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            >
              <div
                // to={`/quiz/${quiz._id}`}
                onClick={() => handleQuizClick(quiz,quiz._id)}
                className="block p-6 bg-white/10 bg-opacity-20 backdrop-blur-lg rounded-2xl border border-cyan-500 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-2xl font-semibold text-white bg-transparent tracking-wide">
                {(quiz.topic !== "" ? quiz.topic : quiz.topic)?.toUpperCase()}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default PastQuizzes;
