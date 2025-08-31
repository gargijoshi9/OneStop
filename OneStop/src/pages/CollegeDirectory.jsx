import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock college data with latitudes and longitudes
const collegeData = [
  {
    id: 1,
    name: "Delhi University",
    location: "Delhi, Delhi",
    courses: ["B.A.", "B.Sc.", "B.Com", "BBA", "B.Tech"],
    type: "Public",
    rating: 4.5,
    fees: "₹15,000 - ₹50,000 per year",
    ranking: "NIRF Rank: #6",
    website: "http://www.du.ac.in",
    description:
      "The University of Delhi is a premier university in India and is known for its high standards in teaching and research.",
    lat: 28.6129,
    lng: 77.2295,
  },
  {
    id: 2,
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.8,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #3",
    website: "http://www.iitb.ac.in",
    description:
      "IIT Bombay is renowned for its four-year undergraduate program in engineering.",
    lat: 19.1334,
    lng: 72.9133,
  },
  {
    id: 3,
    name: "St. Xavier's College",
    location: "Mumbai, Maharashtra",
    courses: ["B.A.", "B.Sc.", "B.Com", "BMS"],
    type: "Private",
    rating: 4.3,
    fees: "₹50,000 - ₹1,00,000 per year",
    ranking: "NIRF Rank: #24",
    website: "http://www.xaviers.edu",
    description:
      "St. Xavier's College is one of the oldest colleges in Mumbai and is known for its liberal arts and science programs.",
    lat: 18.9432,
    lng: 72.8326,
  },
  {
    id: 4,
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    courses: ["B.E.", "B.Tech", "M.E.", "M.Tech"],
    type: "Public",
    rating: 4.2,
    fees: "₹25,000 - ₹75,000 per year",
    ranking: "NIRF Rank: #15",
    website: "http://www.annauniv.edu",
    description:
      "Anna University is a public technical university located in Tamil Nadu, specializing in engineering and technology.",
    lat: 13.0108,
    lng: 80.2354,
  },
  {
    id: 5,
    name: "Manipal Academy of Higher Education",
    location: "Manipal, Karnataka",
    courses: ["MBBS", "BDS", "B.Tech", "BBA", "B.Pharm"],
    type: "Private",
    rating: 4.4,
    fees: "₹3,50,000 - ₹15,00,000 per year",
    ranking: "NIRF Rank: #9",
    website: "http://www.manipal.edu",
    description:
      "Manipal Academy of Higher Education is a deemed university focusing on medical, engineering, and management education.",
    lat: 13.349,
    lng: 74.7856,
  },
  {
    id: 6,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    courses: ["B.E.", "B.Pharm", "M.E.", "MBA"],
    type: "Private",
    rating: 4.7,
    fees: "₹1,75,000 per year",
    ranking: "NIRF Rank: #12",
    website: "http://www.bits-pilani.ac.in",
    description:
      "BITS Pilani is a private institute of higher education and a deemed university that focuses on engineering and sciences.",
    lat: 28.3588,
    lng: 75.588,
  },
  {
    id: 7,
    name: "Christ University",
    location: "Bangalore, Karnataka",
    courses: ["B.A.", "B.Com", "BBA", "B.Tech", "B.Sc."],
    type: "Private",
    rating: 4.3,
    fees: "₹60,000 - ₹1,50,000 per year",
    ranking: "NIRF Rank: #19",
    website: "http://www.christuniversity.in",
    description:
      "Christ University is a private, deemed university known for its quality education in various disciplines.",
    lat: 12.9345,
    lng: 77.6064,
  },
  {
    id: 8,
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    courses: ["B.E.", "B.A.", "B.Sc.", "M.E.", "M.A."],
    type: "Public",
    rating: 4.4,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #11",
    website: "http://www.jadavpur.edu",
    description:
      "Jadavpur University is a public research university located in Kolkata, known for engineering and arts programs.",
    lat: 22.4989,
    lng: 88.3714,
  },
];

