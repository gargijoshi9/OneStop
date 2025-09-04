import { useState } from 'react';
import { Link } from 'react-router-dom';

function CourseExplorer() {
  const [activeStream, setActiveStream] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const streams = [
    { id: 'all', name: 'All Streams' },
    { id: 'arts', name: 'Arts & Humanities' },
    { id: 'science', name: 'Science' },
    { id: 'commerce', name: 'Commerce & Management' },
    { id: 'vocational', name: 'Vocational & Skill-based' }
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
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Course Explorer</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Discover various educational paths and understand where they can lead in terms of career opportunities
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-wrap space-x-2">
            {streams.map(stream => (
              <button
                key={stream.id}
                onClick={() => setActiveStream(stream.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  activeStream === stream.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {stream.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-gray-900 border border-gray-700 rounded-lg shadow-md overflow-hidden hover:ring-2 hover:ring-blue-600 transition"
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
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  course.stream === 'arts' ? 'bg-purple-700 text-purple-300' :
                  course.stream === 'science' ? 'bg-blue-700 text-blue-300' :
                  course.stream === 'commerce' ? 'bg-green-700 text-green-300' :
                  'bg-pink-700 text-pink-300'
                }`}>
                  {streams.find(s => s.id === course.stream)?.name}
                </span>
              </div>
              <p className="text-gray-400 mb-2">{course.description}</p>
              <p className="text-gray-400 mb-1"><strong>Duration:</strong> {course.duration}</p>
              <div>
                <details className="bg-gray-800 rounded-md p-2 mb-2 cursor-pointer">
                  <summary className="text-white font-semibold">Potential Careers</summary>
                  <ul className="list-disc list-inside text-gray-400 mt-2">
                    {course.careers.map((career, i) => <li key={i}>{career}</li>)}
                  </ul>
                </details>
                <details className="bg-gray-800 rounded-md p-2 mb-2 cursor-pointer">
                  <summary className="text-white font-semibold">Higher Studies Options</summary>
                  <ul className="list-disc list-inside text-gray-400 mt-2">
                    {course.higherStudies.map((study, i) => <li key={i}>{study}</li>)}
                  </ul>
                </details>
                <details className="bg-gray-800 rounded-md p-2 cursor-pointer">
                  <summary className="text-white font-semibold">Government Exam Eligibility</summary>
                  <ul className="list-disc list-inside text-gray-400 mt-2">
                    {course.governmentExams.map((exam, i) => <li key={i}>{exam}</li>)}
                  </ul>
                </details>
              </div>
              <Link to="/college-directory" className="text-blue-500 hover:underline mt-4 block">
                Find Colleges &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredCourses.length === 0 && (
        <div className="mt-12 text-center text-gray-400">
          <p>No courses match your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveStream('all');
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseExplorer;