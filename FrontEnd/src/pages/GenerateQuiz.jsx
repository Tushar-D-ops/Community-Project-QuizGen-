import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { chatSession } from "../utils/GeminiAIModel";
import { useDispatch } from "react-redux";
import { addNewQuiz } from "../redux/user/quizSlice";
import axios from "axios";



const difficulties = ["easy", "medium", "hard"];

const GenerateQuiz = () => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const backend_url=import.meta.env.VITE_BACKEND_URL


  const generateQuiz = async () => {
    setLoading(true);
    
  
    try {
      const inputPrompt = `
      Topic: ${topic}
      Description: ${description}
      Class Level: ${classLevel}
      Difficulty: ${difficulty}
    
      Based on the above information, generate 5 multiple-choice quiz questions.
    
      Each question should be in JSON format with the following keys:
      - question
      - options with 0 indexed as ["A", "B", "C", "D"]
      - correctAnswer
    
      Return the output in the following format:
      [
        {
          "question": "What is ...?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Option B"
        },
        ...
      ]
    `;
    
  
      const result = await chatSession.sendMessage(inputPrompt);
      const mockResponse = await result.response.text();
      const parsedQuestions = JSON.parse(mockResponse);
  
      setQuestions(parsedQuestions);
      setLoading(false);
  
      // 🔥 Save to Redux
      dispatch(addNewQuiz({
        topic,
        classLevel,
        difficulty,
        questions: parsedQuestions,
        createdAt: new Date().toISOString(),
      }));
  
      // 📦 Save to MongoDB via API
      await axios.post(backend_url+"/api/quizzes", {
        topic,
        classLevel,
        difficulty,
        questions: parsedQuestions.map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer, // match DB model
        })),
      });
  
      // ✅ Navigate to quiz page
      navigate("/quiz/student", { state: { questions: parsedQuestions, topic } });
  
      // Reset inputs
      setTopic("");
      setDescription("");
      setClassLevel("");
    } catch (error) {
      console.error("Error generating quiz:", error);
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="fixed inset-0 -z-1">
        <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-20 rounded-full blur-[200px]" />
        <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-sky-500 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-cyan-300 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-180px] right-[0px] w-[500px] h-[500px] bg-teal-400 opacity-20 rounded-full blur-[160px]" />
      </div>

      <Navbar />

      <motion.div
        className="min-h-screen flex flex-col items-center justify-center relative z-10 p-6 bg-opacity-30 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-300">
          Create a Student Quiz 🎓
        </motion.h1>

        <input
          type="text"
          placeholder="Enter Topic (e.g., Algebra)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mb-4 p-3 w-80 border rounded bg-black bg-opacity-40 text-white"
        />

        <textarea
          placeholder="Brief description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 p-3 w-80 h-24 border rounded bg-black bg-opacity-40 text-white resize-none"
        />

        <input
          type="text"
          placeholder="Class Level (e.g., Grade 7)"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          className="mb-4 p-3 w-80 border rounded bg-black bg-opacity-40 text-white"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mb-6 p-3 w-80 border rounded bg-black bg-opacity-40 text-white"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>

        <motion.button
          onClick={generateQuiz}
          disabled={loading}
          className={`px-8 py-3 text-lg font-semibold text-white 
                     bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg shadow-xl 
                     transition-all duration-500 hover:scale-105 
                     ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Generating..." : "Generate Quiz 🚀"}
        </motion.button>
      </motion.div>
    </>
  );
};

export default GenerateQuiz;
