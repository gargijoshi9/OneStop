import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth();

  const features = [
    {
      title: "Aptitude & Interest Tests",
      description:
        "Discover your natural talents and interests through our personalized assessment tools",
      icon: "📊",
      link: "/aptitude-test",
    },
    {
      title: "Course to Career Mapping",
      description:
        "Explore different educational paths and see where they lead in terms of career opportunities",
      icon: "🗺️",
      link: "/course-explorer",
    },
    {
      title: "College Directory",
      description:
        "Find government colleges in your area with detailed information about courses and facilities",
      icon: "🏛️",
      link: "/college-directory",
    },
    {
      title: "Timeline Tracking",
      description:
        "Stay informed about important dates for admissions, scholarships, and exams",
      icon: "📅",
      link: "/",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Personalized
              </span>{" "}
              Educational Journey Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Making informed decisions about your education and career path has
              never been easier. Let us guide you to the right choices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/aptitude-test"
                className="px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md"
              >
                Take Aptitude Test
              </Link>
              <Link
                to="/course-explorer"
                className="px-8 py-3 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 shadow-md"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              How We Help You
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides tools and resources to help you make the
              best decisions for your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600">
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Create an account to get personalized recommendations and track your
            progress
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 shadow-md"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
