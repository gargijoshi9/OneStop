import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AptitudeTest from "./pages/AptitudeTest";
import Result from "./pages/Result";
import CourseExplorer from "./pages/CourseExplorer";
import CollegeDirectory from "./pages/CollegeDirectory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";
import Chatbot from "./pages/Chatbot";

import { ChevronUp, ArrowLeft } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

function BackButton({ isInQuiz, setIsInQuiz }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    if (isInQuiz) {
      // Exit quiz → back to quiz cards
      setIsInQuiz(false);
    } else if (location.pathname.startsWith("/aptitude-test")) {
      // On AptitudeTest main page
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="absolute top-20 left-6 z-40 rounded-full shadow-lg p-[0.4rem]
                 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600
                 text-white hover:shadow-purple-500/40 hover:scale-110
                 transition-all duration-300 flex items-center justify-center"
    >
      <ArrowLeft size={28} strokeWidth={2.5} />
    </button>
  );
}

function AppLayout() {
  const location = useLocation();

  // Back to Top state + scroll listener
  const [showButton, setShowButton] = useState(false);

  // Quiz state
  const [isInQuiz, setIsInQuiz] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Navbar />

      {/* Global Back Button (not on home page) */}
      <BackButton isInQuiz={isInQuiz} setIsInQuiz={setIsInQuiz} />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/aptitude-test"
            element={<AptitudeTest isInQuiz={isInQuiz} setIsInQuiz={setIsInQuiz} />}
          />
          <Route path="/result" element={<Result />} />
          <Route path="/course-explorer" element={<CourseExplorer />} />
          <Route path="/college-directory" element={<CollegeDirectory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      {location.pathname !== "/settings" && <Footer />}

      {/* Floating chatbot */}
      <div className="fixed bottom-4 right-4 z-40">
        <Chatbot />
      </div>

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
