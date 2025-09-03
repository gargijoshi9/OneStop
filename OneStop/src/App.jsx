import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AptitudeTest from "./pages/AptitudeTest";
import CourseExplorer from "./pages/CourseExplorer";
import CollegeDirectory from "./pages/CollegeDirectory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <AuthProvider>
         <div className="dark bg-black text-white flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aptitude-test" element={<AptitudeTest />} />
              <Route path="/course-explorer" element={<CourseExplorer />} />
              <Route path="/college-directory" element={<CollegeDirectory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/settings" element={<Settings />} />{" "}
              {/* <--- Add this line */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
