import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  quizId: String,
  
  score: Number,
  results: [
    {
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean,
    },
  ],
});

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "faculty", "admin"], default: "student" },
  username: String,
  email: String,
  password: String,
  createdOn: { type: Date, default: Date.now },
  marks: [markSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
