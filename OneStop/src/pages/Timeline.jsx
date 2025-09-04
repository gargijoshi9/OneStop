import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function Timeline() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', type: 'admission' });
  const [filter, setFilter] = useState('all');

  // Event types
  const eventTypes = [
    { id: 'admission', label: 'Admission Dates', color: 'blue' },
    { id: 'scholarship', label: 'Scholarship Deadlines', color: 'green' },
    { id: 'exam', label: 'Entrance Exams', color: 'red' },
    { id: 'counseling', label: 'Counseling Sessions', color: 'purple' }
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
    <div className="min-h-screen bg-black text-white px-6 py-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Timeline Tracker</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Stay updated with key academic dates: admissions, scholarships, entrance exams and counseling.
          </p>
        </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events list */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg shadow-md p-6 overflow-auto max-h-[600px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <select
                className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              <p className="text-center text-gray-500 py-20">No events found for selected filter.</p>
            ) : (
              filteredEvents.map(event => (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-gray-800 rounded-md p-4 mb-4 shadow-md cursor-pointer hover:bg-gray-700 transition"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-4 h-4 rounded-full bg-${event.type === 'admission' ? 'blue' : event.type === 'scholarship' ? 'green' : event.type === 'exam' ? 'red' : 'purple'}-500`}></span>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <time className="ml-auto text-gray-400">{formatDate(event.date)}</time>
                  </div>
                  <p className="mt-2 text-gray-300">{event.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded bg-${event.type === 'admission' ? 'blue' : event.type === 'scholarship' ? 'green' : event.type === 'exam' ? 'red' : 'purple'}-600 text-xs`}>
                    {eventTypes.find(t => t.id === event.type)?.label}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          {/* Add Event form */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 py-2 rounded text-white font-semibold hover:bg-blue-700 transition"
              >
                Add Event
              </button>
            </form>
            <div className="mt-6 text-gray-400">
              <h3 className="font-semibold mb-2">Why Track Important Dates?</h3>
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
  );
}

export default Timeline;
