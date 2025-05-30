import express from "express"
import { signin, signout, signup } from "../Controller/user.controller.js"
import { authenticateToken } from "../utilities.js"
import User from "../models/user.model.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signout)
router.get("/students", async (req, res) => {
    const students = await User.find({ role: "student" });
    res.json(students);
  });
  
router.post("/student/:id/add", async (req, res) => {
    try {
      const { quizId, score,totalMarks } = req.body;
      const studentId = req.params.id;
  let scorePercentage = parseInt((score / totalMarks) * 100);
      const student = await User.findById(studentId);
      if (!student) return res.status(404).json({ error: "Student not found" });
  
      student.marks.push({ quizId,score:scorePercentage });
      await student.save();
  
      res.status(200).json({ message: "Marks added successfully" });
    } catch (err) {
      console.error("❌ Error saving marks:", err);
      res.status(500).json({ error: "Failed to add marks" });
    }
  });
  router.put("/tests", async (req, res) => {
    const { marks } = req.body;
  
    await Promise.all(
      Object.entries(marks).map(async ([studentId, mark]) => {
        const student = await User.findById(studentId);
        student.marks.push(parseInt(mark));
        await student.save();
      })
    );
  
    res.json({ message: "Marks updated" });
  });
  router.get("/tests/averages", async (req, res) => {
  const students = await User.find({ role: "student" });

  const numTests = Math.max(...students.map((s) => s.marks.length));
  const testAverages = [];

  for (let i = 0; i < numTests; i++) {
    let sum = 0;
    let count = 0;
    students.forEach((s) => {
      if (s.marks[i] !== undefined) {
        sum += s.marks[i];
        count++;
      }
    });
    testAverages.push({
      test: `Test ${i + 1}`,
      average: count ? Math.round(sum / count) : 0,
    });
  }

  res.json(testAverages);
});


export default router