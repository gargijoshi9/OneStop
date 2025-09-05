import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Result() {
  const location = useLocation();
  const { result } = location.state || {};
  const quizzes = result?.quizzes || [];

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex flex-col items-center justify-center text-center px-6">
        <p className="text-gray-400 text-lg mb-4">
          No results available. Please take the test first.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-medium hover:scale-105 transition-transform"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 py-12 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Recommended Stream */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-black border border-purple-500/40 rounded-2xl mb-8 shadow-lg shadow-purple-500/20"
        >
          <h3 className="text-xl font-bold text-purple-300 mb-2">
            Recommended Stream
          </h3>
          <p className="text-3xl font-extrabold text-cyan-300">
            {result.stream}
          </p>
        </motion.div>

        {/* Quiz Scores */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-purple-300 mb-4">
            Your Quiz Scores
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {quizzes.map((q) => (
              <motion.div
                key={q.quizId}
                whileHover={{ scale: 1.05 }}
                className="bg-black border border-gray-700 rounded-xl p-6 text-center shadow-md hover:border-purple-400 hover:shadow-purple-500/30 transition-all"
              >
                <div className="font-medium text-gray-300">{q.quizId}</div>
                <div className="mt-2 text-2xl font-bold text-indigo-400">
                  {q.percentage}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Suggested Courses & Careers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 bg-black border border-gray-700 rounded-xl shadow-md hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all"
          >
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">
              Suggested Courses
            </h3>
            <ul className="space-y-2">
              {result.courses?.map((course, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 bg-black border border-gray-700 rounded-xl shadow-md hover:border-pink-400/50 hover:shadow-pink-500/20 transition-all"
          >
            <h3 className="text-lg font-semibold text-pink-300 mb-4">
              Potential Careers
            </h3>
            <ul className="space-y-2">
              {result.careers?.map((career, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-pink-400 mr-2">•</span>
                  <span>{career}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Retake */}
        <div className="text-center pt-6">
          <Link
            to="/aptitude-test"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Retake Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
