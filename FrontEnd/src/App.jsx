import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GenerateQuiz from "./pages/GenerateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import ResultsPage from "./pages/ResultsPage";
import PastQuizzes from "./pages/PastQuizzes";
import TeacherDashboard from "./pages/TeacherDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NewQuizzes from "./pages/NewQuizzes";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-quiz" element={<GenerateQuiz />} />
        <Route path="/quiz/:quizId" element={<TakeQuiz />} />
        <Route path="/result/:userId/:quizId" element={<ResultsPage />} />

        <Route path="/past-quizzes" element={<PastQuizzes />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Signup" element={<Signup />} />
        
<Route path="/new" element={<NewQuizzes />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;


