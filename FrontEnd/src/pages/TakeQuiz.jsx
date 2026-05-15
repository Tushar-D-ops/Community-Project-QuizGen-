import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
};

const TakeQuiz = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const printRef = useRef();
  const { user } = useAuth();

  const questions = location.state?.questions || [];
  const topic = location.state?.topic || "";

  useEffect(() => {
    if (questions?.length > 0) {
      setQuiz(questions);
    }
  }, [quizId]);

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== quiz.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let calculatedScore = 0;
    const resultDetails = [];

    quiz.forEach((q, index) => {
      const isCorrect = answers[index] === q.correctAnswer;
      if (isCorrect) calculatedScore++;
      resultDetails.push({
        question: q.question,
        selectedAnswer: answers[index],
        correctAnswer: q.correctAnswer,
        isCorrect,
      });
    });

    setScore(calculatedScore);
    setResults(resultDetails);
    setSubmitted(true);

    try {
      if (!user?._id) {
        alert("User not logged in.");
        return;
      }

      await axios.post(
        `${backend_url}/api/marks/student/${user._id}/add`,
        {
          quizId,
          studentId: user._id,
          studentName: user.username,
          score: calculatedScore,
          totalMarks: quiz.length,
          results: resultDetails,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.error("Failed to save marks", err);
      alert("Failed to submit marks. Please try again.");
    }
  };

  const handlePrint = () => {
    const content = printRef.current;
    const pri = window.open("", "_blank", "width=800,height=600");
    pri.document.open();
    pri.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.close();
  };

  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-4 py-10 flex items-center justify-center">
        {quiz ? (
          <div ref={printRef} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-white/10">
            <h1 className="text-4xl font-extrabold text-center text-blue-400 tracking-wide mb-4">
              {topic?.toUpperCase()}
            </h1>
            <p className="text-center text-gray-400 mb-8 text-lg">Answer the questions carefully.</p>

            {!submitted ? (
              <>
                <div className="space-y-8">
                  {quiz.map((q, index) => (
                    <div key={index} className="bg-white/10 border border-white/10 p-6 rounded-2xl shadow-md">
                      <p className="text-xl font-semibold text-white mb-4">
                        {index + 1}. <MathJax dynamic inline>{q.question}</MathJax>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map((opt, i) => (
                          <label
                            key={i}
                            className={`flex items-center bg-gray-700/50 hover:bg-gray-600 p-3 rounded-xl cursor-pointer transition duration-200 text-white ${
                              answers[index] === opt ? "ring-2 ring-blue-400" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={opt}
                              className="mr-3"
                              checked={answers[index] === opt}
                              onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                            />
                            <p className="ml-2">{opt}</p>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-10 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-lg py-3 rounded-xl shadow-md transition"
                >
                  Submit Quiz
                </button>
              </>
            ) : (
              <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-green-400 mb-6">
                  Your Score: {score} / {quiz.length}
                </h2>
                <div className="space-y-6">
                  {results.map((res, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-2xl shadow-md ${
                        res.isCorrect
                          ? "bg-green-600/30 border border-green-500"
                          : "bg-red-600/30 border border-red-500"
                      }`}
                    >
                      <p className="text-white font-semibold text-lg">
                        {index + 1}. <MathJax dynamic inline>{res.question}</MathJax>
                      </p>
                      <p className="mt-2 text-gray-200">
                        Your Answer: <span className="font-bold">{res.selectedAnswer}</span>
                      </p>
                      {!res.isCorrect && (
                        <p className="text-gray-300">
                          Correct Answer: <span className="font-bold">{res.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={handlePrint}
              className="mt-10 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold text-lg py-3 rounded-xl shadow-md transition"
            >
              🖨️ Print Result
            </button>
          </div>
        ) : (
          <p className="text-xl font-semibold text-gray-300">Loading quiz...</p>
        )}
      </div>
    </MathJaxContext>
  );
};

export default TakeQuiz;