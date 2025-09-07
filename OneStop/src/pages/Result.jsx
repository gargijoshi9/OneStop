import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

// ====== Course Data (Inline JSON) ======
const coursesData = [
  {
    id: 1,
    stream: "Science",
    name: "Bachelor of Science (B.Sc.)",
    duration: "3 Years",
    description:
      "A foundational undergraduate program focusing on scientific and technical subjects across physics, chemistry, mathematics, biology, and computer science.",
    careers: [
      "Research Scientist",
      "Lab Technician",
      "Professor",
      "Data Analyst",
    ],
    higherStudies: ["M.Sc.", "Ph.D.", "MBA"],
    governmentExams: ["UPSC", "SSC", "Bank PO", "State PSC"],
  },
  {
    id: 2,
    stream: "Commerce",
    name: "Bachelor of Commerce (B.Com.)",
    duration: "3 Years",
    description:
      "A program offering knowledge in accounting, finance, taxation, and economics, preparing students for careers in corporate and financial sectors.",
    careers: [
      "Accountant",
      "Financial Analyst",
      "Auditor",
      "Investment Banker",
    ],
    higherStudies: ["M.Com.", "CA", "MBA"],
    governmentExams: ["UPSC", "SSC CGL", "Bank Exams"],
  },
  {
    id: 3,
    stream: "Arts",
    name: "Bachelor of Arts (B.A.)",
    duration: "3 Years",
    description:
      "An undergraduate program in humanities and social sciences with subjects like literature, history, sociology, psychology, and political science.",
    careers: ["Teacher", "Civil Services", "Journalist", "Content Writer"],
    higherStudies: ["M.A.", "M.Phil.", "Ph.D.", "MBA"],
    governmentExams: ["UPSC", "State PSC", "SSC"],
  },
];

// ====== Recommendation Logic ======
const getRecommendations = (results) => {
  let aptitude = results.find((r) => r.quizId === "aptitude")?.percentage || 0;
  let logical = results.find((r) => r.quizId === "logical")?.percentage || 0;
  let cognitive =
    results.find((r) => r.quizId === "cognitive")?.percentage || 0;
  let personality =
    results.find((r) => r.quizId === "personality")?.percentage || 0;

  const best = Math.max(aptitude, logical, cognitive, personality);

  if (aptitude === best) return { field: "Engineering", stream: "Science" };
  if (logical === best)
    return { field: "Commerce / Management", stream: "Commerce" };
  if (cognitive === best)
    return { field: "Science & Research", stream: "Science" };
  if (personality === best)
    return { field: "Arts & Social Sciences", stream: "Arts" };

  return { field: "General Studies", stream: "Arts" };
};

export default function Result() {
  const location = useLocation();
  const results = location.state?.result?.quizzes || [];
  const recommendation = getRecommendations(results);

  const [expanded, setExpanded] = useState(null);

  const suggestedCourses = coursesData.filter(
    (course) => course.stream === recommendation.stream
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-purple-900 py-10 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-black border border-gray-700 p-8 rounded-2xl shadow-2xl shadow-green-500/20"
      >
        <h1 className="text-4xl font-extrabold text-green-400 mb-8 text-center">
          Your Career Guidance Results
        </h1>

        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-600 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            Recommended Career Path
          </h2>
          <p className="text-gray-300 mb-8 text-lg text-center">
            Based on your responses, we recommend exploring{" "}
            <span className="text-green-400 font-semibold">
              {recommendation.field}
            </span>
            .
          </p>

          {/* Suggested Courses */}
          <div>
            <h3 className="text-xl font-semibold text-purple-300 mb-6 text-center">
              Suggested Courses
            </h3>
            {suggestedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {suggestedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-black border border-gray-700 rounded-xl p-6 shadow-lg hover:border-cyan-400 hover:shadow-cyan-500/40 transition-all"
                  >
                    <h4 className="text-lg font-bold text-cyan-300 mb-2">
                      {course.name}
                    </h4>
                    <p className="text-gray-400 mb-3">
                      ⏳ Duration: {course.duration}
                    </p>
                    <p className="text-gray-300 mb-3">{course.description}</p>

                    {expanded === course.id ? (
                      <div className="space-y-2 text-sm text-gray-300">
                        <div>
                          <h5 className="font-semibold text-pink-300">
                            Careers:
                          </h5>
                          <ul className="list-disc ml-4">
                            {course.careers.map((career, i) => (
                              <li key={i}>{career}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-pink-300">
                            Higher Studies:
                          </h5>
                          <p>{course.higherStudies.join(", ")}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-pink-300">
                            Government Exams:
                          </h5>
                          <p>{course.governmentExams.join(", ")}</p>
                        </div>
                        <button
                          className="mt-2 px-3 py-1 border border-cyan-500 rounded text-cyan-400 hover:bg-cyan-900/30"
                          onClick={() => setExpanded(null)}
                        >
                          Show Less
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-cyan-400 mt-2 hover:underline"
                        onClick={() => setExpanded(course.id)}
                      >
                        Read More →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mt-2 text-center">
                No matching courses found.
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/course-explorer"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white text-lg rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            🎓 Discover Colleges
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
