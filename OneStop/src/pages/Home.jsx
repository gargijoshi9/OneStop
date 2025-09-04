import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ChartBarIcon,
  MapIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

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
    <div className="bg-black text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-blue-900/50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500 to-blue-900 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-500 to-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slower" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-300 bg-clip-text text-transparent">
                Personalized
              </span>{" "}
              Educational Journey Guide
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
              Making informed decisions about your education and career path has
              never been easier. <br />
              Let us guide you to the right choices.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link
                to="/aptitude-test"
                className="px-8 py-3 text-lg rounded-full font-bold shadow-lg bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:scale-105 transition-transform duration-200 hover:from-indigo-600 hover:to-pink-600"
              >
                Take Aptitude Test
              </Link>
              <Link
                to="/course-explorer"
                className="px-8 py-3 text-lg rounded-full font-bold shadow-lg bg-white text-indigo-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-purple-200 dark:hover:bg-slate-700"
              >
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-purple-300">
              How We Help You
            </h2>
            <p className="mt-4 text-lg text-gray-300 dark:text-gray-400 max-w-3xl mx-auto">
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
                className="rounded-2xl shadow-lg border border-slate-300 bg-black p-7 flex flex-col items-center transition-all duration-300 shadow-purple-500/10 hover:shadow-xl hover:scale-[1.02] hover:border-purple-400/50 hover:shadow-purple-500/20"
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-purple-300 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6 text-center">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="text-purple-400 hover:underline mt-auto"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-500 dark:text-purple-300">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-200 dark:text-gray-400">
              Hear from students who made informed decisions with our guidance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The aptitude test helped me realize...",
                name: "Priya Singh",
                role: "Student, Delhi University",
              },
              {
                quote: "I was confused about which stream...",
                name: "Rahul Sharma",
                role: "Student, Government College",
              },
              {
                quote: "The college directory feature...",
                name: "Ananya Patel",
                role: "First Year Science Student",
              },
            ].map((testimonial, idx) => (
              <motion.div
  key={idx}
  variants={cardVariants}           // Apply card animation variants
  initial="offscreen"               // Initial animation state
  whileInView="onscreen"           // Animate on entering viewport
  viewport={{ once: true, amount: 0.2 }}
  whileHover={{ scale: 1.04, y: -5 }}  // Hover effect: scale up and move up
  className="rounded-2xl bg-black p-7 border border-slate-300 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-400/50 flex flex-col items-center"
>
  <p className="text-gray-300 italic mb-4 text-lg relative z-10">
    “{testimonial.quote}”
  </p>
  <div>
    <p className="font-semibold text-indigo-600 dark:text-purple-300">
      {testimonial.name}
    </p>
    <p className="text-gray-300">
      {testimonial.role}
    </p>
  </div>
</motion.div>

            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white drop-shadow-lg"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <p className="text-lg text-purple-200 mt-4 mb-8">
            Create an account to get personalized recommendations and track your
            progress.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 rounded-full bg-white text-purple-700 font-semibold shadow-lg hover:bg-purple-100 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;