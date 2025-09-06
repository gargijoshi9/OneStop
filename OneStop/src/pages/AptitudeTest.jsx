import React, { useState, useEffect } from "react";
import { Calculator, Brain, Lightbulb, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // added for animation like Home.jsx
import { ChevronUp } from 'lucide-react';

// ====================== QUIZ DATA ======================
const quizzes = [
  {
    id: "aptitude",
    title: "Aptitude Assessment",
    description: "Test your mathematical, verbal, and analytical abilities",
    timeLimit: 30,
    questions: [
      {
        id: "apt1",
        type: "multiple-choice",
        category: "mathematical",
        text: "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
        options: ["70 km/hr", "80 km/hr", "85 km/hr", "90 km/hr"],
        correctAnswer: "80 km/hr",
        weight: 1,
      },
      {
        id: "apt2",
        type: "multiple-choice",
        category: "verbal",
        text: 'Choose the word that is most opposite in meaning to "AMBITIOUS":',
        options: ["Lazy", "Indifferent", "Content", "Unaspiring"],
        correctAnswer: "Unaspiring",
        weight: 1,
      },
      {
        id: "apt3",
        type: "multiple-choice",
        category: "analytical",
        text: "In a sequence 2, 6, 12, 20, 30, what comes next?",
        options: ["40", "42", "44", "46"],
        correctAnswer: "42",
        weight: 1,
      },
      {
        id: "apt4",
        type: "multiple-choice",
        category: "mathematical",
        text: "What is 15% of 240?",
        options: ["32", "36", "38", "40"],
        correctAnswer: "36",
        weight: 1,
      },
      {
        id: "apt5",
        type: "multiple-choice",
        category: "verbal",
        text: "Complete the analogy: Book : Author :: Painting : ?",
        options: ["Canvas", "Artist", "Color", "Gallery"],
        correctAnswer: "Artist",
        weight: 1,
      },
    ],
  },
  {
    id: "logical",
    title: "Logical Reasoning",
    description: "Evaluate your logical thinking and problem-solving skills",
    timeLimit: 30,
    questions: [
      {
        id: "log1",
        type: "multiple-choice",
        category: "deduction",
        text: "All roses are flowers. Some flowers fade quickly. Therefore:",
        options: [
          "All roses fade quickly",
          "Some roses fade quickly",
          "No roses fade quickly",
          "Cannot be determined",
        ],
        correctAnswer: "Cannot be determined",
        weight: 1,
      },
      {
        id: "log2",
        type: "multiple-choice",
        category: "pattern",
        text: "Which figure completes the pattern? △ ○ □ △ ○ ?",
        options: ["△", "○", "□", "◇"],
        correctAnswer: "□",
        weight: 1,
      },
      {
        id: "log3",
        type: "multiple-choice",
        category: "syllogism",
        text: "If all A are B, and all B are C, then:",
        options: [
          "All A are C",
          "Some A are C",
          "No A are C",
          "Cannot determine",
        ],
        correctAnswer: "All A are C",
        weight: 1,
      },
      {
        id: "log4",
        type: "multiple-choice",
        category: "coding",
        text: "In a certain code, FLOWER is written as EKNVDQ. How is GARDEN written?",
        options: ["FZQCDK", "FZQCDM", "FZQEDN", "FZQECM"],
        correctAnswer: "FZQCDM",
        weight: 1,
      },
    ],
  },
  {
    id: "cognitive",
    title: "Cognitive Skills Assessment",
    description: "Measure your memory, attention, and processing speed",
    timeLimit: 30,
    questions: [
      {
        id: "cog1",
        type: "multiple-choice",
        category: "memory",
        text: "Study this sequence for 5 seconds: 7, 3, 9, 1, 5, 8, 2. What was the 4th number?",
        options: ["1", "3", "5", "9"],
        correctAnswer: "1",
        weight: 1,
      },
      {
        id: "cog2",
        type: "multiple-choice",
        category: "attention",
        text: 'Count the number of Es in: "EXCELLENCE IN EVERY ENDEAVOR"',
        options: ["6", "7", "8", "9"],
        correctAnswer: "8",
        weight: 1,
      },
      {
        id: "cog3",
        type: "multiple-choice",
        category: "processing",
        text: "Which word can be formed using the letters of CREATION?",
        options: ["REACTION", "LOCATION", "OPERATION", "EDUCATION"],
        correctAnswer: "REACTION",
        weight: 1,
      },
      {
        id: "cog4",
        type: "multiple-choice",
        category: "spatial",
        text: "If you rotate a square 90° clockwise, then 180°, what is the total rotation?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: "270°",
        weight: 1,
      },
    ],
  },
  {
    id: "personality",
    title: "Personality Assessment",
    description: "Discover your personality traits and working preferences",
    timeLimit: 30,
    questions: [
      {
        id: "per1",
        type: "rating",
        category: "extraversion",
        text: "I enjoy being the center of attention in social gatherings",
        weight: 1,
      },
      {
        id: "per2",
        type: "rating",
        category: "conscientiousness",
        text: "I always complete my tasks on time and follow schedules strictly",
        weight: 1,
      },
      {
        id: "per3",
        type: "rating",
        category: "openness",
        text: "I enjoy trying new experiences and learning about different cultures",
        weight: 1,
      },
      {
        id: "per4",
        type: "rating",
        category: "agreeableness",
        text: "I prefer to avoid conflicts and maintain harmony in groups",
        weight: 1,
      },
      {
        id: "per5",
        type: "rating",
        category: "neuroticism",
        text: "I often feel stressed and worry about things beyond my control",
        weight: 1,
      },
      {
        id: "per6",
        type: "multiple-choice",
        category: "work-style",
        text: "Which work environment appeals to you most?",
        options: [
          "Fast-paced, dynamic startup",
          "Structured corporate environment",
          "Creative, flexible workspace",
          "Independent, remote work",
        ],
      },
    ],
  },
];

const likertLabels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

// ====================== QUIZ COMPONENT ======================
function Quiz({ quiz, onComplete, onBack }) {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    let total = 0;
    quiz.questions.forEach((q) => {
      if (q.type === "multiple-choice") {
        total += q.weight;
        if (answers[q.id] === q.correctAnswer) {
          score += q.weight;
        }
      }
    });
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    onComplete({ quizId: quiz.id, percentage });
  };

  const question = quiz.questions[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto bg-black border border-gray-700 p-8 rounded-2xl shadow-2xl shadow-purple-500/20"
    >
      {/* Quiz Header */}
      <h2 className="text-3xl font-extrabold text-purple-300 mb-2">{quiz.title}</h2>
      <p className="text-gray-400 mb-6">{quiz.description}</p>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-300">
          Question {currentIndex + 1} of {quiz.questions.length}
        </span>
        <div className="w-1/2 bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div key={question.id} className="mb-6">
        <p className="mb-4 text-lg font-medium text-gray-200">{question.text}</p>

        {/* Multiple Choice */}
        {question.type === "multiple-choice" && (
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <label
                key={i}
                className={`block p-4 rounded-xl border cursor-pointer transition-all 
                  ${
                    answers[question.id] === opt
                      ? "bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/40"
                      : "bg-gray-900 hover:bg-gray-800 border-gray-700"
                  }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={answers[question.id] === opt}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="hidden"
                />
                <span className="text-gray-200">{opt}</span>
              </label>
            ))}
          </div>
        )}

        {/* Rating Scale */}
        {question.type === "rating" && (
          <div className="flex justify-between mt-4">
            {likertLabels.map((label, index) => (
              <label
                key={index}
                className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition 
                  ${
                    answers[question.id] === String(index + 1)
                      ? "bg-purple-900/40 border border-purple-500 shadow"
                      : "hover:bg-gray-800 border border-gray-700"
                  }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={index + 1}
                  checked={answers[question.id] === String(index + 1)}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="hidden"
                />
                <span className="text-xs text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all"
          onClick={onBack}
        >
          Back
        </button>
        {currentIndex > 0 && (
          <button
            className="px-5 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-all"
            onClick={handlePrev}
          >
            Previous
          </button>
        )}
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            className={`px-5 py-2 rounded-lg transition-all ${
              answers[question.id]
                ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            onClick={handleNext}
            disabled={!answers[question.id]}
          >
            Next
          </button>
        ) : (
          <button
            className={`px-5 py-2 rounded-lg transition-all ${
              answers[question.id]
                ? "bg-gradient-to-r from-green-500 to-cyan-600 text-white hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!answers[question.id]}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ====================== APP COMPONENT ======================
function App() {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [showButton, setShowButton] = useState(false); // <-- back to top state

  const totalQuizzes = quizzes.length;
  const completedQuizzes = results.length;
  const progressPercent = (completedQuizzes / totalQuizzes) * 100;

  // Back to top logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowButton(true);
      else setShowButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartQuiz = (quizId) => {
    const selectedQuiz = quizzes.find((q) => q.id === quizId);
    setCurrentQuiz(selectedQuiz);
  };

  const handleCompleteQuiz = (result) => {
    setResults((prev) => {
      const withoutCurrent = prev.filter((r) => r.quizId !== result.quizId);
      return [...withoutCurrent, result];
    });
    setCurrentQuiz(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 py-10 px-6 text-white">
      {currentQuiz ? (
        <Quiz
          quiz={currentQuiz}
          onComplete={handleCompleteQuiz}
          onBack={() => setCurrentQuiz(null)}
        />
      ) : (
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h1 className="text-5xl font-extrabold text-purple-300 drop-shadow mb-4">
            Career Guidance Assessment
          </h1>
          <p className="text-lg text-gray-400 mb-10">
            Choose a section below to start your quiz.
          </p>

          {/* Progress Bar */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="flex justify-between mb-2 text-gray-300 font-semibold">
              <span>Quiz Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-gray-800 h-4 rounded-full shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quiz Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quizzes.map((quiz) => {
              const completed = results.find((r) => r.quizId === quiz.id);
              // Card colors and icons
              const cardColors = {
                aptitude: "from-blue-600 to-indigo-600",
                logical: "from-purple-600 to-pink-600",
                cognitive: "from-green-600 to-emerald-600",
                personality: "from-orange-500 to-yellow-500",
              };
              const cardIcons = {
                aptitude: <Calculator className="w-8 h-8 text-white" />,
                logical: <Brain className="w-8 h-8 text-white" />,
                cognitive: <Lightbulb className="w-8 h-8 text-white" />,
                personality: <Users className="w-8 h-8 text-white" />,
              };

              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="rounded-xl shadow-lg overflow-hidden bg-black border border-gray-700 flex flex-col hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className={`p-6 flex justify-center items-center bg-gradient-to-r ${cardColors[quiz.id]}`}>
                    {cardIcons[quiz.id]}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-purple-300 mb-1">{quiz.title}</h3>
                    <p className="text-gray-400 mb-4">{quiz.description}</p>
                    {completed && (
                      <span className="inline-block bg-green-200/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full self-start mb-4">
                        ✅ Completed
                      </span>
                    )}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center space-x-1 text-gray-400 text-sm">
                        ⏱ <span>{quiz.timeLimit} minutes</span>
                      </div>
                      <button
                        onClick={() => handleStartQuiz(quiz.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          completed
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:scale-105"
                        }`}
                      >
                        {completed ? "Retake" : "Start Quiz"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-black border border-green-400/50 rounded-xl p-6 text-left shadow-lg shadow-green-500/20"
            >
              <h2 className="text-2xl font-bold text-green-400 mb-4">Completed Results</h2>
              <ul className="space-y-2">
                {results.map((r, i) => (
                  <li key={i} className="text-green-300 font-medium">
                    ✅ {r.quizId}
                  </li>
                ))}
              </ul>
              {progressPercent === 100 && (
                <Link
                  to="/Result"
                  state={{ result: { quizzes: results } }}
                  className="inline-block mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-cyan-600 text-white rounded-lg hover:scale-105 transition"
                >
                  View Results
                </Link>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Back to Top Button (appears everywhere) */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50 rounded-full shadow-lg p-[0.4rem]
           bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600
           text-white hover:shadow-purple-500/40 hover:scale-110
           transition-all duration-300 flex items-center justify-center"
          >
            <ChevronUp size={40} strokeWidth={2} color="white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;