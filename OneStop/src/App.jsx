import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
import Dashboard from "./pages/Dashboard";

import { ChevronUp, ArrowLeft } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

// Helper component for routes that need authentication
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// ✅ This new component contains all your layout and routing logic
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [showButton, setShowButton] = useState(false);
  const [isInQuiz, setIsInQuiz] = useState(false); // Assuming you still need this state here

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleBack = () => {
    if (isInQuiz) {
      setIsInQuiz(false);
    } else {
      navigate(-1);
    }
  };
  
  // ✅ Don't show the back button on the main logged-in or logged-out home pages
  const showBackButton = isAuthenticated ? location.pathname !== "/dashboard" : location.pathname !== "/";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      {/* {showBackButton && (
        <button
          onClick={handleBack}
          className="absolute top-20 left-6 z-40 rounded-full shadow-lg p-[0.4rem] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:shadow-purple-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
      )} */}

      <main className="flex-grow">
        <Routes>
          {/* ✅ --- ROUTING LOGIC UPDATED --- */}

          {/* Rule 1: Public pages that redirect when logged in */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
          
          {/* Public pages accessible to everyone */}
          <Route path="/course-explorer" element={<CourseExplorer />} />
          <Route path="/college-directory" element={<CollegeDirectory />} />

          {/* Rule 2: Protected pages that require login */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/aptitude-test" element={<ProtectedRoute><AptitudeTest isInQuiz={isInQuiz} setIsInQuiz={setIsInQuiz} /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          {/* Fallback route for any unknown paths */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
        </Routes>
      </main>

      {location.pathname !== "/settings" && <Footer />}

      <div className="fixed bottom-4 right-4 z-40">
        <Chatbot />
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 rounded-full shadow-lg p-[0.4rem] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:shadow-purple-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronUp size={40} strokeWidth={2} color="white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ✅ App component is now much simpler
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