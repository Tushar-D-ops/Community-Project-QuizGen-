// controllers/quiz.controller.js
import { Quiz } from "../models/quiz.model.js";

// POST /api/quizzes
export const addQuiz = async (req, res) => {
  try {
    console.log(req.body);
    
    const { topic, difficulty, classLevel, questions } = req.body;
    const newQuiz = new Quiz({ topic, difficulty, classLevel, questions });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
};

// GET /api/quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
  
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};
