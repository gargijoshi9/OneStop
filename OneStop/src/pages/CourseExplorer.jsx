import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  TagIcon,
  ClockIcon,
  ArrowUpRightIcon,
  ArrowTrendingUpIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { ChevronUp } from "lucide-react";

function CourseExplorer() {
  const [activeStream, setActiveStream] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showButton, setShowButton] = useState(false);

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

  const streams = [
    { id: 'all', name: 'All Streams', icon: <MagnifyingGlassIcon className="h-5 w-5 mr-2" /> },
    { id: 'arts', name: 'Arts & Humanities', icon: <BookOpenIcon className="h-5 w-5 mr-2" /> },
    { id: 'science', name: 'Science', icon: <AcademicCapIcon className="h-5 w-5 mr-2" /> },
    { id: 'commerce', name: 'Commerce & Management', icon: <BriefcaseIcon className="h-5 w-5 mr-2" /> },
    { id: 'vocational', name: 'Vocational & Skill-based', icon: <WrenchScrewdriverIcon className="h-5 w-5 mr-2" /> }
  ];

  const courses = [
    {
      id: 1,
      name: 'Bachelor of Arts (B.A.)',
      stream: 'arts',
      duration: '3 years',
      description: 'A degree program in various arts subjects including languages, history, political science, sociology, etc.',
      careers: ['Teacher', 'Journalist', 'Content Writer', 'Public Relations Officer', 'Civil Services'],
      higherStudies: ['M.A.', 'M.Phil', 'Ph.D', 'MBA'],
      governmentExams: ['UPSC Civil Services', 'SSC', 'Banking Exams', 'NET/SET']
    },
    {
      id: 2,
      name: 'Bachelor of Science (B.Sc)',
      stream: 'science',
      duration: '3 years',
      description: 'A degree program in scientific fields such as physics, chemistry, mathematics, biology, etc.',
      careers: ['Lab Technician', 'Research Assistant', 'Data Analyst', 'Quality Control Specialist', 'Environmental Scientist'],
      higherStudies: ['M.Sc.', 'M.Tech', 'Ph.D', 'MBA in Tech'],
      governmentExams: ['UPSC', 'CSIR-NET', 'GATE', 'Banking Exams']
    },
    {
      id: 3,
      name: 'Bachelor of Commerce (B.Com)',
      stream: 'commerce',
      duration: '3 years',
      description: 'A degree program focusing on commerce, business studies, accounting, and finance.',
      careers: ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Investment Banker', 'Entrepreneur'],
      higherStudies: ['M.Com', 'MBA', 'CA', 'CMA', 'CS'],
      governmentExams: ['Banking Exams', 'SSC', 'UPSC', 'Insurance Exams']
    },
    {
      id: 4,
      name: 'Bachelor of Computer Applications (BCA)',
      stream: 'science',
      duration: '3 years',
      description: 'A degree program in computer applications and software development.',
      careers: ['Software Developer', 'Web Developer', 'System Analyst', 'IT Support Specialist', 'Database Administrator'],
      higherStudies: ['MCA', 'M.Sc. IT', 'M.Tech', 'MBA in IT'],
      governmentExams: ['NIELIT', 'Banking IT Officer', 'SSC', 'UPSC']
    },
    {
      id: 5,
      name: 'Bachelor of Business Administration (BBA)',
      stream: 'commerce',
      duration: '3 years',
      description: 'A degree program in business administration and management principles.',
      careers: ['Business Manager', 'HR Executive', 'Marketing Associate', 'Operations Manager', 'Entrepreneur'],
      higherStudies: ['MBA', 'PGDM', 'M.Com', 'MIB'],
      governmentExams: ['Banking PO', 'SSC', 'UPSC', 'PSU Management Trainee']
    },
    {
      id: 6,
      name: 'Bachelor of Education (B.Ed)',
      stream: 'arts',
      duration: '2 years',
      description: 'A professional degree program for aspiring teachers.',
      careers: ['School Teacher', 'Educational Counselor', 'Content Developer', 'Education Administrator'],
      higherStudies: ['M.Ed', 'M.A. Education', 'Ph.D in Education'],
      governmentExams: ['CTET', 'State TET', 'UPSC', 'NET/SET']
    },
    {
      id: 7,
      name: 'Diploma in Mechanical Engineering',
      stream: 'vocational',
      duration: '3 years',
      description: 'A diploma program in mechanical engineering concepts and applications.',
      careers: ['Junior Engineer', 'Supervisor', 'Technical Assistant', 'Service Engineer'],
      higherStudies: ['B.Tech through lateral entry', 'Advanced Diploma'],
      governmentExams: ['SSC JE', 'RRB', 'State Technical Services']
    },
    {
      id: 8,
      name: 'Bachelor of Pharmacy (B.Pharm)',
      stream: 'science',
      duration: '4 years',
      description: 'A degree program in pharmaceutical sciences.',
      careers: ['Pharmacist', 'Drug Inspector', 'Clinical Research Associate', 'Medical Representative'],
      higherStudies: ['M.Pharm', 'Ph.D', 'MBA in Healthcare'],
      governmentExams: ['GPAT', 'NIPER JEE', 'Drug Inspector Exam']
    }
  ];

  const filteredCourses = courses
    .filter(course => activeStream === 'all' || course.stream === activeStream)
    .filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );


  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-600 to-blue-800 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[48rem] h-[48rem] bg-gradient-to-br from-pink-600 to-purple-800 rounded-full opacity-20 blur-3xl animate-float-delay" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4 flex items-center justify-center gap-3">
            <MagnifyingGlassIcon className="h-10 w-10" />
            Course Explorer
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discover various educational paths and understand where they can lead in terms of career opportunities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full bg-white/10 text-white border border-white/20 rounded-md pl-10 pr-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {streams.map(stream => (
                <button
                  key={stream.id}
                  onClick={() => setActiveStream(stream.id)}
                  className={`flex items-center px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeStream === stream.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {stream.icon}
                  {stream.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] hover:shadow-purple-500/20"
            >
              <div className={`h-2 ${
                course.stream === 'arts' ? 'bg-purple-600' :
                course.stream === 'science' ? 'bg-blue-600' :
                course.stream === 'commerce' ? 'bg-green-600' :
                'bg-pink-600'
              }`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-white">{course.name}</h2>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    course.stream === 'arts' ? 'bg-purple-500/20 text-purple-300' :
                    course.stream === 'science' ? 'bg-blue-500/20 text-blue-300' :
                    course.stream === 'commerce' ? 'bg-green-500/20 text-green-300' :
                    'bg-pink-500/20 text-pink-300'
                  }`}>
                    <TagIcon className="h-3 w-3 mr-1" />
                    {streams.find(s => s.id === course.stream)?.name}
                  </span>
                </div>
                <p className="text-gray-400 mb-2 text-sm">{course.description}</p>
                <p className="text-gray-400 mb-4 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <strong>Duration:</strong> {course.duration}
                </p>
                <div className="space-y-2">
                  <details className="backdrop-blur-sm bg-white/5 p-3 rounded-lg cursor-pointer group">
                    <summary className="font-semibold text-purple-300 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <ArrowTrendingUpIcon className="h-5 w-5" />
                        Potential Careers
                      </span>
                      <ChevronRightIcon className="h-5 w-5 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <ul className="list-disc list-inside text-gray-400 mt-2 text-sm pl-4">
                      {course.careers.map((career, i) => <li key={i}>{career}</li>)}
                    </ul>
                  </details>
                  <details className="backdrop-blur-sm bg-white/5 p-3 rounded-lg cursor-pointer group">
                    <summary className="font-semibold text-purple-300 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <AcademicCapIcon className="h-5 w-5" />
                        Higher Studies Options
                      </span>
                      <ChevronRightIcon className="h-5 w-5 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <ul className="list-disc list-inside text-gray-400 mt-2 text-sm pl-4">
                      {course.higherStudies.map((study, i) => <li key={i}>{study}</li>)}
                    </ul>
                  </details>
                  <details className="backdrop-blur-sm bg-white/5 p-3 rounded-lg cursor-pointer group">
                    <summary className="font-semibold text-purple-300 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <DocumentCheckIcon className="h-5 w-5" />
                        Government Exam Eligibility
                      </span>
                      <ChevronRightIcon className="h-5 w-5 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <ul className="list-disc list-inside text-gray-400 mt-2 text-sm pl-4">
                      {course.governmentExams.map((exam, i) => <li key={i}>{exam}</li>)}
                    </ul>
                  </details>
                </div>
                <Link to="/college-directory" className="text-blue-400 hover:underline mt-6 font-semibold flex items-center gap-1">
                  Find Colleges <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredCourses.length === 0 && (
          <div className="mt-12 text-center text-gray-400 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-lg">No courses match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveStream('all');
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
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

export default CourseExplorer;