function CollegeDirectory() {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    course: "",
    type: "all",
  });
  const [selectedCollege, setSelectedCollege] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // New state for user's location
  const [userLocation, setUserLocation] = useState(null);
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Haversine formula to calculate distance between two lat/lng points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Effect to fetch mock college data
  useEffect(() => {
    setTimeout(() => {
      setColleges(collegeData);
      setFilteredColleges(collegeData);
      setLoading(false);
    }, 1000);
  }, []);

  // Effect to initialize the Leaflet map
  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center on India

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Effect to update markers when filtered colleges or user location changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add user location marker if available
    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup("Your Location")
        .openPopup();
      markersRef.current.push(userMarker);
      mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 10);
    }

    // Add new markers for the filtered colleges
    filteredColleges.forEach((college) => {
      const marker = L.marker([college.lat, college.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>${college.name}</b><br>${college.location}`);

      marker.on("click", () => {
        setSelectedCollege(college);
        mapInstanceRef.current.flyTo([college.lat, college.lng], 12);
      });

      markersRef.current.push(marker);
    });
  }, [filteredColleges, userLocation]);

  // Function to handle getting user's location
  const findNearbyColleges = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsFindingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsFindingLocation(false);
      },
      (error) => {
        setIsFindingLocation(false);
        setLocationError(
          "Unable to retrieve your location. Please check your browser settings."
        );
        console.error("Geolocation error:", error);
      }
    );
  };

  // Filter colleges based on user selections and proximity
  useEffect(() => {
    let result = [...colleges];

    // Filter by location text
    if (filters.location) {
      result = result.filter((college) =>
        college.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by course
    if (filters.course) {
      result = result.filter((college) =>
        college.courses.some((course) =>
          course.toLowerCase().includes(filters.course.toLowerCase())
        )
      );
    }

    // Filter by type
    if (filters.type !== "all") {
      result = result.filter((college) => college.type === filters.type);
    }

    // Filter by proximity if user location is available
    if (userLocation) {
      const maxDistance = 50; // Max distance in km to be considered "nearby"
      result = result
        .map((college) => ({
          ...college,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            college.lat,
            college.lng
          ),
        }))
        .filter((college) => college.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
    }

    setFilteredColleges(result);
  }, [filters, colleges, userLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          College Directory
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore top colleges and universities based on your location, course
          preferences, and more
        </p>
      </div>

      {/* Filters and Find Nearby Button */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="City or State"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={filters.course}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, course: e.target.value }))
              }
              placeholder="B.Tech, BBA, B.Sc, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Institution Type
            </label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <button
            onClick={findNearbyColleges}
            disabled={isFindingLocation}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isFindingLocation ? "Finding..." : "Find Nearby Colleges"}
          </button>
        </div>
        {locationError && (
          <p className="mt-2 text-red-500 text-sm">{locationError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* College List */}
        <div className="lg:col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Colleges ({filteredColleges.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading colleges...</p>
            </div>
          ) : filteredColleges.length > 0 ? (
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredColleges.map((college) => (
                <div
                  key={college.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedCollege?.id === college.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedCollege(college)}
                >
                  <div className="flex items-start">
                    <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md">
                      <span className="text-lg font-bold text-gray-600">
                        {college.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {college.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {college.location}
                      </p>
                      {userLocation && college.distance !== undefined && (
                        <p className="text-xs text-gray-400 mt-1">
                          {college.distance.toFixed(2)} km away
                        </p>
                      )}
                      <div className="mt-1 flex items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {college.rating}
                        </span>
                        <div className="flex text-yellow-400 ml-1">
                          {[...Array(Math.floor(college.rating))].map(
                            (_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )
                          )}
                          {college.rating % 1 !== 0 && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                No colleges found matching your filters.
              </p>
              <button
                onClick={() => {
                  setFilters({ location: "", course: "", type: "all" });
                  setUserLocation(null);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Map and College Details */}
        <div className="lg:col-span-2">
          {/* OpenStreetMap */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                College Locations
              </h2>
            </div>
            <div ref={mapRef} className="h-[400px] bg-gray-100"></div>
          </div>

          {/* Selected College Details */}
          {selectedCollege ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  College Details
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-2xl font-bold text-gray-600">
                      {selectedCollege.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedCollege.name}
                    </h3>
                    <p className="text-gray-600">{selectedCollege.location}</p>
                    <div className="mt-2 flex items-center">
                      <span className="font-medium text-gray-700">
                        {selectedCollege.rating}
                      </span>
                      <div className="flex text-yellow-400 ml-1">
                        {[...Array(Math.floor(selectedCollege.rating))].map(
                          (_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )
                        )}
                        {selectedCollege.rating % 1 !== 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="text-gray-700">{selectedCollege.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Type
                      </h4>
                      <p className="mt-1">{selectedCollege.type}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Ranking
                      </h4>
                      <p className="mt-1">{selectedCollege.ranking}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Fees Structure
                      </h4>
                      <p className="mt-1">{selectedCollege.fees}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Website
                      </h4>
                      <p className="mt-1">
                        <a href="#" className="text-blue-600 hover:underline">
                          {selectedCollege.website}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Available Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollege.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Apply Now
                    </a>
                    <a
                      href="#"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Download Brochure
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-8 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Select a College
                </h3>
                <p className="mt-1 text-gray-500">
                  Click on a college from the list to view detailed information
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollegeDirectory;
