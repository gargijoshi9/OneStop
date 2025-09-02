import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AcademicCapIcon, ChartBarIcon, MapIcon, CalendarIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Aptitude & Interest Tests",
    description: "Discover your natural talents and interests through our personalized assessment tools",
    icon: <ChartBarIcon className="h-10 w-10 text-indigo-500" />,
    link: "/aptitude-test",
  },
  {
    title: "Course to Career Mapping",
    description: "Explore different educational paths and see where they lead in terms of career opportunities",
    icon: <MapIcon className="h-10 w-10 text-pink-500" />,
    link: "/course-explorer",
  },
  {
    title: "College Directory",
    description: "Find government colleges in your area with detailed information about courses and facilities",
    icon: <AcademicCapIcon className="h-10 w-10 text-amber-500" />,
    link: "/college-directory",
  },
  {
    title: "Timeline Tracking",
    description: "Stay informed about important dates for admissions, scholarships, and exams",
    icon: <CalendarIcon className="h-10 w-10 text-cyan-500" />,
    link: "/",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 30, scale: 0.95 },
  onscreen: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring" } },
};

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section with Animated Entrance */}
      <section className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 py-24 relative overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
              Your&nbsp;
              <span className="bg-gradient-to-r from-fuchsia-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-gradient">
                Personalized
              </span>
              &nbsp;Educational Journey Guide
            </h1>
            <p className="text-2xl text-blue-100 max-w-2xl mx-auto mb-10 font-light">
              Making informed decisions about your education and career path has never been easier.
              <br />Let us guide you to the right choices.
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
                className="px-8 py-3 text-lg rounded-full font-bold shadow-lg bg-white text-indigo-700 hover:bg-indigo-100 hover:scale-105 transition-transform duration-200"
              >
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>

          {/* Decorative Gradient Blobs */}
          <div className="absolute left-0 top-0 w-60 h-60 bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten animate-pulse"></div>
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-3xl mix-blend-lighten animate-pulse"></div>
        </div>
      </section>

      {/* Features Section with Animated Cards */}
      <section className="py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-600">How We Help You</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Our platform provides tools and resources to help you make the best decisions for your academic journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-7 min-h-[280px] flex flex-col items-center hover:scale-105 hover:shadow-indigo-300 hover:shadow-lg transition-transform duration-300 border border-indigo-100"
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-indigo-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-500 mb-6 text-center">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-indigo-600 hover:text-pink-500 font-medium underline decoration-dotted"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section with Subtle Animations */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-700">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-500">
              Hear from students who made informed decisions with our guidance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The aptitude test helped me realize my strengths in analytical thinking. I'm now pursuing a BSc in Computer Science and couldn't be happier!",
                name: "Priya Singh",
                role: "Student, Delhi University",
              },
              {
                quote:
                  "I was confused about which stream to choose after 12th. This platform gave me clarity about various options and I found my passion in Economics.",
                name: "Rahul Sharma",
                role: "Student, Government College",
              },
              {
                quote:
                  "The college directory feature helped me find a government college near my hometown with excellent science facilities. Saved me and my parents a lot of research time.",
                name: "Ananya Patel",
                role: "First Year Science Student",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px #a5b4fc" }}
                className="bg-white rounded-xl p-8 shadow-lg relative transition-all duration-300"
              >
                <p className="text-gray-700 italic mb-4 text-lg before:content-['“'] after:content-['”'] relative z-10">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-medium text-indigo-700">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <span className="absolute -top-6 left-6 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-10 w-16 h-16 blur-2xl pointer-events-none z-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Vivid Colors & Pop */}
      <section className="bg-gradient-to-r from-indigo-700 via-pink-500 to-purple-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <p className="text-2xl text-pink-100 mb-12 max-w-3xl mx-auto">
            Create an account to get personalized recommendations and track your progress.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex justify-center"
          >
            <Link
              to="/signup"
              className="px-10 py-4 text-xl rounded-full font-bold bg-white text-indigo-600 shadow-lg hover:bg-indigo-50 hover:text-pink-600 hover:scale-105 transition ease-in-out duration-200"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
