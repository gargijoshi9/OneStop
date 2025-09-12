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
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    title: "Aptitude & Interest Tests",
    description:
      "Discover your natural talents and interests through our personalized assessment tools",
    icon: (
      <ChartBarIcon className="h-10 w-10 text-indigo-500 dark:text-purple-400" />
    ),
    link: "/aptitude-test",
  },
  {
    title: "Course to Career Mapping",
    description:
      "Explore different educational paths and see where they lead in terms of career opportunities",
    icon: <MapIcon className="h-10 w-10 text-pink-500 dark:text-pink-400" />,
    link: "/course-explorer",
  },
  {
    title: "College Directory",
    description:
      "Find government colleges in your area with detailed information about courses and facilities",
    icon: (
      <AcademicCapIcon className="h-10 w-10 text-amber-500 dark:text-yellow-400" />
    ),
    link: "/college-directory",
  },
  {
    title: "Timeline Tracking",
    description:
      "Stay informed about important dates for admissions, scholarships, and exams",
    icon: (
      <CalendarIcon className="h-10 w-10 text-cyan-500 dark:text-cyan-400" />
    ),
    link: "/",
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

function Home() {
  const { user } = useAuth();

 return (
    // The main background is now handled by App.jsx, so we remove it from here
    <div className="text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-blue-900/50 py-24 relative overflow-hidden">
        {/* ... Hero Section content remains the same */}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-300">
              How We Help You
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              Our platform provides tools and resources to help you make the
              best decisions for your academic journey.
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
                  Learn more <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        {/* ... Testimonials Section content remains largely the same, just cleaning up styles */}
      </section>

      {/* Call to Action Section - NOW DYNAMIC */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-800 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white drop-shadow-lg"
          >
            {user ? `Welcome back, ${user.name}!` : "Ready to Start Your Journey?"}
          </motion.h2>
          <p className="text-lg text-purple-200 mt-4 mb-8">
            {user
              ? "Continue your journey by exploring our assessment tools."
              : "Create an account to get personalized recommendations and track your progress."}
          </p>
          {user ? (
            <Link
              to="./pages/AptitudeTest"
              className="inline-flex items-center px-10 py-4 rounded-full bg-white text-purple-700 font-semibold shadow-lg hover:bg-purple-100 transition"
            >
              Go to Dashboard
              <ArrowRightIcon className="h-6 w-6 ml-2" />
            </Link>
          ) : (
            <Link
              to="./pages/Signup"
              className="inline-flex items-center px-10 py-4 rounded-full bg-white text-purple-700 font-semibold shadow-lg hover:bg-purple-100 transition"
            >
              Sign Up Now
              <UserPlusIcon className="h-6 w-6 ml-2" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;