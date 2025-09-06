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
      "id": 1,
      "name": "Bachelor of Arts (B.A.)",
      "stream": "arts",
      "duration": "3 years",
      "description": "A degree program in various arts subjects including languages, history, political science, sociology, etc.",
      "careers": ["Teacher", "Journalist", "Content Writer", "Public Relations Officer", "Civil Services"],
      "higherStudies": ["M.A.", "M.Phil", "Ph.D", "MBA"],
      "governmentExams": ["UPSC Civil Services", "SSC", "Banking Exams", "NET/SET"]
    },
    {
      "id": 2,
      "name": "Bachelor of Fine Arts (BFA)",
      "stream": "arts",
      "duration": "3-4 years",
      "description": "Focuses on visual and performing arts such as painting, sculpture, music, dance, and theatre.",
      "careers": ["Artist", "Art Director", "Animator", "Performer", "Graphic Designer"],
      "higherStudies": ["MFA", "M.A.", "Ph.D"],
      "governmentExams": ["UGC NET", "SSC", "UPSC Civil Services"]
    },
    {
      "id": 3,
      "name": "Bachelor of Social Work (BSW)",
      "stream": "arts",
      "duration": "3 years",
      "description": "A professional degree in social work focusing on community development and welfare.",
      "careers": ["Social Worker", "NGO Worker", "Rehabilitation Specialist", "Community Organizer"],
      "higherStudies": ["MSW", "M.A. Sociology", "Ph.D"],
      "governmentExams": ["UPSC Social Services", "State PSC", "NET"]
    },
    {
      "id": 4,
      "name": "Bachelor of Science (B.Sc.)",
      "stream": "science",
      "duration": "3 years",
      "description": "Covers core sciences like Physics, Chemistry, Biology, Mathematics, Computer Science, and specializations.",
      "careers": ["Researcher", "Scientist", "Professor", "Lab Technician"],
      "higherStudies": ["M.Sc", "Ph.D", "MBA"],
      "governmentExams": ["UPSC Civil Services", "CSIR NET", "SSC CGL"]
    },
    {
      "id": 5,
      "name": "Bachelor of Computer Applications (BCA)",
      "stream": "science",
      "duration": "3 years",
      "description": "Covers programming, computer applications, database management, and IT systems.",
      "careers": ["Software Developer", "System Analyst", "Web Developer"],
      "higherStudies": ["MCA", "MBA", "M.Sc CS"],
      "governmentExams": ["Banking Exams", "SSC", "UPSC Civil Services"]
    },
    {
      "id": 6,
      "name": "Bachelor of Mathematics (B.Math.)",
      "stream": "science",
      "duration": "3 years",
      "description": "Specialized degree in mathematics focusing on pure and applied mathematical sciences.",
      "careers": ["Mathematician", "Statistician", "Data Analyst"],
      "higherStudies": ["M.Math", "M.Sc", "Ph.D"],
      "governmentExams": ["UPSC IAS", "CSIR NET", "SSC"]
    },
    {
      "id": 7,
      "name": "Bachelor of Technology (B.Tech.)",
      "stream": "engineering",
      "duration": "4 years",
      "description": "Undergraduate degree in engineering disciplines such as CSE, Mechanical, Civil, Electrical, Electronics.",
      "careers": ["Software Engineer", "Mechanical Engineer", "Civil Engineer"],
      "higherStudies": ["M.Tech", "MBA", "Ph.D"],
      "governmentExams": ["GATE", "ESE", "SSC JE", "DRDO/ISRO"]
    },
    {
      "id": 8,
      "name": "Bachelor of Engineering (B.E.)",
      "stream": "engineering",
      "duration": "4 years",
      "description": "Engineering degree similar to B.Tech with focus on applied sciences and industry training.",
      "careers": ["Electrical Engineer", "Civil Engineer", "Software Developer"],
      "higherStudies": ["M.E.", "MBA", "Ph.D"],
      "governmentExams": ["GATE", "UPSC Engineering Services"]
    },
    {
      "id": 9,
      "name": "Bachelor of Business Administration (BBA)",
      "stream": "commerce",
      "duration": "3 years",
      "description": "Covers fundamentals of business management, marketing, and finance.",
      "careers": ["Business Analyst", "Marketing Executive", "HR Manager"],
      "higherStudies": ["MBA", "PGDM", "M.Com"],
      "governmentExams": ["UPSC", "Banking Exams", "SSC"]
    },
    {
      "id": 10,
      "name": "Bachelor of Commerce (B.Com.)",
      "stream": "commerce",
      "duration": "3 years",
      "description": "Focuses on accounting, economics, finance, and business studies.",
      "careers": ["Accountant", "Banker", "Auditor"],
      "higherStudies": ["M.Com", "MBA", "CA", "CFA"],
      "governmentExams": ["UPSC Civil Services", "CA Exams", "SSC CGL"]
    },
    {
      "id": 11,
      "name": "Bachelor of Economics (B.Econ)",
      "stream": "commerce",
      "duration": "3 years",
      "description": "Specializes in economics, statistics, and econometrics.",
      "careers": ["Economist", "Data Analyst", "Policy Analyst"],
      "higherStudies": ["M.A. Economics", "M.Phil", "Ph.D"],
      "governmentExams": ["UPSC IES", "RBI Grade B", "SSC"]
    },
    {
      "id": 12,
      "name": "Bachelor of Law (LLB)",
      "stream": "law",
      "duration": "3 years / 5 years integrated",
      "description": "Professional degree in law for legal practice, advocacy, and judiciary.",
      "careers": ["Lawyer", "Judge", "Legal Consultant"],
      "higherStudies": ["LLM", "Ph.D in Law"],
      "governmentExams": ["Judicial Services", "CLAT PG", "UPSC Civil Services"]
    },
    {
      "id": 13,
      "name": "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
      "stream": "medical",
      "duration": "5.5 years",
      "description": "Professional degree in medicine to practice as a doctor.",
      "careers": ["Doctor", "Surgeon", "Medical Researcher"],
      "higherStudies": ["MD", "MS", "DM", "M.Ch"],
      "governmentExams": ["NEET-PG", "AIIMS PG", "UPSC CMS"]
    },
    {
      "id": 14,
      "name": "Bachelor of Dental Surgery (BDS)",
      "stream": "medical",
      "duration": "5 years",
      "description": "Degree program in dentistry including surgery and oral care.",
      "careers": ["Dentist", "Orthodontist", "Prosthodontist"],
      "higherStudies": ["MDS", "Ph.D Dentistry"],
      "governmentExams": ["NEET-PG", "State Dental Exams"]
    },
    {
      "id": 15,
      "name": "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
      "stream": "medical",
      "duration": "5.5 years",
      "description": "Focuses on traditional Indian medicine (Ayurveda).",
      "careers": ["Ayurvedic Doctor", "Therapist", "Researcher"],
      "higherStudies": ["MD Ayurveda", "Ph.D"],
      "governmentExams": ["AYUSH Exams", "UPSC CMS"]
    },
    {
      "id": 16,
      "name": "Bachelor of Pharmacy (B.Pharm)",
      "stream": "medical",
      "duration": "4 years",
      "description": "Degree in pharmaceutical sciences, drug development, and clinical pharmacy.",
      "careers": ["Pharmacist", "Drug Inspector", "Clinical Researcher"],
      "higherStudies": ["M.Pharm", "Ph.D", "MBA Pharma"],
      "governmentExams": ["GPAT", "Drug Inspector Exams"]
    },
    {
      "id": 17,
      "name": "Bachelor of Physiotherapy (BPT)",
      "stream": "medical",
      "duration": "4.5 years",
      "description": "Specializes in physiotherapy, rehabilitation, and sports medicine.",
      "careers": ["Physiotherapist", "Sports Therapist"],
      "higherStudies": ["MPT", "Ph.D"],
      "governmentExams": ["AIIMS Paramedical Exams", "State PSC Health Services"]
    },
    {
      "id": 18,
      "name": "Bachelor of Nursing (B.Sc Nursing)",
      "stream": "medical",
      "duration": "4 years",
      "description": "Degree in nursing covering patient care, clinical training, and hospital management.",
      "careers": ["Nurse", "Clinical Instructor", "Hospital Administrator"],
      "higherStudies": ["M.Sc Nursing", "Ph.D"],
      "governmentExams": ["AIIMS Nursing Officer", "State PSC Nursing Exams"]
    },
    {
      "id": 19,
      "name": "Bachelor of Education (B.Ed)",
      "stream": "education",
      "duration": "2 years (after graduation)",
      "description": "Professional degree in teaching and pedagogy.",
      "careers": ["School Teacher", "Education Consultant"],
      "higherStudies": ["M.Ed", "Ph.D Education"],
      "governmentExams": ["CTET", "State TET", "NET"]
    },
    {
      "id": 20,
      "name": "Bachelor of Library Science (B.Lib.Sc)",
      "stream": "arts",
      "duration": "1 year",
      "description": "Degree in library and information science for careers in libraries and information centers.",
      "careers": ["Librarian", "Archivist"],
      "higherStudies": ["M.Lib.Sc", "Ph.D"],
      "governmentExams": ["UGC NET", "SSC"]
    },
    {
      "id": 21,
      "name": "Bachelor of Hotel Management (BHM)",
      "stream": "hospitality",
      "duration": "3-4 years",
      "description": "Focuses on hospitality, tourism, and hotel operations including food service, housekeeping, and front office management.",
      "careers": ["Hotel Manager", "Chef", "Event Manager", "Tourism Officer"],
      "higherStudies": ["MHM", "MBA Hospitality"],
      "governmentExams": ["NCHM JEE", "UPSC Tourism Services"]
    },
    {
      "id": 22,
      "name": "Bachelor of Tourism Studies (BTS)",
      "stream": "hospitality",
      "duration": "3 years",
      "description": "Specializes in tourism industry, travel management, and tour operations.",
      "careers": ["Travel Consultant", "Tour Guide", "Airline Staff"],
      "higherStudies": ["MTS", "MBA Tourism"],
      "governmentExams": ["State Tourism Exams", "UPSC IRTS"]
    },
    {
      "id": 23,
      "name": "Bachelor of Design (B.Des)",
      "stream": "design",
      "duration": "4 years",
      "description": "Undergraduate design program in areas like fashion, industrial, graphic, and interior design.",
      "careers": ["Fashion Designer", "Interior Designer", "Product Designer"],
      "higherStudies": ["M.Des", "MBA Design"],
      "governmentExams": ["NIFT", "UCEED", "CEED"]
    },
    {
      "id": 24,
      "name": "Bachelor of Fashion Technology (B.FTech)",
      "stream": "design",
      "duration": "4 years",
      "description": "Focuses on garment manufacturing, apparel technology, and textile design.",
      "careers": ["Apparel Designer", "Fashion Technologist", "Merchandiser"],
      "higherStudies": ["M.FTech", "MBA Fashion"],
      "governmentExams": ["NIFT Entrance", "SSC Handloom/ Textile Exams"]
    },
    {
      "id": 25,
      "name": "Bachelor of Journalism and Mass Communication (BJMC)",
      "stream": "arts",
      "duration": "3 years",
      "description": "Professional program in media, journalism, and mass communication.",
      "careers": ["Journalist", "News Anchor", "Media Planner", "Public Relations Officer"],
      "higherStudies": ["MJMC", "MBA Media Management"],
      "governmentExams": ["UPSC IFS", "SSC CGL", "NET"]
    },
    {
      "id": 26,
      "name": "Bachelor of Physical Education (B.P.Ed)",
      "stream": "sports",
      "duration": "3-4 years",
      "description": "Degree in sports, physical training, and fitness.",
      "careers": ["Sports Coach", "Fitness Trainer", "PE Teacher"],
      "higherStudies": ["M.P.Ed", "Ph.D in Physical Education"],
      "governmentExams": ["NET Physical Education", "Sports Authority Exams"]
    },
    {
      "id": 27,
      "name": "Bachelor of Architecture (B.Arch)",
      "stream": "engineering",
      "duration": "5 years",
      "description": "Covers architecture, urban planning, and building design.",
      "careers": ["Architect", "Urban Planner", "Interior Designer"],
      "higherStudies": ["M.Arch", "Ph.D Architecture"],
      "governmentExams": ["NATA", "GATE Architecture", "UPSC CES"]
    },
    {
      "id": 28,
      "name": "Bachelor of Planning (B.Plan)",
      "stream": "engineering",
      "duration": "4 years",
      "description": "Specializes in urban and regional planning, environmental planning, and housing.",
      "careers": ["Urban Planner", "Transport Planner", "Town Planner"],
      "higherStudies": ["M.Plan", "MBA Urban Development"],
      "governmentExams": ["GATE Planning", "UPSC CES"]
    },
    {
      "id": 29,
      "name": "Bachelor of Agriculture (B.Sc Agriculture)",
      "stream": "science",
      "duration": "4 years",
      "description": "Degree in agricultural sciences covering crop production, soil science, and agronomy.",
      "careers": ["Agriculture Officer", "Agro Scientist", "Farm Manager"],
      "higherStudies": ["M.Sc Agriculture", "MBA Agri-Business"],
      "governmentExams": ["ICAR JRF", "State Agriculture Exams", "UPSC IFS"]
    },
    {
      "id": 30,
      "name": "Bachelor of Veterinary Science (B.V.Sc & AH)",
      "stream": "medical",
      "duration": "5 years",
      "description": "Focuses on veterinary medicine and animal husbandry.",
      "careers": ["Veterinary Doctor", "Animal Researcher"],
      "higherStudies": ["M.V.Sc", "Ph.D Veterinary"],
      "governmentExams": ["ICAR Exams", "UPSC CMS"]
    },
    {
      "id": 31,
      "name": "Bachelor of Fisheries Science (B.F.Sc)",
      "stream": "science",
      "duration": "4 years",
      "description": "Covers fishery science, aquaculture, and marine biology.",
      "careers": ["Fishery Scientist", "Marine Biologist"],
      "higherStudies": ["M.F.Sc", "Ph.D Fisheries"],
      "governmentExams": ["ICAR JRF Fisheries", "State Fisheries Dept Exams"]
    },
    {
      "id": 32,
      "name": "Bachelor of Forestry (B.Sc Forestry)",
      "stream": "science",
      "duration": "4 years",
      "description": "Degree in forestry, wildlife conservation, and forest management.",
      "careers": ["Forest Officer", "Wildlife Researcher"],
      "higherStudies": ["M.Sc Forestry", "Ph.D"],
      "governmentExams": ["Indian Forest Service (UPSC IFS)", "State Forest Exams"]
    },
    {
      "id": 33,
      "name": "Bachelor of Home Science (B.Sc Home Science)",
      "stream": "science",
      "duration": "3 years",
      "description": "Covers nutrition, child development, and family resource management.",
      "careers": ["Nutritionist", "Dietician", "Family Counselor"],
      "higherStudies": ["M.Sc Home Science", "MBA Nutrition"],
      "governmentExams": ["ICAR Exams", "State PSC"]
    },
    {
      "id": 34,
      "name": "Bachelor of Event Management (BEM)",
      "stream": "management",
      "duration": "3 years",
      "description": "Focuses on event planning, hospitality, and public relations.",
      "careers": ["Event Manager", "Wedding Planner", "Corporate Planner"],
      "higherStudies": ["MBA Event Management", "MHM"],
      "governmentExams": ["UPSC", "SSC CGL"]
    },
    {
      "id": 35,
      "name": "Bachelor of Aviation (B.Sc Aviation)",
      "stream": "aviation",
      "duration": "3 years",
      "description": "Covers aviation sciences, air traffic management, and flight safety.",
      "careers": ["Pilot", "Air Traffic Controller", "Aviation Manager"],
      "higherStudies": ["M.Sc Aviation", "MBA Aviation"],
      "governmentExams": ["DGCA Exams", "AFCAT"]
    },
    {
      "id": 36,
      "name": "Bachelor of Performing Arts (BPA)",
      "stream": "arts",
      "duration": "3 years",
      "description": "Degree in music, dance, drama, and performing arts.",
      "careers": ["Musician", "Actor", "Performer"],
      "higherStudies": ["MPA", "MFA"],
      "governmentExams": ["UGC NET Performing Arts"]
    },
    {
      "id": 37,
      "name": "Bachelor of Statistics (B.Stat)",
      "stream": "science",
      "duration": "3 years",
      "description": "Degree in statistical theory, applied statistics, and probability.",
      "careers": ["Statistician", "Data Analyst", "Actuary"],
      "higherStudies": ["M.Stat", "Ph.D Statistics"],
      "governmentExams": ["UPSC ISS", "SSC CGL", "CSIR NET"]
    },
    {
      "id": 38,
      "name": "Bachelor of Actuarial Science",
      "stream": "commerce",
      "duration": "3 years",
      "description": "Specialized degree in actuarial science, risk management, and insurance.",
      "careers": ["Actuary", "Risk Manager", "Insurance Analyst"],
      "higherStudies": ["M.Sc Actuarial Science", "MBA Finance"],
      "governmentExams": ["IAI Exams", "UPSC"]
    },
    {
      "id": 39,
      "name": "Bachelor of Culinary Arts",
      "stream": "hospitality",
      "duration": "3 years",
      "description": "Covers culinary techniques, food science, and kitchen management.",
      "careers": ["Chef", "Food Critic", "Restaurant Manager"],
      "higherStudies": ["M.Sc Culinary Arts", "MBA Hospitality"],
      "governmentExams": ["NCHMCT Exams", "FSSAI Recruitment"]
    },
    {
      "id": 40,
      "name": "Bachelor of Animation",
      "stream": "design",
      "duration": "3 years",
      "description": "Focuses on 2D/3D animation, VFX, and multimedia design.",
      "careers": ["Animator", "VFX Artist", "Game Designer"],
      "higherStudies": ["M.Sc Animation", "M.Des Multimedia"],
      "governmentExams": ["NID Entrance", "CEED"]
    },
    {
    "id": 41,
    "name": "Master of Arts (M.A.)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Postgraduate program in arts subjects such as History, Political Science, Sociology, English, etc.",
    "careers": ["Lecturer", "Researcher", "Civil Services", "Writer"],
    "higherStudies": ["M.Phil", "Ph.D"],
    "governmentExams": ["NET/SET", "UPSC Civil Services"]
  },
  {
    "id": 42,
    "name": "Master of Fine Arts (MFA)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Advanced degree in visual and performing arts such as painting, music, and theatre.",
    "careers": ["Artist", "Performer", "Art Director", "Animator"],
    "higherStudies": ["Ph.D Fine Arts"],
    "governmentExams": ["UGC NET", "SSC Arts Exams"]
  },
  {
    "id": 43,
    "name": "Master of Social Work (MSW)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Professional degree focusing on social work, community development, and social welfare.",
    "careers": ["NGO Manager", "Community Organizer", "Policy Analyst"],
    "higherStudies": ["Ph.D Social Work"],
    "governmentExams": ["NET", "UPSC Social Services"]
  },
  {
    "id": 44,
    "name": "Master of Science (M.Sc.)",
    "stream": "science",
    "duration": "2 years",
    "description": "Advanced studies in sciences including Physics, Chemistry, Mathematics, Biology, and Computer Science.",
    "careers": ["Research Scientist", "Professor", "Lab Specialist"],
    "higherStudies": ["Ph.D Science", "Post-Doctoral Studies"],
    "governmentExams": ["CSIR NET", "GATE", "UPSC Scientific Services"]
  },
  {
    "id": 45,
    "name": "Master of Computer Applications (MCA)",
    "stream": "science",
    "duration": "2 years",
    "description": "Professional degree in computer applications, software development, and IT management.",
    "careers": ["Software Engineer", "System Architect", "Database Administrator"],
    "higherStudies": ["Ph.D Computer Science"],
    "governmentExams": ["GATE CS", "UPSC", "Banking IT Specialist"]
  },
  {
    "id": 46,
    "name": "Master of Mathematics (M.Math.)",
    "stream": "science",
    "duration": "2 years",
    "description": "Advanced postgraduate degree in pure and applied mathematics.",
    "careers": ["Statistician", "Data Scientist", "Quantitative Analyst"],
    "higherStudies": ["Ph.D Mathematics"],
    "governmentExams": ["CSIR NET", "UPSC ISS"]
  },
  {
    "id": 47,
    "name": "Master of Technology (M.Tech)",
    "stream": "engineering",
    "duration": "2 years",
    "description": "Specialized engineering program with research and advanced technical focus.",
    "careers": ["Senior Engineer", "Research Scientist", "Consultant"],
    "higherStudies": ["Ph.D Engineering"],
    "governmentExams": ["GATE", "UPSC Engineering Services"]
  },
  {
    "id": 48,
    "name": "Master of Engineering (M.E.)",
    "stream": "engineering",
    "duration": "2 years",
    "description": "Advanced engineering program focusing on practical applications and innovations.",
    "careers": ["Engineer", "Project Manager", "Design Specialist"],
    "higherStudies": ["Ph.D Engineering"],
    "governmentExams": ["GATE", "DRDO/ISRO Recruitment"]
  },
  {
    "id": 49,
    "name": "Master of Business Administration (MBA)",
    "stream": "management",
    "duration": "2 years",
    "description": "Professional management degree focusing on business administration, finance, marketing, and leadership.",
    "careers": ["Manager", "Business Consultant", "Entrepreneur"],
    "higherStudies": ["Ph.D Management"],
    "governmentExams": ["CAT", "UPSC Civil Services", "Bank PO"]
  },
  {
    "id": 50,
    "name": "Master of Commerce (M.Com)",
    "stream": "commerce",
    "duration": "2 years",
    "description": "Postgraduate program focusing on advanced commerce, accounting, and finance studies.",
    "careers": ["Accountant", "Auditor", "Finance Officer"],
    "higherStudies": ["Ph.D Commerce"],
    "governmentExams": ["UPSC", "SSC CGL", "CA Exams"]
  },
  {
    "id": 51,
    "name": "Master of Economics (M.A. Economics)",
    "stream": "commerce",
    "duration": "2 years",
    "description": "Advanced economics degree focusing on microeconomics, macroeconomics, and econometrics.",
    "careers": ["Economist", "Policy Analyst", "Banking Researcher"],
    "higherStudies": ["Ph.D Economics"],
    "governmentExams": ["UPSC IES", "RBI Grade B"]
  },
  {
    "id": 52,
    "name": "Master of Law (LLM)",
    "stream": "law",
    "duration": "2 years",
    "description": "Postgraduate law degree specializing in constitutional, corporate, or international law.",
    "careers": ["Judge", "Corporate Lawyer", "Legal Advisor"],
    "higherStudies": ["Ph.D Law"],
    "governmentExams": ["Judicial Services", "UPSC Legal Officer Exams"]
  },
  {
    "id": 53,
    "name": "Doctor of Medicine (MD)",
    "stream": "medical",
    "duration": "3 years",
    "description": "Postgraduate medical degree specializing in non-surgical disciplines like pediatrics, general medicine, and psychiatry.",
    "careers": ["Doctor", "Specialist", "Medical Researcher"],
    "higherStudies": ["DM Super-Specialty", "Ph.D Medicine"],
    "governmentExams": ["NEET-PG", "AIIMS PG"]
  },
  {
    "id": 54,
    "name": "Master of Surgery (MS)",
    "stream": "medical",
    "duration": "3 years",
    "description": "Postgraduate medical degree specializing in surgical fields like orthopedics, ENT, ophthalmology, etc.",
    "careers": ["Surgeon", "Specialist Doctor"],
    "higherStudies": ["M.Ch Super-Specialty"],
    "governmentExams": ["NEET-PG", "AIIMS PG"]
  },
  {
    "id": 55,
    "name": "Master of Dental Surgery (MDS)",
    "stream": "medical",
    "duration": "3 years",
    "description": "Postgraduate degree in dental sciences specializing in oral surgery, prosthodontics, orthodontics.",
    "careers": ["Dental Surgeon", "Researcher"],
    "higherStudies": ["Ph.D Dentistry"],
    "governmentExams": ["NEET MDS", "AIIMS PG"]
  },
  {
    "id": 56,
    "name": "Master of Pharmacy (M.Pharm)",
    "stream": "medical",
    "duration": "2 years",
    "description": "Advanced studies in pharmacology, pharmaceutics, and clinical pharmacy.",
    "careers": ["Pharmaceutical Scientist", "Clinical Researcher"],
    "higherStudies": ["Ph.D Pharmacy"],
    "governmentExams": ["GPAT", "Drug Inspector Exams"]
  },
  {
    "id": 57,
    "name": "Master of Physiotherapy (MPT)",
    "stream": "medical",
    "duration": "2 years",
    "description": "Postgraduate degree specializing in physiotherapy and rehabilitation.",
    "careers": ["Physiotherapist", "Rehabilitation Specialist"],
    "higherStudies": ["Ph.D Physiotherapy"],
    "governmentExams": ["AIIMS Paramedical Exams"]
  },
  {
    "id": 58,
    "name": "Master of Nursing (M.Sc Nursing)",
    "stream": "medical",
    "duration": "2 years",
    "description": "Advanced program in nursing practice, research, and healthcare management.",
    "careers": ["Senior Nurse", "Clinical Instructor", "Healthcare Manager"],
    "higherStudies": ["Ph.D Nursing"],
    "governmentExams": ["AIIMS Nursing", "State PSC Nursing Exams"]
  },
  {
    "id": 59,
    "name": "Master of Education (M.Ed)",
    "stream": "education",
    "duration": "2 years",
    "description": "Advanced degree in pedagogy, curriculum development, and teacher training.",
    "careers": ["Professor of Education", "Education Consultant"],
    "higherStudies": ["Ph.D Education"],
    "governmentExams": ["NET Education", "CTET (for training roles)"]
  },
  {
    "id": 60,
    "name": "Master of Library Science (M.Lib.Sc)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Postgraduate degree in library management and information science.",
    "careers": ["Librarian", "Archivist", "Documentation Officer"],
    "higherStudies": ["Ph.D Library Science"],
    "governmentExams": ["UGC NET", "SSC Library Recruitment"]
  },
  {
    "id": 61,
    "name": "Master of Design (M.Des)",
    "stream": "design",
    "duration": "2 years",
    "description": "Postgraduate degree in design with specializations like product design, fashion design, graphic design, and UX/UI.",
    "careers": ["Product Designer", "UX/UI Designer", "Design Consultant"],
    "higherStudies": ["Ph.D Design"],
    "governmentExams": ["CEED", "NID PG Entrance"]
  },
  {
    "id": 62,
    "name": "Master of Journalism and Mass Communication (MJMC)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Advanced degree in journalism, media studies, and communication strategies.",
    "careers": ["Journalist", "Editor", "Media Planner", "Public Relations Manager"],
    "higherStudies": ["Ph.D Journalism", "M.Phil"],
    "governmentExams": ["UGC NET Journalism", "UPSC IFS (Information Service)"]
  },
  {
    "id": 63,
    "name": "Master of Physical Education (M.P.Ed)",
    "stream": "sports",
    "duration": "2 years",
    "description": "Postgraduate degree in physical education, sports training, and kinesiology.",
    "careers": ["Sports Coach", "PE Lecturer", "Rehabilitation Specialist"],
    "higherStudies": ["Ph.D Physical Education"],
    "governmentExams": ["UGC NET Physical Education", "Sports Authority Recruitment"]
  },
  {
    "id": 64,
    "name": "Master of Architecture (M.Arch)",
    "stream": "engineering",
    "duration": "2 years",
    "description": "Advanced degree in architectural design, planning, and urban studies.",
    "careers": ["Architect", "Urban Designer", "Sustainable Planner"],
    "higherStudies": ["Ph.D Architecture"],
    "governmentExams": ["GATE Architecture", "UPSC CES"]
  },
  {
    "id": 65,
    "name": "Master of Planning (M.Plan)",
    "stream": "engineering",
    "duration": "2 years",
    "description": "Postgraduate program in urban planning, housing, and transportation planning.",
    "careers": ["Urban Planner", "Transport Consultant", "Housing Policy Advisor"],
    "higherStudies": ["Ph.D Planning"],
    "governmentExams": ["GATE Planning", "Town Planning Services Exams"]
  },
  {
    "id": 66,
    "name": "Master of Agriculture (M.Sc Agriculture)",
    "stream": "science",
    "duration": "2 years",
    "description": "Advanced degree in agricultural sciences covering agronomy, soil science, and plant breeding.",
    "careers": ["Agricultural Scientist", "Agri-Consultant", "Farm Manager"],
    "higherStudies": ["Ph.D Agriculture"],
    "governmentExams": ["ICAR Exams", "UPSC IFS"]
  },
  {
    "id": 67,
    "name": "Master of Veterinary Science (M.V.Sc)",
    "stream": "medical",
    "duration": "2 years",
    "description": "Specializes in veterinary medicine, surgery, and animal husbandry.",
    "careers": ["Veterinary Surgeon", "Animal Research Scientist"],
    "higherStudies": ["Ph.D Veterinary Science"],
    "governmentExams": ["ICAR JRF/SRF", "UPSC CMS"]
  },
  {
    "id": 68,
    "name": "Master of Fisheries Science (M.F.Sc)",
    "stream": "science",
    "duration": "2 years",
    "description": "Advanced studies in aquaculture, fishery management, and marine sciences.",
    "careers": ["Fishery Officer", "Marine Scientist", "Aquaculture Specialist"],
    "higherStudies": ["Ph.D Fisheries"],
    "governmentExams": ["ICAR Exams", "State Fisheries Department Exams"]
  },
  {
    "id": 69,
    "name": "Master of Forestry (M.Sc Forestry)",
    "stream": "science",
    "duration": "2 years",
    "description": "Postgraduate degree in forestry, wildlife conservation, and forest management.",
    "careers": ["Forest Officer", "Wildlife Biologist"],
    "higherStudies": ["Ph.D Forestry"],
    "governmentExams": ["UPSC IFS", "State Forest Service"]
  },
  {
    "id": 70,
    "name": "Master of Home Science (M.Sc Home Science)",
    "stream": "science",
    "duration": "2 years",
    "description": "Advanced studies in nutrition, food science, and family resource management.",
    "careers": ["Nutritionist", "Dietitian", "Researcher"],
    "higherStudies": ["Ph.D Home Science"],
    "governmentExams": ["ICAR Exams", "SSC Food Safety Exams"]
  },
  {
    "id": 71,
    "name": "Master of Hotel Management (MHM)",
    "stream": "hospitality",
    "duration": "2 years",
    "description": "Advanced hospitality program in hotel management, tourism, and catering.",
    "careers": ["Hotel Manager", "Operations Head", "Tourism Planner"],
    "higherStudies": ["Ph.D Hospitality"],
    "governmentExams": ["NCHMCT JEE PG", "UPSC Tourism Services"]
  },
  {
    "id": 72,
    "name": "Master of Tourism Management (MTM)",
    "stream": "hospitality",
    "duration": "2 years",
    "description": "Postgraduate degree in tourism planning, travel consultancy, and cultural heritage management.",
    "careers": ["Tourism Consultant", "Travel Manager"],
    "higherStudies": ["Ph.D Tourism"],
    "governmentExams": ["State Tourism Exams", "UPSC IRTS"]
  },
  {
    "id": 73,
    "name": "Master of Event Management (MEM)",
    "stream": "management",
    "duration": "2 years",
    "description": "Focuses on advanced event planning, corporate event management, and hospitality.",
    "careers": ["Event Director", "Corporate Planner"],
    "higherStudies": ["Ph.D Event Management"],
    "governmentExams": ["UPSC", "SSC CGL"]
  },
  {
    "id": 74,
    "name": "Master of Aviation (M.Sc Aviation)",
    "stream": "aviation",
    "duration": "2 years",
    "description": "Advanced degree in aviation sciences, safety, and air traffic control.",
    "careers": ["Aviation Consultant", "Air Traffic Supervisor"],
    "higherStudies": ["Ph.D Aviation"],
    "governmentExams": ["DGCA Exams", "AFCAT"]
  },
  {
    "id": 75,
    "name": "Master of Performing Arts (MPA)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Postgraduate program in music, dance, theatre, and performing arts.",
    "careers": ["Performer", "Professor of Performing Arts"],
    "higherStudies": ["Ph.D Performing Arts"],
    "governmentExams": ["UGC NET Performing Arts"]
  },
  {
    "id": 76,
    "name": "Master of Statistics (M.Stat)",
    "stream": "science",
    "duration": "2 years",
    "description": "Advanced studies in statistical theory, probability, and applied data science.",
    "careers": ["Statistician", "Data Scientist", "Actuary"],
    "higherStudies": ["Ph.D Statistics"],
    "governmentExams": ["UPSC ISS", "CSIR NET", "SSC CGL"]
  },
  {
    "id": 77,
    "name": "Master of Actuarial Science",
    "stream": "commerce",
    "duration": "2 years",
    "description": "Postgraduate program in actuarial studies, risk management, and financial modeling.",
    "careers": ["Actuary", "Risk Analyst", "Insurance Consultant"],
    "higherStudies": ["Ph.D Actuarial Science"],
    "governmentExams": ["IAI Exams", "UPSC"]
  },
  {
    "id": 78,
    "name": "Master of Culinary Arts",
    "stream": "hospitality",
    "duration": "2 years",
    "description": "Advanced culinary program covering gastronomy, food research, and kitchen management.",
    "careers": ["Executive Chef", "Food Scientist"],
    "higherStudies": ["Ph.D Culinary Arts"],
    "governmentExams": ["FSSAI Recruitment", "NCHMCT Exams"]
  },
  {
    "id": 79,
    "name": "Master of Animation",
    "stream": "design",
    "duration": "2 years",
    "description": "Specializes in 2D/3D animation, multimedia, and visual effects.",
    "careers": ["Animation Director", "VFX Supervisor", "Game Developer"],
    "higherStudies": ["Ph.D Animation"],
    "governmentExams": ["NID PG Entrance", "CEED"]
  },
  {
    "id": 80,
    "name": "Master of Public Administration (MPA)",
    "stream": "arts",
    "duration": "2 years",
    "description": "Specializes in governance, public policy, and administrative services.",
    "careers": ["Policy Analyst", "Public Administrator", "Civil Services"],
    "higherStudies": ["Ph.D Public Administration"],
    "governmentExams": ["UPSC Civil Services", "State PSC"]
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