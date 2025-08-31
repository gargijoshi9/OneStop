import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await new Promise((r) => setTimeout(r, 600)); // simulate delay

        const mockQuestions = [
          {
            id: 1,
            question: "Which activity do you enjoy the most?",
            options: [
              "Solving mathematical problems",
              "Writing stories or essays",
              "Working with tools and machinery",
              "Understanding human behavior",
              "Managing teams or organizing events",
            ],
            category: "interests",
          },
          {
            id: 2,
            question:
              "When working on a group project, what role do you naturally take?",
            options: [
              "The creative idea generator",
              "The detailed planner and organizer",
              "The data analyst and researcher",
              "The communicator and presenter",
              "The technical problem solver",
            ],
            category: "personality",
          },
          {
            id: 3,
            question: "Which subject did you find most engaging in school?",
            options: [
              "Mathematics or Physics",
              "Languages or Literature",
              "Biology or Chemistry",
              "History or Civics",
              "Computer Science or Information Technology",
            ],
            category: "academics",
          },
          {
            id: 4,
            question: "How do you prefer to learn new information?",
            options: [
              "By reading and researching independently",
              "Through hands-on practical experience",
              "By discussing with others in a group",
              "Through visual aids and demonstrations",
              "By teaching or explaining to others",
            ],
            category: "learning",
          },
          {
            id: 5,
            question: "What kind of challenges motivate you the most?",
            options: [
              "Solving complex analytical problems",
              "Creating something innovative or artistic",
              "Helping others overcome their difficulties",
              "Mastering a technical skill",
              "Leading a team to achieve goals",
            ],
            category: "motivation",
          },
          {
            id: 6,
            question: "When faced with a difficult problem, you typically:",
            options: [
              "Break it down into smaller, manageable parts",
              "Look for creative, unconventional solutions",
              "Research how others have solved similar problems",
              "Discuss it with friends or colleagues",
              "Trust your intuition to guide you",
            ],
            category: "problem_solving",
          },
          {
            id: 7,
            question: "What type of work environment do you prefer?",
            options: [
              "Structured with clear guidelines",
              "Flexible and autonomous",
              "Collaborative and team-oriented",
              "Fast-paced and challenging",
              "Calm and quiet",
            ],
            category: "work_environment",
          },
          {
            id: 8,
            question:
              "Which of these activities would you choose for a free afternoon?",
            options: [
              "Reading a non-fiction book",
              "Creating art or music",
              "Playing sports or physical activity",
              "Socializing with friends",
              "Working on a DIY project",
            ],
            category: "leisure",
          },
          {
            id: 9,
            question: "How do you typically make important decisions?",
            options: [
              "Analyze all available data and information",
              "Consider your feelings and values",
              "Seek advice from trusted mentors",
              "Weigh pros and cons methodically",
              "Go with your gut feeling",
            ],
            category: "decision_making",
          },
          {
            id: 10,
            question: "Which skill would you most like to develop further?",
            options: [
              "Technical or analytical skills",
              "Creative thinking and expression",
              "Leadership and management",
              "Communication and interpersonal skills",
              "Research and information processing",
            ],
            category: "development",
          },
          {
            id: 11,
            question: "What aspect of a career is most important to you?",
            options: [
              "Intellectual stimulation and challenges",
              "Work-life balance",
              "Financial stability and growth",
              "Helping others and making a difference",
              "Recognition and status",
            ],
            category: "career_values",
          },
          {
            id: 12,
            question: "How do you react to unexpected changes?",
            options: [
              "Analyze the situation and adapt quickly",
              "Feel uncomfortable initially but adjust eventually",
              "Embrace change as an opportunity",
              "Prefer stability and consistent routines",
              "Depends entirely on the specific change",
            ],
            category: "adaptability",
          },
          {
            id: 13,
            question: "Which technological field interests you the most?",
            options: [
              "Artificial Intelligence and Machine Learning",
              "Digital Media and Content Creation",
              "Hardware and Engineering",
              "Healthcare and Biotech",
              "None - I prefer non-technical fields",
            ],
            category: "tech_interests",
          },
          {
            id: 14,
            question: "How important is creativity in your ideal career?",
            options: [
              "Extremely important - I need creative freedom",
              "Somewhat important - I like some creative aspects",
              "Neutral - It depends on the specific role",
              "Less important - I prefer structured work",
              "Not important - I focus on other job aspects",
            ],
            category: "creativity",
          },
          {
            id: 15,
            question:
              "Which of these would you enjoy researching in your free time?",
            options: [
              "Scientific discoveries and innovations",
              "Philosophy and abstract concepts",
              "History and cultural studies",
              "Business strategies and market trends",
              "Self-improvement and psychology",
            ],
            category: "intellectual_interests",
          },
        ];

        setQuestions(mockQuestions);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setAnswers({});
  };

  const getRecommendations = () => {
    let scienceScore = 0;
    let artsScore = 0;
    let commerceScore = 0;

    Object.entries(answers).forEach(([questionId, answer]) => {
      const qId = parseInt(questionId, 10);
      const ans = parseInt(answer, 10);

      // Science-oriented answers
      if ([1, 3, 5, 6, 10, 13].includes(qId) && [0, 2, 4].includes(ans)) {
        scienceScore++;
      }

      // Arts-oriented answers
      if ([1, 2, 3, 8, 10, 14].includes(qId) && [1, 3].includes(ans)) {
        artsScore++;
      }

      // Commerce-oriented answers
      if ([2, 4, 7, 9, 11].includes(qId) && [1, 4].includes(ans)) {
        commerceScore++;
      }
    });

    const scores = {
      Science: scienceScore,
      Arts: artsScore,
      Commerce: commerceScore,
    };

    const recommendedStream = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    const recommendations = {
      Science: {
        courses: [
          "B.Sc. Physics",
          "B.Sc. Computer Science",
          "B.Tech",
          "B.Sc. Mathematics",
          "MBBS",
          "B.Pharm",
        ],
        careers: [
          "Research Scientist",
          "Data Analyst",
          "Software Engineer",
          "Doctor",
          "Pharmacist",
          "Environmental Scientist",
        ],
      },
      Arts: {
        courses: [
          "B.A. English",
          "B.A. Psychology",
          "B.A. Sociology",
          "B.A. Political Science",
          "B.A. Economics",
          "B.A. History",
        ],
        careers: [
          "Content Writer",
          "Social Worker",
          "Teacher",
          "Journalist",
          "Diplomat",
          "Heritage Consultant",
        ],
      },
      Commerce: {
        courses: [
          "B.Com",
          "BBA",
          "B.Com (Accounting & Finance)",
          "Chartered Accountancy",
          "B.Com (Banking & Insurance)",
          "BMS",
        ],
        careers: [
          "Accountant",
          "Business Manager",
          "Financial Analyst",
          "Entrepreneur",
          "Investment Banker",
          "Marketing Executive",
        ],
      },
    };

    return {
      stream: recommendedStream,
      courses: recommendations[recommendedStream].courses,
      careers: recommendations[recommendedStream].careers,
      scores,
    };
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Aptitude & Interest Assessment
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover which academic path aligns with your natural abilities and
          interests by answering the following questions
        </p>
      </div>

      {/* Progress */}
      {!showResult && (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Quiz / Results */}
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {!showResult ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    handleAnswer(questions[currentQuestion].id, idx)
                  }
                  className="w-full text-left p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          (() => {
            const recommendation = getRecommendations();
            return (
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    Recommended Stream
                  </h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {recommendation.stream}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Your Interest Profile
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(recommendation.scores).map(
                      ([stream, score]) => (
                        <div
                          key={stream}
                          className="bg-gray-50 rounded-lg p-4 text-center"
                        >
                          <div className="font-medium text-gray-700">
                            {stream}
                          </div>
                          <div className="mt-2 relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div
                                style={{ width: `${(score / 5) * 100}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  stream === "Science"
                                    ? "bg-blue-600"
                                    : stream === "Arts"
                                    ? "bg-purple-600"
                                    : "bg-green-600"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Suggested Courses
                    </h3>
                    <ul className="space-y-2">
                      {recommendation.courses.map((course, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Potential Careers
                    </h3>
                    <ul className="space-y-2">
                      {recommendation.careers.map((career, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Next Steps
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Based on your assessment, we recommend exploring more about
                    the courses in {recommendation.stream} stream.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/course-explorer"
                      className="text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Explore Related Courses
                    </Link>
                    <Link
                      to="/college-directory"
                      className="text-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Find Colleges Offering These Courses
                    </Link>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={resetTest}
                    className="px-4 py-2 text-blue-600 font-medium hover:underline"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}

export default AptitudeTest;
