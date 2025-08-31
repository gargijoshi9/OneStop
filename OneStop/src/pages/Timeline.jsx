import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
  
  // Demo data - in a real app, this would come from a database
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
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newEvent.title || !newEvent.date) {
      return;
    }
    
    // Add new event
    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      type: newEvent.type
    };
    
    setEvents([...events, event]);
    
    // Reset form
    setNewEvent({ title: '', date: '', description: '', type: 'admission' });
  };
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Filter events by type
  const filteredEvents = filter === 'all' 
    ? sortedEvents 
    : sortedEvents.filter(event => event.type === filter);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Timeline Tracker</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay informed about important dates for admissions, scholarships, entrance exams, and counseling sessions
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Events Section */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
              
              <div>
                <select
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Events</option>
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className={`mt-1 h-4 w-4 rounded-full bg-${event.type === 'admission' ? 'blue' : event.type === 'scholarship' ? 'green' : event.type === 'exam' ? 'red' : 'purple'}-500 flex-shrink-0`}></div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                          <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                        </div>
                        <p className="mt-1 text-gray-600">{event.description}</p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.type === 'admission' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'scholarship' ? 'bg-green-100 text-green-800' :
                            event.type === 'exam' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {eventTypes.find(t => t.id === event.type)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No events found for the selected filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Add Event Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Event</h2>
            </div>
            
            <div className="p-4">
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
                  <select
                    id="type"
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Event
                </button>
              </form>
            </div>
            
            {/* Calendar Tips */}
            <div className="bg-blue-50 p-4 border-t border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Why Track Important Dates?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Never miss application deadlines</li>
                <li>• Plan your preparation for entrance exams</li>
                <li>• Stay updated on scholarship opportunities</li>
                <li>• Schedule counseling sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;