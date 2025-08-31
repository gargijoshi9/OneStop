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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Explorer</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover various educational paths and understand where they can lead you in terms of career opportunities
        </p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {streams.map(stream => (
              <button
                key={stream.id}
                className={`px-4 py-1 text-sm rounded-full transition ${
                  activeStream === stream.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveStream(stream.id)}
              >
                {stream.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className={`h-2 ${
              course.stream === 'arts' ? 'bg-purple-500' :
              course.stream === 'science' ? 'bg-blue-500' :
              course.stream === 'commerce' ? 'bg-green-500' : 'bg-orange-500'
            }`}></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{course.name}</h2>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  course.stream === 'arts' ? 'bg-purple-100 text-purple-800' :
                  course.stream === 'science' ? 'bg-blue-100 text-blue-800' :
                  course.stream === 'commerce' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {streams.find(s => s.id === course.stream)?.name || course.stream}
                </span>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-500">
                  <span className="font-medium">Duration:</span> {course.duration}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <details className="group mb-3">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">Potential Careers</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {course.careers.map((career, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {career}
                    </li>
                  ))}
                </ul>
              </details>
              
              <details className="group mb-3">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">Higher Studies Options</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {course.higherStudies.map((study, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {study}
                    </li>
                  ))}
                </ul>
              </details>
              
              <details className="group mb-6">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">Government Exam Eligibility</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {course.governmentExams.map((exam, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {exam}
                    </li>
                  ))}
                </ul>
              </details>
              
              <div className="flex justify-between">
                <Link 
                  to="/college-directory"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className="mr-1">Find Colleges</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                
                <button className="text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No courses match your search criteria.</p>
          <button 
            onClick={() => {setSearchQuery(''); setActiveStream('all');}}
            className="mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseExplorer;