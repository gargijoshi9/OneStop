import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ChartBarIcon,
  MapIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    title: "Aptitude & Interest Tests",
    description:
      "Discover your natural talents and interests through our personalized assessment tools",
    icon: (
      <ChartBarIcon className="h-10 w-10 text-purple-400" />
    ),
    link: "/aptitude-test",
  },
  {
    title: "Course to Career Mapping",
    description:
      "Explore different educational paths and see where they lead in terms of career opportunities",
    icon: <MapIcon className="h-10 w-10 text-pink-400" />,
    link: "/course-explorer",
  },
  {
    title: "College Directory",
    description:
      "Find government colleges in your area with detailed information about courses and facilities",
    icon: (
      <AcademicCapIcon className="h-10 w-10 text-yellow-400" />
    ),
    link: "/college-directory",
  },
  {
    title: "Timeline Tracking",
    description:
      "Stay informed about important dates for admissions, scholarships, and exams",
    icon: (
      <CalendarIcon className="h-10 w-10 text-cyan-400" />
    ),
    link: "/timeline",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 30, scale: 0.95 },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring" },
  },
};

function Dashboard() {
  const { user } = useAuth(); // Get the logged-in user's details

  return (
    <div className="bg-black text-white">
      {/* Personalized Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-blue-900/50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-600 to-blue-800 rounded-full opacity-20 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[48rem] h-[48rem] bg-gradient-to-br from-pink-600 to-purple-800 rounded-full opacity-20 blur-3xl animate-float-delay" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {user?.name || "User"}
              </span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
              Your journey continues here. Explore the tools below to find your
              perfect path.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section (Dashboard Tools) */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-300">Your Tools</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              All our platform features are available for you right here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl bg-black p-7 border border-slate-700 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-400/50 flex flex-col items-center"
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-purple-300 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 text-center">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-purple-400 hover:underline mt-auto"
                >
                  Start Now <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;