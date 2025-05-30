import User from "../models/user.model.js";

// Get all students with their marks
export const getAllStudentsWithMarks = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error fetching student" });
  }
};

// Add a mark to a student
export const addMarkToStudent = async (req, res) => {
    try {
        const { quizId, score,totalMarks,results} = req.body;
        const studentId = req.params.studentId;
        console.log("Student ID:", studentId);
        
    let scorePercentage = parseInt((score / totalMarks) * 100);
        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ error: "Student not found" });
    
        student.marks.push({ quizId,score:scorePercentage,results });
        await student.save();
    
        res.status(200).json({ message: "Marks added successfully" });
      } catch (err) {
        console.error("❌ Error saving marks:", err);
        res.status(500).json({ error: "Failed to add marks" });
      }
};

// Update a specific mark (by index)
export const updateStudentMark = async (req, res) => {
  const { studentId, markIndex } = req.params;
  const { subject, test, score } = req.body;

  try {
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (!student.marks[markIndex]) {
      return res.status(404).json({ error: "Mark not found" });
    }

    student.marks[markIndex] = { subject, test, score };
    await student.save();

    res.json({ message: "Mark updated", student });
  } catch (err) {
    res.status(500).json({ error: "Failed to update mark" });
  }
};

// Delete a specific mark
export const deleteStudentMark = async (req, res) => {
  const { studentId, markIndex } = req.params;

  try {
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.marks.splice(markIndex, 1);
    await student.save();

    res.json({ message: "Mark deleted", student });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete mark" });
  }
};
