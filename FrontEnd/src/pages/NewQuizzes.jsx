import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../redux/user/quizSlice";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const NewQuizzes = () => {
  const dispatch = useDispatch();
  const { newAdded, loading, error } = useSelector((state) => state.quiz);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleQuizClick = (quiz, id) => {
    
    
    navigate(`/quiz/${id}`, {
      state: { questions: quiz?.questions, topic: quiz?.topic },
    });
  };

  return (
  <div>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6">

<div className="max-w-5xl mx-auto">
  <motion.h1
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut",delay:0.3 }}
  
  
  className="text-4xl font-bold mb-10 text-center text-blue-400">
    🧠 Recently Added Quizzes
  </motion.h1>

  {loading && <p className="text-center text-gray-400">Loading quizzes...</p>}
  {error && <p className="text-center text-red-500">Failed to load quizzes.</p>}
  {newAdded.length === 0 && !loading ? (
    <p className="text-center text-gray-400">No quizzes available yet.</p>
  ) : (
    <motion.div
  //   initial={{ opacity: 0, y: 50 }}
  // animate={{ opacity: 1, y: 0 }}
  // transition={{ duration: 1, ease: "easeOut",delay:0.3 }}
    
    
    
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {newAdded.map((quiz, index) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1,delay:0.1*index }}
          
          key={index}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer"
          onClick={() => handleQuizClick(quiz,quiz._id)}
        >
          <h2 className="text-xl font-semibold text-white">{quiz.topic.toUpperCase()}</h2>
          <p className="text-sm text-gray-300 mb-4 mt-1">
            📚 Class: {quiz.classLevel} | 🎯 Difficulty: {quiz.difficulty} <br />
            🕒 {new Date(quiz.createdAt).toLocaleString()}
          </p>
          <div className="space-y-2 text-gray-200">
            {quiz.questions.slice(0, 2).map((q, i) => (
              <p key={i} className="text-sm">
                <strong>Q{i + 1}:</strong> {q.question}
              </p>
            ))}
            {quiz.questions.length > 2 && <p className="italic text-sm text-blue-300">...more questions</p>}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )}
</div>
</div>
  </div>
  );
};

export default NewQuizzes;
