import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const backend_url=import.meta.env.VITE_BACKEND_URL
  
  useEffect(() => {
    async function get() {
      const response = await axios.get(
        backend_url+"/api/marks/students"
      );

      setStudents(
        response?.data?.map((user, index) => ({
          id: index + 1,
          name: user.username,
          marks: user.marks.map((m) => m.score),
        }))
      );
    }
    get();
  }, []);
  console.log(students);

  const [newStudent, setNewStudent] = useState("");
  const [modalStudent, setModalStudent] = useState(null);
  const [testCount, setTestCount] = useState(0);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testMarks, setTestMarks] = useState({});

  const addStudent = () => {
    if (newStudent.trim() === "") return;
    const id = Date.now();
    setStudents([...students, { id, name: newStudent, marks: [] }]);
    setNewStudent("");
  };

  const handleOpenTestModal = () => {
    setShowTestModal(true);
    const initialMarks = {};
    students.forEach((student) => (initialMarks[student.id] = ""));
    setTestMarks(initialMarks);
  };

  const handleAddTest = () => {
    const updatedStudents = students.map((student) => {
      const mark = parseInt(testMarks[student.id]);
      return {
        ...student,
        marks: [...student.marks, isNaN(mark) ? 0 : mark],
      };
    });
    setStudents(updatedStudents);
    setTestCount(testCount + 1);
    setShowTestModal(false);
  };

  const getAverage = (marks) => {
    if (!marks.length) return 0;
    return Math.round(
      marks.reduce((sum, mark) => sum + mark, 0) / marks.length
    );
  };

  const chartData = students.map((student) => ({
    name: student.name,
    average: getAverage(student.marks),
  }));

  const getTestWiseAverage = () => {
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

    return testAverages;
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed inset-0 -z-1 pointer-events-none">
          {/* Blobs */}
          <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-20 rounded-full blur-[200px] pointer-events-none" />
          <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-sky-500 opacity-20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-cyan-300 opacity-20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[-180px] right-[0px] w-[500px] h-[500px] bg-teal-400 opacity-20 rounded-full blur-[160px] pointer-events-none" />
        </div>
        <Navbar />
        <div className="p-6 bg-gray-950 text-white min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            className="text-3xl font-bold mb-6 "
          >
            <span
              className="bg-gradient-to-r from-blue-700 via-sky-400 to-white 
             bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,200,255,0.9)]"
            >
              Teacher's DashBoard
            </span>
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }}
            className="bg-gray-900 p-4 rounded-lg mb-6"
          >
            <h2 className="text-xl mb-4">Class Average Per Test</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getTestWiseAverage()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="test" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-900 p-4 rounded-lg mb-6"
          >
            <h2 className="text-xl mb-4">Student Average Scores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="average" fill="#06b6d4" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {students.map((student) => {
              const avg = getAverage(student.marks);
              const needsFocus = avg < 60;

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                  key={student.id}
                  className={`p-4 rounded-lg border ${
                    needsFocus ? "border-red-500" : "border-cyan-600"
                  } bg-gray-900`}
                >
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <p>
                    <span className="text-gray-400">Avg Score:</span>{" "}
                    <span
                      className={needsFocus ? "text-red-400" : "text-green-400"}
                    >
                      {avg}%
                    </span>
                  </p>
                  <button
                    onClick={() => setModalStudent(student)}
                    className="mt-2 bg-green-500 px-3 py-1 rounded hover:bg-green-700"
                  >
                    View Performance
                  </button>
                  {needsFocus && (
                    <p className="mt-2 text-red-400 font-bold">
                      Needs More Focus 🔍
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {modalStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-cyan-800 text-white  p-6 rounded-lg max-w-md w-full relative"
              >
                <button
                  onClick={() => setModalStudent(null)}
                  className="absolute top-2 right-2 text-white text-lg"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">
                  {modalStudent.name}'s Test Performance
                </h2>
                <ul className="list-disc pl-5">
                  {modalStudent.marks.map((mark, idx) => (
                    <li className="mt-2 bg-cyan-900 rounded-xl p-2" key={idx}>
                      Test {idx + 1}: {mark} marks
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}

          {showTestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-cyan-800 text-white p-6 rounded-lg w-full max-w-xl relative"
              >
                <button
                  onClick={() => setShowTestModal(false)}
                  className="absolute top-2 right-2 text-gray-700 text-lg hover:text-red-600"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">
                  Enter Marks for New Test
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center gap-4">
                      <label className="w-40">{student.name}:</label>
                      <input
                        type="number"
                        className="px-3 py-1 rounded border border-gray-300 w-full"
                        value={testMarks[student.id] || ""}
                        onChange={(e) =>
                          setTestMarks({
                            ...testMarks,
                            [student.id]: e.target.value,
                          })
                        }
                        placeholder="Enter mark"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddTest}
                  className="mt-4 bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white"
                >
                  Save Test
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
