import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";

const ResultsPage = () => {
  const { userId, quizId } = useParams();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const resultRef = useRef();
  const printRef = useRef();
  const backend_url=import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(backend_url+`/api/results/${userId}/${quizId}`, {
          withCredentials: true,
        });
        setResultData(res.data);
      } catch (err) {
        console.error("❌ Failed to load result", err);
        setResultData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [userId, quizId]);

  const handleDownloadPDF = async () => {
    const element = resultRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("quiz_result.pdf");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white text-xl">
        Loading result...
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-black text-red-300 text-xl">
        Result not found or an error occurred.
      </div>
    );
  }
  const handlePrint = () => {
    const content = resultRef.current;
    const pri = window.open("", "_blank", "width=800,height=600");
  
    pri.document.open();
    pri.document.write(`
      <html>
        <head>
          <title>Print</title>
          <!-- ✅ Load Tailwind via CDN -->
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
           
        </head>
        <body class="bg-white p-6">
          ${content.innerHTML}
        </body>
      </html>
    `);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.close();
  };
  
  
  return (
  <div ref={printRef}>
      <MathJaxContext>
        <Navbar/>
      <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-inter">
        

        {/* 📄 Result PDF Section */}
        <div ref={resultRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Quiz Results
          </h1>

          <div className="mt-4 mb-10 flex justify-center">
            <div className="relative p-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl shadow-xl animate-pulse">
              Score: {resultData.score} / 100
            </div>
          </div>
        </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {resultData.results.map((res, index) => (
              <div
                key={index}
                className={`p-6 rounded-3xl shadow-lg border-l-8 ${
                  res.isCorrect
                    ? "bg-gradient-to-r from-green-800 via-green-700 to-green-900 border-green-500"
                    : "bg-gradient-to-r from-red-800 via-red-700 to-red-900 border-red-500"
                }`}
              >
                <p className="text-xl font-semibold mb-2">
                  {index + 1}. <MathJax dynamic inline>{res.question}</MathJax>
                </p>
                <p className="text-gray-200">
                  Your Answer: <span className="font-bold">{res.selectedAnswer}</span>
                </p>
                {!res.isCorrect && (
                  <p className="text-gray-400 mt-1">
                    Correct Answer: <span className="font-bold">{res.correctAnswer}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
        <button onClick={handlePrint} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
  🖨️ Print Result
</button>

          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            🏠 Go to Home
          </button>
        </div>
      </div>
    </MathJaxContext>
  </div>
  );
};

export default ResultsPage;
