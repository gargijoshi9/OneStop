import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  PlusCircleIcon,
  ListBulletIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

function Timeline() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', type: 'admission' });
  const [filter, setFilter] = useState('all');

  // Event types
  const eventTypes = [
    { id: 'admission', label: 'Admission Dates', color: 'from-blue-400 to-blue-600', icon: <BuildingLibraryIcon className="h-5 w-5" /> },
    { id: 'scholarship', label: 'Scholarship Deadlines', color: 'from-green-400 to-green-600', icon: <CurrencyRupeeIcon className="h-5 w-5" /> },
    { id: 'exam', label: 'Entrance Exams', color: 'from-pink-500 to-red-500', icon: <AcademicCapIcon className="h-5 w-5" /> },
    { id: 'counseling', label: 'Counseling Sessions', color: 'from-purple-500 to-indigo-700', icon: <UserGroupIcon className="h-5 w-5" /> }
  ];

  useEffect(() => {
    const demoEvents = [
      {
        id: 1,
        title: 'Delhi University Admissions Begin',
        date: '2025-06-15',
        description: 'Online application process starts for all undergraduate courses',
        type: 'admission'
      },
      {
        id: 2,
        title: 'National Scholarship Portal Opens',
        date: '2025-07-01',
        description: 'Apply for various government scholarships for higher education',
        type: 'scholarship'
      },
      {
        id: 3,
        title: 'JEE Main April Session',
        date: '2025-04-10',
        description: 'Joint Entrance Examination for engineering admissions',
        type: 'exam'
      },
      {
        id: 4,
        title: 'Career Counseling Workshop',
        date: '2025-05-20',
        description: 'Free workshop at City Community Center for Class 12 students',
        type: 'counseling'
      },
      {
        id: 5,
        title: 'Mumbai University Registration Deadline',
        date: '2025-06-30',
        description: 'Last date to apply for undergraduate programs',
        type: 'admission'
      },
      {
        id: 6,
        title: 'NEET Exam Date',
        date: '2025-05-05',
        description: 'National Eligibility cum Entrance Test for medical courses',
        type: 'exam'
      }
    ];
    setEvents(demoEvents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    const event = { id: Date.now(), ...newEvent };
    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', date: '', description: '', type: 'admission' });
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  const filteredEvents = filter === 'all' ? sortedEvents : sortedEvents.filter(e => e.type === filter);
  const formatDate = dateStr => new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month:'long', day:'numeric' });

  const cardVariants = {
    offscreen: { opacity: 0, y: 32, scale: 0.96 },
    onscreen: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring' } }
  };

  return (
<div className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-[#180316]">
  <div className="relative z-10 max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
   {/* Animated glassy gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[38rem] h-[38rem] bg-gradient-to-br from-violet-700 to-blue-400 rounded-full opacity-25 blur-3xl"
          animate={{
            x: [0, 40, 0, -20, 0],
            y: [0, -60, 40, 60, 0],
            scale: [1, 1.06, 1, 0.9, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[38rem] h-[38rem] bg-gradient-to-br from-pink-500 to-purple-800 rounded-full opacity-25 blur-3xl"
          animate={{
            x: [0, -60, 40, 20, 0],
            y: [0, 60, -40, -60, 0],
            scale: [1, 1.08, 1, 1.1, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="flex items-center justify-center gap-3 text-5xl font-bold mb-4 text-white drop-shadow-xl">
            <CalendarDaysIcon className="h-10 w-10 text-blue-400" />
            Timeline Tracker
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay updated with admission, scholarship, exam, and counseling dates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
                <ListBulletIcon className="h-6 w-6" />
                Upcoming Events
              </h2>
              <select
                className="bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <option value="all">All Events</option>
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            {filteredEvents.length === 0 ? (
              <div className="bg-pink-900/30 border border-pink-700/30 p-6 rounded-xl text-center text-pink-200 flex items-center justify-center gap-3">
                <InformationCircleIcon className="h-6 w-6" />
                No events found for selected filter.
              </div>
            ) : (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1">
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className={`rounded-xl bg-black/50 border border-white/10 shadow-lg shadow-purple-500/10 px-6 py-5 flex flex-col transition-all duration-300 hover:shadow-lg hover:border-purple-400/40 hover:shadow-purple-500/20
                    `}
                  >
                    <div className="flex items-center gap-4 mb-1">
                      <span className={`w-10 h-10 rounded-full grid place-items-center bg-gradient-to-br ${eventTypes.find(t => t.id === event.type).color}`}>
                        {eventTypes.find(t => t.id === event.type)?.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                        <time className="text-sm text-gray-400">{formatDate(event.date)}</time>
                      </div>
                      <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-2xl border border-white/20 text-white">
                        {eventTypes.find(t => t.id === event.type).label}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-2">{event.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Add Event Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-white">
              <PlusCircleIcon className="h-6 w-6 text-white" />
              Add New Event
            </h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-white/80">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white/80">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white/80">Type</label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1 text-white/80">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-800 transition"
              >
                Add Event
              </button>
            </form>

            <div className="mt-8 text-white/70">
              <h3 className="font-semibold mb-2">Why Track Important Dates?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Never miss application deadlines</li>
                <li>Plan your preparation for entrance exams</li>
                <li>Stay updated on scholarship opportunities</li>
                <li>Schedule counseling sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
