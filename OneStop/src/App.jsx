import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React from "react";

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
import "leaflet/dist/leaflet.css";
import Chatbot from "./pages/Chatbot";

function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
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
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>
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
