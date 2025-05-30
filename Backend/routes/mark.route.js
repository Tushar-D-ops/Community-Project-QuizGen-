import express from "express";
import {
  getAllStudentsWithMarks,
  getStudentById,
  addMarkToStudent,
  updateStudentMark,
  deleteStudentMark,
} from "../Controller/mark.controller.js";

const router = express.Router();

router.get("/students", getAllStudentsWithMarks);
router.get("/student/:studentId", getStudentById);
router.post("/student/:studentId/add", addMarkToStudent);
router.put("/student/:studentId/mark/:markIndex", updateStudentMark);
router.delete("/student/:studentId/mark/:markIndex", deleteStudentMark);

export default router;
