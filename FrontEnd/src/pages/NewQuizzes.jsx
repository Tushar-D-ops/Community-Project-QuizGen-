import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const NewQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backend_url}/api/quizzes`)
      .then((res) => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quizzes.");
        setLoading(false);
      });
  }, []);

  const handleQuizClick = (quiz) => {
    navigate(`/quiz/${quiz._id}`, {
      state: { questions: quiz?.questions, topic: quiz?.topic },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-4xl font-bold mb-10 text-center text-blue-400"
          >
            🧠 Recently Added Quizzes
          </motion.h1>

          {loading && <p className="text-center text-gray-400">Loading quizzes...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {quizzes.length === 0 && !loading ? (
            <p className="text-center text-gray-400">No quizzes available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 * index }}
                  key={quiz._id}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer"
                  onClick={() => handleQuizClick(quiz)}
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
                    {quiz.questions.length > 2 && (
                      <p className="italic text-sm text-blue-300">...more questions</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewQuizzes;