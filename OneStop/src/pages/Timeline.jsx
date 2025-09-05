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
} from "@heroicons/react/24/outline";

function Timeline() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', type: 'admission' });
  const [filter, setFilter] = useState('all');

  // Event types
  const eventTypes = [
    { id: 'admission', label: 'Admission Dates', color: 'blue', icon: <BuildingLibraryIcon className="h-5 w-5" /> },
    { id: 'scholarship', label: 'Scholarship Deadlines', color: 'green', icon: <CurrencyRupeeIcon className="h-5 w-5" /> },
    { id: 'exam', label: 'Entrance Exams', color: 'red', icon: <AcademicCapIcon className="h-5 w-5" /> },
    { id: 'counseling', label: 'Counseling Sessions', color: 'purple', icon: <UserGroupIcon className="h-5 w-5" /> }
  ];

  // Demo data
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

    const event = {
      id: Date.now(),
      ...newEvent
    };
    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', date: '', description: '', type: 'admission' });
  };

  const sortedEvents = [...events].sort((a,b) => new Date(a.date) - new Date(b.date));
  const filteredEvents = filter === 'all' ? sortedEvents : sortedEvents.filter(e => e.type === filter);

  const formatDate = dateStr => new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month:'long', day:'numeric' });

  const cardVariants = {
    offscreen: { opacity: 0, y: 30, scale: 0.9 },
    onscreen: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: 'spring' } }
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[48rem] h-[48rem] bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full opacity-20 blur-3xl animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3 text-white">
            <CalendarDaysIcon className="h-10 w-10" />
            Timeline Tracker
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Stay updated with key academic dates: admissions, scholarships, entrance exams and counseling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events list */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 overflow-auto max-h-[600px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                <ListBulletIcon className="h-6 w-6" />
                Upcoming Events
              </h2>
              <select
                className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
              <p className="text-center text-white/70 py-20">No events found for selected filter.</p>
            ) : (
              filteredEvents.map(event => (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-white/5 rounded-md p-4 mb-4 shadow-md cursor-pointer hover:bg-white/10 transition"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-${event.type === 'admission' ? 'blue' : event.type === 'scholarship' ? 'green' : event.type === 'exam' ? 'red' : 'purple'}-500/50`}>
                      {eventTypes.find(t => t.id === event.type)?.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                      <time className="text-white/70 text-sm">{formatDate(event.date)}</time>
                    </div>
                  </div>
                  <p className="mt-2 text-white/80 pl-11">{event.description}</p>
                  <span className={`inline-block mt-2 ml-11 px-2 py-1 rounded bg-${event.type === 'admission' ? 'blue' : event.type === 'scholarship' ? 'green' : event.type === 'exam' ? 'red' : 'purple'}-600/50 text-xs`}>
                    {eventTypes.find(t => t.id === event.type)?.label}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          {/* Add Event form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
              <PlusCircleIcon className="h-6 w-6" />
              Add New Event
            </h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block mb-1 text-white/80">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-white/80">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-white/80">Type</label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-white/80">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 py-2 rounded text-white font-semibold hover:opacity-90 transition"
              >
                <PlusCircleIcon className="h-5 w-5" />
                Add Event
              </button>
            </form>
            <div className="mt-6 text-white/70">
              <h3 className="font-semibold mb-2 text-white/90">Why Track Important Dates?</h3>
              <ul className="list-disc list-inside space-y-1">
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
