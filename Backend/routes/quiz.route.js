// routes/quiz.routes.js
import express from "express";
import { addQuiz, getAllQuizzes } from "../Controller/quiz.controller.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/quizzes", addQuiz);     
router.get("/quizzes", getAllQuizzes); 
router.get("/results/:userId/:quizId", async (req, res) => {
    const { userId, quizId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const mark = user.marks.find((m) => m.quizId === quizId);
      if (!mark) return res.status(404).json({ error: "Quiz result not found" });
  
      res.json(mark); // Return result data, like score
    } catch (err) {
      console.error("❌ Error fetching result:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
export default router;
