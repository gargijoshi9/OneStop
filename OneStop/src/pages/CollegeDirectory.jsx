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
    lng: 77.2295
  },
  {
    id: 2,
    name: "Indian Institute of Technology Bombay",
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
    lng: 72.9133
  },
  {
    id: 3,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.7,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #1",
    website: "http://www.iitd.ac.in",
    description:
      "IIT Delhi is one of India’s top engineering institutions, offering cutting-edge education and research in technology.",
    lat: 28.545955,
    lng: 77.18614
  },
  {
    id: 4,
    name: "Indian Institute of Technology Madras",
    location: "Chennai, Tamil Nadu",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.8,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #2",
    website: "http://www.iitm.ac.in",
    description:
      "IIT Madras is a leading public technical institute known for excellence in engineering and research.",
    lat: 12.994745,
    lng: 80.233408
  },
  {
    id: 5,
    name: "Indian Institute of Technology Kharagpur",
    location: "Kharagpur, West Bengal",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.6,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #7",
    website: "http://www.iitkgp.ac.in",
    description:
      "IIT Kharagpur is the oldest IIT, offering comprehensive engineering and technology programs.",
    lat: 22.314544,
    lng: 87.309068
  },
  {
    id: 6,
    name: "Indian Institute of Technology Kanpur",
    location: "Kanpur, Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.7,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #5",
    website: "http://www.iitk.ac.in",
    description:
      "IIT Kanpur is a premier institute known for its innovative teaching and strong research output in engineering.",
    lat: 26.512339,
    lng: 80.2329
  },
  {
    id: 7,
    name: "Indian Institute of Technology Roorkee",
    location: "Roorkee, Uttarakhand",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.6,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #8",
    website: "http://www.iitr.ac.in",
    description:
      "IIT Roorkee (formerly University of Roorkee) is among the oldest technical institutions in Asia, specializing in engineering and applied sciences.",
    lat: 29.8667,
    lng: 77.8978
  },
  {
    id: 8,
    name: "Indian Institute of Technology Guwahati",
    location: "Guwahati, Assam",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #9",
    website: "http://www.iitg.ac.in",
    description:
      "IIT Guwahati is known for its scenic campus and strong programs in engineering and technology in the North-East region.",
    lat: 26.187222,
    lng: 91.691667
  },
  {
    id: 9,
    name: "Indian Institute of Technology Hyderabad",
    location: "Hyderabad, Telangana",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #14",
    website: "http://www.iith.ac.in",
    description:
      "IIT Hyderabad is a newer generation IIT that excels in research and innovation in engineering fields.",
    lat: 17.59,
    lng: 78.121
  },
  {
    id: 10,
    name: "Indian Institute of Technology (ISM) Dhanbad",
    location: "Dhanbad, Jharkhand",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #18",
    website: "http://www.iitism.ac.in",
    description:
      "Formerly the Indian School of Mines, IIT (ISM) Dhanbad is a prestigious institute focusing on engineering, earth sciences, and mining technology.",
    lat: 23.8137,
    lng: 86.4398
  },
  {
    id: 11,
    name: "National Institute of Technology Tiruchirappalli",
    location: "Tiruchirappalli, Tamil Nadu",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.6,
    fees: "₹1,50,000 per year",
    ranking: "NIRF Rank: #12",
    website: "http://www.nitt.edu",
    description:
      "NIT Trichy is one of India's top NITs, offering high-quality engineering and technology programs.",
    lat: 10.677,
    lng: 78.742
  },
  {
    id: 12,
    name: "National Institute of Technology Karnataka, Surathkal",
    location: "Surathkal, Karnataka",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #13",
    website: "http://www.nitk.ac.in",
    description:
      "NIT Surathkal is a premier engineering institute located on the coast of Karnataka, known for its strong technical education.",
    lat: 13.0108,
    lng: 74.7923
  },
  {
    id: 13,
    name: "National Institute of Technology Warangal",
    location: "Warangal, Telangana",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #14",
    website: "http://www.nitw.ac.in",
    description:
      "NIT Warangal is a leading technical institute in Telangana, offering programs in engineering and technology since 1959.",
    lat: 17.9805,
    lng: 79.5301
  },
  {
    id: 14,
    name: "National Institute of Technology Calicut",
    location: "Kozhikode, Kerala",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #16",
    website: "http://www.nitc.ac.in",
    description:
      "NIT Calicut is a public technical university in Kerala, known for its engineering and architecture programs.",
    lat: 11.3217,
    lng: 75.9345
  },
  {
    id: 15,
    name: "National Institute of Technology Rourkela",
    location: "Rourkela, Odisha",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #17",
    website: "http://www.nitrkl.ac.in",
    description:
      "NIT Rourkela is an Institute of National Importance in Odisha, widely recognized for its engineering and research excellence.",
    lat: 22.2535,
    lng: 84.9049
  },
  {
    id: 16,
    name: "Visvesvaraya National Institute of Technology Nagpur",
    location: "Nagpur, Maharashtra",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #20",
    website: "http://www.vnit.ac.in",
    description:
      "VNIT Nagpur (formerly VRCE) is a public engineering institute in Maharashtra, known for its programs in engineering and architecture.",
    lat: 21.145,
    lng: 79.089
  },
  {
    id: 17,
    name: "Motilal Nehru National Institute of Technology Allahabad",
    location: "Prayagraj, Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #21",
    website: "http://www.mnnit.ac.in",
    description:
      "MNNIT Allahabad is a notable engineering institute offering undergraduate to doctoral programs in engineering, sciences, and management.",
    lat: 25.492,
    lng: 81.863
  },
  {
    id: 18,
    name: "National Institute of Technology Silchar",
    location: "Silchar, Assam",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹1,00,000 per year",
    ranking: "NIRF Rank: #14",
    website: "http://www.nits.ac.in",
    description:
      "NIT Silchar is a prominent technical institute in North-East India, providing quality engineering education and research.",
    lat: 24.75,
    lng: 92.79
  },
  {
    id: 19,
    name: "National Institute of Technology Srinagar",
    location: "Srinagar, Jammu & Kashmir",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.1,
    fees: "₹1,00,000 per year",
    ranking: "NIRF Rank: #19",
    website: "http://www.nitsri.ac.in",
    description:
      "NIT Srinagar is a public engineering institute in Jammu & Kashmir known for its scenic campus and engineering programs.",
    lat: 34.125,
    lng: 74.833
  },
  {
    id: 20,
    name: "Malaviya National Institute of Technology Jaipur",
    location: "Jaipur, Rajasthan",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹1,00,000 per year",
    ranking: "NIRF Rank: #15",
    website: "http://www.mnit.ac.in",
    description:
      "MNIT Jaipur is a leading engineering university in Rajasthan, offering a range of undergraduate and postgraduate technical programs.",
    lat: 26.861,
    lng: 75.81
  },
  {
    id: 21,
    name: "Indian Institute of Information Technology Allahabad",
    location: "Allahabad, Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹1,50,000 per year",
    ranking: "NIRF Rank: #21",
    website: "http://www.iiita.ac.in",
    description:
      "IIIT Allahabad specializes in information technology and electronics education and is known for its strong placements in the IT industry.",
    lat: 25.43,
    lng: 81.77
  },
  {
    id: 22,
    name: "Indraprastha Institute of Information Technology Delhi",
    location: "Delhi, Delhi",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹1,80,000 per year",
    ranking: "NIRF Rank: #22",
    website: "http://www.iiitd.ac.in",
    description:
      "IIIT-Delhi is an autonomous state university focusing on computer science, IT and allied areas with a research-driven curriculum.",
    lat: 28.544083,
    lng: 77.270799
  },
  {
    id: 23,
    name: "ABV Indian Institute of Information Technology and Management Gwalior",
    location: "Gwalior, Madhya Pradesh",
    courses: ["B.Tech", "MBA", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹1,00,000 per year",
    ranking: "NIRF Rank: #23",
    website: "http://www.iiitm.ac.in",
    description:
      "ABV-IIITM Gwalior is a specialized institute combining information technology with management education, known for its integrated programs.",
    lat: 26.2183,
    lng: 78.173
  },
  {
    id: 24,
    name: "Indian Institute of Science, Bangalore",
    location: "Bangalore, Karnataka",
    courses: ["B.Sc.", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.7,
    fees: "₹25,000 per year",
    ranking: "NIRF Rank: #2",
    website: "http://www.iisc.ac.in",
    description:
      "IISc Bangalore is India’s premier institute for advanced scientific and technological research, offering postgraduate and doctoral programs in science and engineering.",
    lat: 13.020929,
    lng: 77.566241
  },
  {
    id: 25,
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    courses: ["B.E.", "B.A.", "B.Sc.", "M.E.", "M.A."],
    type: "Public",
    rating: 4.4,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #11",
    website: "http://www.jaduniv.edu.in",
    description:
      "Jadavpur University is a public research university located in Kolkata, known for strong engineering, arts, and science programs.",
    lat: 22.4989,
    lng: 88.3714
  },
  {
    id: 26,
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    courses: ["B.E.", "B.Tech", "M.E.", "M.Tech"],
    type: "Public",
    rating: 4.2,
    fees: "₹25,000 - ₹75,000 per year",
    ranking: "NIRF Rank: #15",
    website: "http://www.annauniv.edu",
    description:
      "Anna University is a public technical university in Tamil Nadu, specializing in engineering and technology education.",
    lat: 13.0108,
    lng: 80.2354
  },
  {
    id: 27,
    name: "Banaras Hindu University",
    location: "Varanasi, Uttar Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Tech", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.5,
    fees: "₹10,000 - ₹50,000 per year",
    ranking: "NIRF Rank: #12",
    website: "http://www.bhu.ac.in",
    description:
      "BHU is one of Asia’s largest residential universities, offering a wide range of undergraduate and postgraduate programs across disciplines.",
    lat: 25.267878,
    lng: 82.990494
  },
  {
    id: 28,
    name: "Jawaharlal Nehru University",
    location: "New Delhi, Delhi",
    courses: ["B.A.", "M.A.", "M.Phil.", "PhD"],
    type: "Public",
    rating: 4.6,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #10",
    website: "http://www.jnu.ac.in",
    description:
      "JNU is a leading public university in New Delhi known for its emphasis on research and postgraduate education in social sciences, science, and humanities.",
    lat: 28.547,
    lng: 77.168
  },
  {
    id: 29,
    name: "Aligarh Muslim University",
    location: "Aligarh, Uttar Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Tech", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.4,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #13",
    website: "http://www.amu.ac.in",
    description:
      "AMU is a historic central university offering diverse programs; it is especially renowned for its arts, sciences, and engineering faculties.",
    lat: 27.911,
    lng: 78.078
  },
  {
    id: 30,
    name: "University of Calcutta",
    location: "Kolkata, West Bengal",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.3,
    fees: "₹5,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #24",
    website: "http://www.caluniv.ac.in",
    description:
      "The University of Calcutta is one of the oldest universities in India, known for its distinguished alumni and strong programs in arts, science, and commerce.",
    lat: 22.575,
    lng: 88.364
  },
  {
    id: 31,
    name: "University of Mumbai",
    location: "Mumbai, Maharashtra",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.3,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #32",
    website: "http://www.mu.ac.in",
    description:
      "The University of Mumbai is a large public university offering a wide array of undergraduate and postgraduate programs across multiple disciplines.",
    lat: 18.92942,
    lng: 72.830925
  },
  {
    id: 32,
    name: "University of Madras",
    location: "Chennai, Tamil Nadu",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.3,
    fees: "₹5,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #28",
    website: "http://www.unom.ac.in",
    description:
      "University of Madras is a historic state university in Chennai, known for its comprehensive programs in humanities, science, and commerce.",
    lat: 13.08,
    lng: 80.274
  },
  {
    id: 33,
    name: "University of Hyderabad",
    location: "Hyderabad, Telangana",
    courses: ["M.A.", "M.Sc.", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #9",
    website: "http://www.uohyd.ac.in",
    description:
      "The University of Hyderabad is a central university famous for its postgraduate and research programs in sciences, humanities, and social sciences.",
    lat: 17.445,
    lng: 78.349
  },
  {
    id: 34,
    name: "Jamia Millia Islamia",
    location: "New Delhi, Delhi",
    courses: ["B.A.", "B.Sc.", "B.Tech", "M.A.", "MBA"],
    type: "Public",
    rating: 4.4,
    fees: "₹10,000 - ₹25,000 per year",
    ranking: "NIRF Rank: #17",
    website: "http://www.jmi.ac.in",
    description:
      "Jamia Millia Islamia is a central university in New Delhi offering courses from undergraduate to doctoral level, known for its liberal arts, engineering, and journalism programs.",
    lat: 28.561,
    lng: 77.279
  },
  {
    id: 35,
    name: "Savitribai Phule Pune University",
    location: "Pune, Maharashtra",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.4,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #22",
    website: "http://www.unipune.ac.in",
    description:
      "Savitribai Phule Pune University (formerly University of Pune) is a major state university with numerous affiliated colleges, offering diverse academic programs.",
    lat: 18.554499,
    lng: 73.825729
  },
  {
    id: 36,
    name: "Panjab University",
    location: "Chandigarh, Punjab",
    courses: ["B.A.", "B.Sc.", "B.Com", "LLB", "M.A."],
    type: "Public",
    rating: 4.4,
    fees: "₹10,000 - ₹25,000 per year",
    ranking: "NIRF Rank: #23",
    website: "http://www.puchd.ac.in",
    description:
      "Panjab University, located in Chandigarh, is a public university known for its vibrant campus and strong programs in arts, sciences, law, and engineering.",
    lat: 30.76,
    lng: 76.768
  },
  {
    id: 37,
    name: "Osmania University",
    location: "Hyderabad, Telangana",
    courses: ["B.A.", "B.Sc.", "B.E.", "M.A.", "MBA"],
    type: "Public",
    rating: 4.3,
    fees: "₹10,000 - ₹50,000 per year",
    ranking: "NIRF Rank: #29",
    website: "http://www.osmania.ac.in",
    description:
      "Osmania University in Hyderabad is one of India’s oldest modern universities, offering a broad spectrum of courses and known for its faculty of engineering and arts.",
    lat: 17.413,
    lng: 78.526
  },
  {
    id: 38,
    name: "University of Allahabad",
    location: "Prayagraj, Uttar Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #38",
    website: "http://www.allduniv.ac.in",
    description:
      "The University of Allahabad, now a central university, is a historically significant institution known for its contributions to law, literature, and science education.",
    lat: 25.458,
    lng: 81.854
  },
  {
    id: 39,
    name: "University of Kashmir",
    location: "Srinagar, Jammu & Kashmir",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #30",
    website: "http://www.kashmiruniversity.net",
    description:
      "The University of Kashmir in Srinagar is a major public university in J&K, offering courses in arts, sciences, and more, with a picturesque campus by Dal Lake.",
    lat: 34.129,
    lng: 74.833
  },
  {
    id: 40,
    name: "University of Lucknow",
    location: "Lucknow, Uttar Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.1,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #40",
    website: "http://www.lkouniv.ac.in",
    description:
      "The University of Lucknow is a prominent state university, one of the oldest in India, known for its programs in arts, science, law, and business studies.",
    lat: 26.869,
    lng: 80.947
  },
  {
    id: 41,
    name: "University of Rajasthan",
    location: "Jaipur, Rajasthan",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #41",
    website: "http://www.uniraj.ac.in",
    description:
      "The University of Rajasthan, based in Jaipur, is a major state university offering a wide range of undergraduate and postgraduate programs, particularly known for arts and social sciences.",
    lat: 26.912,
    lng: 75.82
  },
  {
    id: 42,
    name: "University of Kerala",
    location: "Thiruvananthapuram, Kerala",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹10,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #47",
    website: "http://www.keralauniversity.ac.in",
    description:
      "The University of Kerala (formerly University of Travancore) is a public university with a rich heritage, known for its research and courses in science, humanities, and more.",
    lat: 8.5241,
    lng: 76.9366
  },
  {
    id: 43,
    name: "Visva-Bharati University",
    location: "Santiniketan, West Bengal",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.1,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #43",
    website: "http://www.visvabharati.ac.in",
    description:
      "Founded by Rabindranath Tagore, Visva-Bharati is a central university that combines arts, culture, and education in the rural setting of Santiniketan.",
    lat: 23.683,
    lng: 87.683
  },
  {
    id: 44,
    name: "Tezpur University",
    location: "Tezpur, Assam",
    courses: ["B.Sc.", "B.Tech", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #44",
    website: "http://www.tezu.ac.in",
    description:
      "Tezpur University is a central university in Assam known for its strong postgraduate programs in science, technology, management, and humanities.",
    lat: 26.709,
    lng: 92.83
  },
  {
    id: 45,
    name: "North-Eastern Hill University",
    location: "Shillong, Meghalaya",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.1,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #45",
    website: "http://www.nehu.ac.in",
    description:
      "NEHU is a central university in Shillong catering to the North-Eastern region, with programs spanning sciences, humanities, and education.",
    lat: 25.613,
    lng: 91.415
  },
  {
    id: 46,
    name: "Pondicherry University",
    location: "Puducherry, Puducherry",
    courses: ["B.Sc.", "B.A.", "M.Sc.", "M.A.", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #46",
    website: "http://www.pondiuni.edu.in",
    description:
      "Pondicherry University is a central university in the Union Territory of Puducherry, known for its lush campus and a variety of postgraduate programs and research centers.",
    lat: 12.02,
    lng: 79.855
  },
  {
    id: 47,
    name: "Visvesvaraya Technological University",
    location: "Belgaum, Karnataka",
    courses: ["B.E.", "B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹20,000 per year",
    ranking: "NIRF Rank: #47",
    website: "http://www.vtu.ac.in",
    description:
      "VTU is a collegiate public state university overseeing engineering education in Karnataka, affiliating many engineering colleges and offering its own postgraduate programs.",
    lat: 15.361,
    lng: 75.124
  },
  {
    id: 48,
    name: "University of Mysore",
    location: "Mysore, Karnataka",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.3,
    fees: "₹5,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #48",
    website: "http://www.uni-mysore.ac.in",
    description:
      "The University of Mysore is a historic state university founded in 1916, highly regarded for its programs in arts, sciences, language, and literature.",
    lat: 12.305,
    lng: 76.655
  },
  {
    id: 49,
    name: "Andhra University",
    location: "Visakhapatnam, Andhra Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Tech", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.3,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #49",
    website: "http://www.andhrauniversity.edu.in",
    description:
      "Andhra University, based in Visakhapatnam, is a well-established state university offering a broad range of programs and known for its engineering and oceanography departments.",
    lat: 17.729,
    lng: 83.321
  },
  {
    id: 50,
    name: "Madurai Kamaraj University",
    location: "Madurai, Tamil Nadu",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #50",
    website: "http://www.mkuniversity.ac.in",
    description:
      "Madurai Kamaraj University is a public university in Tamil Nadu known for its distance education and on-campus programs across various disciplines.",
    lat: 9.925,
    lng: 78.119
  },
  {
    id: 51,
    name: "Gujarat University",
    location: "Ahmedabad, Gujarat",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #51",
    website: "http://www.gujaratuniversity.ac.in",
    description:
      "Gujarat University, located in Ahmedabad, is one of the largest state universities in Gujarat and is known for its extensive affiliated college network and programs in commerce and arts.",
    lat: 23.033,
    lng: 72.546
  },
  {
    id: 52,
    name: "Maharaja Sayajirao University of Baroda",
    location: "Vadodara, Gujarat",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.3,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #52",
    website: "http://www.msubaroda.ac.in",
    description:
      "MSU Baroda is a premier state university in Gujarat, known for its Faculty of Fine Arts and diverse offerings in sciences, engineering, and humanities.",
    lat: 22.314,
    lng: 73.18
  },
  {
    id: 53,
    name: "Utkal University",
    location: "Bhubaneswar, Odisha",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.1,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #53",
    website: "http://www.utkaluniversity.ac.in",
    description:
      "Utkal University in Bhubaneswar is the oldest university in Odisha, well-regarded for its programs in social sciences, commerce, and science, and for fostering regional development.",
    lat: 20.305,
    lng: 85.819
  },
  {
    id: 54,
    name: "Kurukshetra University",
    location: "Kurukshetra, Haryana",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.1,
    fees: "₹10,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #54",
    website: "http://www.kuk.ac.in",
    description:
      "Kurukshetra University is a state university in Haryana, known for its sprawling campus and quality programs in arts, sciences, education, and management.",
    lat: 29.945,
    lng: 76.82
  },
  {
    id: 55,
    name: "Patna University",
    location: "Patna, Bihar",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.0,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #55",
    website: "http://www.patnauniversity.ac.in",
    description:
      "Patna University, established in 1917, is the seventh oldest university in India and offers a range of undergraduate and postgraduate programs, especially known for its humanities and law faculties.",
    lat: 25.612,
    lng: 85.13
  },
  {
    id: 56,
    name: "Guru Nanak Dev University",
    location: "Amritsar, Punjab",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹10,000 - ₹25,000 per year",
    ranking: "NIRF Rank: #56",
    website: "http://www.gndu.ac.in",
    description:
      "GNDU Amritsar is a state university named after the first Sikh Guru, known for its strong sports culture and programs in arts, science, and technology.",
    lat: 31.633,
    lng: 74.822
  },
  {
    id: 57,
    name: "National Law School of India University",
    location: "Bangalore, Karnataka",
    courses: ["B.A. LL.B.", "LL.M.", "PhD"],
    type: "Public",
    rating: 4.7,
    fees: "₹2,50,000 - ₹3,00,000 per year",
    ranking: "NIRF Rank: #21",
    website: "http://www.nls.ac.in",
    description:
      "NLSIU Bangalore is India’s premier law university, offering an integrated 5-year law program and advanced degrees in legal studies.",
    lat: 12.935,
    lng: 77.534
  },
  {
    id: 58,
    name: "NALSAR University of Law",
    location: "Hyderabad, Telangana",
    courses: ["B.A. LL.B.", "LL.M.", "PhD"],
    type: "Public",
    rating: 4.6,
    fees: "₹2,00,000 - ₹2,50,000 per year",
    ranking: "NIRF Rank: #22",
    website: "http://www.nalsar.ac.in",
    description:
      "NALSAR Hyderabad is a leading law university known for its rigorous legal education and research, producing top legal professionals in India.",
    lat: 17.625,
    lng: 78.543
  },
  {
    id: 59,
    name: "National Law University, Delhi",
    location: "New Delhi, Delhi",
    courses: ["B.A. LL.B.", "LL.M.", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹1,50,000 - ₹2,00,000 per year",
    ranking: "NIRF Rank: #24",
    website: "http://www.nludelhi.ac.in",
    description:
      "NLU Delhi is a prominent autonomous law university in the capital city, focusing on legal studies and research with a selective intake of students.",
    lat: 28.59,
    lng: 77.168
  },
  {
    id: 60,
    name: "All India Institute of Medical Sciences, New Delhi",
    location: "New Delhi, Delhi",
    courses: ["MBBS", "MD", "B.Sc. Nursing"],
    type: "Public",
    rating: 4.7,
    fees: "₹1,000 - ₹5,000 per year",
    ranking: "NIRF Rank: #7",
    website: "http://www.aiims.edu",
    description:
      "AIIMS New Delhi is India’s top medical institute, providing world-class medical education and healthcare services with minimal tuition fees.",
    lat: 28.567,
    lng: 77.21
  },
  {
    id: 61,
    name: "All India Institute of Medical Sciences, Bhopal",
    location: "Bhopal, Madhya Pradesh",
    courses: ["MBBS", "MD", "B.Sc. Nursing"],
    type: "Public",
    rating: 4.5,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #8",
    website: "http://www.aiimsbhopal.edu.in",
    description:
      "AIIMS Bhopal is one of the newer AIIMS institutions providing high-quality medical education and healthcare training in central India.",
    lat: 23.25,
    lng: 77.474
  },
  {
    id: 62,
    name: "Armed Forces Medical College",
    location: "Pune, Maharashtra",
    courses: ["MBBS", "MD", "Nursing"],
    type: "Public",
    rating: 4.6,
    fees: "₹10,000 per year",
    ranking: "NIRF Rank: #62",
    website: "http://www.afmc.nic.in",
    description:
      "AFMC Pune is a premier medical institute managed by the Indian Armed Forces, known for training medical cadets with a focus on military medical services.",
    lat: 18.517,
    lng: 73.887
  },
  {
    id: 63,
    name: "King George's Medical University",
    location: "Lucknow, Uttar Pradesh",
    courses: ["MBBS", "MD", "BDS"],
    type: "Public",
    rating: 4.4,
    fees: "₹50,000 - ₹70,000 per year",
    ranking: "NIRF Rank: #63",
    website: "http://www.kgmu.org",
    description:
      "KGMU Lucknow is a renowned medical university known for its excellent medical and dental colleges and tertiary care hospital.",
    lat: 26.869,
    lng: 80.918
  },
  {
    id: 64,
    name: "Postgraduate Institute of Medical Education & Research",
    location: "Chandigarh, Chandigarh",
    courses: ["MD", "M.Ch.", "DM"],
    type: "Public",
    rating: 4.6,
    fees: "₹10,000 per year",
    ranking: "NIRF Rank: #64",
    website: "http://www.pgimer.edu.in",
    description:
      "PGIMER Chandigarh is a top medical and research institution offering only postgraduate and doctoral training in various medical specializations.",
    lat: 30.762,
    lng: 76.775
  },
  {
    id: 65,
    name: "Madras Medical College",
    location: "Chennai, Tamil Nadu",
    courses: ["MBBS", "MD", "M.Ch."],
    type: "Public",
    rating: 4.3,
    fees: "₹20,000 - ₹50,000 per year",
    ranking: "NIRF Rank: #65",
    website: "http://mmcrgggh.tn.gov.in",
    description:
      "Madras Medical College, established in 1835, is one of the oldest medical colleges in India, and remains a leading institution for medical education and healthcare in Tamil Nadu.",
    lat: 13.082,
    lng: 80.27
  },
  {
    id: 66,
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad, Gujarat",
    courses: ["MBA", "PhD"],
    type: "Public",
    rating: 4.8,
    fees: "₹10,00,000 - ₹12,00,000 per year",
    ranking: "NIRF Rank: #16",
    website: "http://www.iima.ac.in",
    description:
      "IIM Ahmedabad is Asia’s foremost business school, known for its flagship MBA program and influential research in management.",
    lat: 23.03,
    lng: 72.547
  },
  {
    id: 67,
    name: "Indian Institute of Management Bangalore",
    location: "Bangalore, Karnataka",
    courses: ["MBA", "PhD"],
    type: "Public",
    rating: 4.8,
    fees: "₹10,00,000 - ₹12,00,000 per year",
    ranking: "NIRF Rank: #19",
    website: "http://www.iimb.ac.in",
    description:
      "IIM Bangalore is a leading graduate school of management in India, offering world-class MBA and executive programs with a scenic campus in South India.",
    lat: 12.895,
    lng: 77.603
  },
  {
    id: 68,
    name: "Indian Institute of Management Calcutta",
    location: "Kolkata, West Bengal",
    courses: ["MBA", "PhD"],
    type: "Public",
    rating: 4.7,
    fees: "₹10,00,000 - ₹12,00,000 per year",
    ranking: "NIRF Rank: #23",
    website: "http://www.iimcal.ac.in",
    description:
      "IIM Calcutta is a premier business school and the first of the IIMs, renowned for its finance and management programs and strong alumni network in industry.",
    lat: 22.445,
    lng: 88.305
  },
  {
    id: 69,
    name: "Institute of Chemical Technology, Mumbai",
    location: "Mumbai, Maharashtra",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹1,75,000 per year",
    ranking: "NIRF Rank: #69",
    website: "http://www.ictmumbai.edu.in",
    description:
      "ICT Mumbai (formerly UDCT) is a premier deemed university specializing in chemical engineering, chemical technology and pharmacy, with a strong research orientation.",
    lat: 19.024,
    lng: 72.859
  },
  {
    id: 70,
    name: "Delhi Technological University",
    location: "Delhi, Delhi",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹1,50,000 per year",
    ranking: "NIRF Rank: #70",
    website: "http://www.dtu.ac.in",
    description:
      "DTU, formerly Delhi College of Engineering, is a top government engineering university in Delhi, known for its engineering and technology programs and strong industry linkages.",
    lat: 28.749,
    lng: 77.117
  },
  {
    id: 71,
    name: "Netaji Subhas University of Technology",
    location: "Delhi, Delhi",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #71",
    website: "http://www.nsut.ac.in",
    description:
      "NSUT (formerly NSIT) is a prestigious engineering university in Delhi offering undergraduate to doctoral programs in engineering and computer sciences.",
    lat: 28.608,
    lng: 77.033
  },
  {
    id: 72,
    name: "College of Engineering, Pune",
    location: "Pune, Maharashtra",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹1,00,000 per year",
    ranking: "NIRF Rank: #72",
    website: "http://www.coeptech.ac.in",
    description:
      "COEP Technological University (College of Engineering Pune) is one of the oldest engineering colleges in India, famous for its heritage and high-quality engineering education.",
    lat: 18.528,
    lng: 73.852
  },
  {
    id: 73,
    name: "Indian Statistical Institute, Kolkata",
    location: "Kolkata, West Bengal",
    courses: ["B.Stat.", "M.Stat.", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹5,000 per year",
    ranking: "NIRF Rank: #73",
    website: "http://www.isical.ac.in",
    description:
      "ISI Kolkata is a leading institute of national importance in statistics, mathematics, and quantitative economics, known for its rigorous B.Stat and M.Stat programs.",
    lat: 22.647,
    lng: 88.357
  },
  {
    id: 74,
    name: "Tata Institute of Social Sciences, Mumbai",
    location: "Mumbai, Maharashtra",
    courses: ["B.A.", "M.A.", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹50,000 per year",
    ranking: "NIRF Rank: #74",
    website: "http://www.tiss.ac.in",
    description:
      "TISS Mumbai is a highly respected social sciences institute deemed to be university, offering programs in social work, public policy, and related fields.",
    lat: 19.036,
    lng: 72.857
  },
  {
    id: 75,
    name: "Indian Institute of Science Education and Research, Pune",
    location: "Pune, Maharashtra",
    courses: ["B.S.-M.S.", "PhD"],
    type: "Public",
    rating: 4.5,
    fees: "₹25,000 per year",
    ranking: "NIRF Rank: #75",
    website: "http://www.iiserpune.ac.in",
    description:
      "IISER Pune is one of the foremost research-focused institutions in India, offering integrated bachelor’s and master’s programs and PhDs in science disciplines.",
    lat: 18.547,
    lng: 73.807
  },
  {
    id: 76,
    name: "Indian Institute of Space Science and Technology",
    location: "Thiruvananthapuram, Kerala",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹50,000 per year",
    ranking: "NIRF Rank: #76",
    website: "http://www.iist.ac.in",
    description:
      "IIST Thiruvananthapuram is a unique institute under the Department of Space, specializing in space science and aerospace engineering education and research.",
    lat: 8.565,
    lng: 76.878
  },
  {
    id: 77,
    name: "National Institute of Design, Ahmedabad",
    location: "Ahmedabad, Gujarat",
    courses: ["B.Des.", "M.Des."],
    type: "Public",
    rating: 4.4,
    fees: "₹3,00,000 per year",
    ranking: "NIRF Rank: #77",
    website: "http://www.nid.edu",
    description:
      "NID Ahmedabad is a premier institute of design, recognized internationally for its industrial, communication, and textile design programs.",
    lat: 23.03,
    lng: 72.55
  },
  {
    id: 78,
    name: "National Institute of Fashion Technology, New Delhi",
    location: "New Delhi, Delhi",
    courses: ["B.Des.", "M.Des."],
    type: "Public",
    rating: 4.3,
    fees: "₹2,00,000 per year",
    ranking: "NIRF Rank: #78",
    website: "http://www.nift.ac.in",
    description:
      "NIFT New Delhi is India’s leading institute for fashion design, technology, and management, producing top professionals in the fashion industry.",
    lat: 28.588,
    lng: 77.207
  },
  {
    id: 79,
    name: "Gandhigram Rural Institute",
    location: "Dindigul, Tamil Nadu",
    courses: ["B.A.", "B.Sc.", "M.A.", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #79",
    website: "http://www.ruraluniv.ac.in",
    description:
      "The Gandhigram Rural Institute is a centrally funded deemed university focusing on rural development, agriculture, and sustainable development studies.",
    lat: 10.364,
    lng: 77.96
  },
  {
    id: 80,
    name: "G. B. Pant University of Agriculture and Technology",
    location: "Pantnagar, Uttarakhand",
    courses: ["B.Sc.", "B.Tech", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹30,000 per year",
    ranking: "NIRF Rank: #80",
    website: "http://www.gbpuat.ac.in",
    description:
      "Pantnagar University is India’s first agricultural university, known for pioneering education and research in agriculture, veterinary sciences, and engineering.",
    lat: 29.024,
    lng: 79.473
  },
  {
    id: 81,
    name: "Tamil Nadu Agricultural University",
    location: "Coimbatore, Tamil Nadu",
    courses: ["B.Sc.", "B.Tech", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹20,000 - ₹40,000 per year",
    ranking: "NIRF Rank: #81",
    website: "http://www.tnau.ac.in",
    description:
      "TNAU Coimbatore is a leading state agricultural university in India, offering comprehensive programs in agricultural sciences and allied technologies.",
    lat: 11.013,
    lng: 76.932
  },
  {
    id: 82,
    name: "Manipur University",
    location: "Imphal, Manipur",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.1,
    fees: "₹10,000 per year",
    ranking: "NIRF Rank: #82",
    website: "http://www.manipuruniv.ac.in",
    description:
      "Manipur University is a central university in Imphal that provides higher education in the arts, sciences, and humanities for the North-Eastern region.",
    lat: 24.75,
    lng: 93.95
  },
  {
    id: 83,
    name: "Mizoram University",
    location: "Aizawl, Mizoram",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.0,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #83",
    website: "http://www.mzu.edu.in",
    description:
      "Mizoram University is a central university established on 2 July 2001, offering higher education in arts, science, and professional courses to students in Mizoram and surrounding regions.",
    lat: 23.726,
    lng: 92.716
  },
  {
    id: 84,
    name: "Nagaland University",
    location: "Lumami, Nagaland",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.0,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #84",
    website: "http://www.nagalanduniversity.ac.in",
    description:
      "Nagaland University is a central university with campuses across Nagaland, providing education and research opportunities in arts, sciences, and agriculture.",
    lat: 25.939,
    lng: 94.53
  },
  {
    id: 85,
    name: "Sikkim University",
    location: "Gangtok, Sikkim",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.0,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #85",
    website: "http://www.cus.ac.in",
    description:
      "Sikkim University is a central university in Gangtok, focusing on inclusive education with special attention to the social, cultural, and economic development of Sikkim.",
    lat: 27.333,
    lng: 88.613
  },
  {
    id: 86,
    name: "University of Jammu",
    location: "Jammu, Jammu & Kashmir",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.1,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #86",
    website: "http://www.jammuuniversity.ac.in",
    description:
      "The University of Jammu is a NAAC A++ accredited university offering diverse programs, and it serves as a major educational institution in the Jammu region.",
    lat: 32.733,
    lng: 74.868
  },
  {
    id: 87,
    name: "Dr. Harisingh Gour University",
    location: "Sagar, Madhya Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.2,
    fees: "₹10,000 per year",
    ranking: "NIRF Rank: #87",
    website: "http://www.dhsgsu.ac.in",
    description:
      "Dr. Harisingh Gour Vishwavidyalaya, Sagar (a central university) is known for its scenic campus and comprehensive programs in arts, sciences, and commerce in central India.",
    lat: 23.838,
    lng: 78.737
  },
  {
    id: 88,
    name: "School of Planning and Architecture, Delhi",
    location: "New Delhi, Delhi",
    courses: ["B.Arch.", "M.Arch.", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹80,000 per year",
    ranking: "NIRF Rank: #88",
    website: "http://www.spa.ac.in",
    description:
      "SPA Delhi is India’s premier architecture and planning institute, offering specialized training in architecture, urban planning, and design.",
    lat: 28.635,
    lng: 77.168
  },
  {
    id: 89,
    name: "Tripura University",
    location: "Agartala, Tripura",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.1,
    fees: "₹5,000 - ₹15,000 per year",
    ranking: "NIRF Rank: #89",
    website: "http://www.tripurauniv.ac.in",
    description:
      "Tripura University is a central university in Agartala offering higher education in arts, science, and professional courses to students in Tripura and surrounding regions.",
    lat: 23.709,
    lng: 91.273
  },
  {
    id: 90,
    name: "Indira Gandhi National Open University",
    location: "New Delhi, Delhi",
    courses: ["B.A.", "B.Sc.", "MBA", "M.A.", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹5,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #90",
    website: "http://www.ignou.ac.in",
    description:
      "IGNOU is the world’s largest open university providing distance and open education across India, offering flexible learning from certificate to doctoral levels.",
    lat: 28.546,
    lng: 77.193
  },
  {
    id: 91,
    name: "Indian Institute of Engineering Science and Technology, Shibpur",
    location: "Howrah, West Bengal",
    courses: ["B.Tech", "B.Arch.", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.4,
    fees: "₹1,20,000 per year",
    ranking: "NIRF Rank: #91",
    website: "http://www.iiests.ac.in",
    description:
      "IIEST Shibpur, formerly BESU, is an Institute of National Importance that combines engineering education with interdisciplinary research, especially known for civil and mechanical engineering.",
    lat: 22.555,
    lng: 88.305
  },
  {
    id: 92,
    name: "Maulana Azad National Institute of Technology, Bhopal",
    location: "Bhopal, Madhya Pradesh",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #92",
    website: "http://www.manit.ac.in",
    description:
      "MANIT Bhopal (Maulana Azad NIT) is a well-known engineering institute in central India, offering strong programs in engineering and technology and fostering research.",
    lat: 23.218,
    lng: 77.502
  },
  {
    id: 93,
    name: "Sardar Vallabhbhai National Institute of Technology, Surat",
    location: "Surat, Gujarat",
    courses: ["B.Tech", "M.Tech", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹1,25,000 per year",
    ranking: "NIRF Rank: #93",
    website: "http://www.svnit.ac.in",
    description:
      "SVNIT Surat is a reputed engineering institute in Gujarat known for its undergraduate and graduate programs in engineering and its active campus life.",
    lat: 21.164,
    lng: 72.785
  },
  {
    id: 94,
    name: "National Institute of Pharmaceutical Education and Research, Mohali",
    location: "Mohali, Punjab",
    courses: ["M.Pharm.", "MBA", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹50,000 per year",
    ranking: "NIRF Rank: #94",
    website: "http://www.niper.gov.in",
    description:
      "NIPER Mohali is India’s premier institute for postgraduate education in pharmaceutical sciences, under the Ministry of Chemicals and Fertilizers, contributing significantly to pharma research.",
    lat: 30.673,
    lng: 76.729
  },
  {
    id: 95,
    name: "Forest Research Institute, Dehradun",
    location: "Dehradun, Uttarakhand",
    courses: ["M.Sc.", "PhD"],
    type: "Public",
    rating: 4.3,
    fees: "₹30,000 per year",
    ranking: "NIRF Rank: #95",
    website: "http://www.fridu.edu.in",
    description:
      "FRI Dehradun (Deemed University) is a premier institution in forestry research and education, known for its iconic Greco-Roman architecture and contributions to environmental science.",
    lat: 30.343,
    lng: 77.999
  },
  {
    id: 96,
    name: "Nalanda University",
    location: "Rajgir, Bihar",
    courses: ["M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.2,
    fees: "₹1,00,000 per year",
    ranking: "NIRF Rank: #96",
    website: "http://www.nalandauniv.edu.in",
    description:
      "Nalanda University is an international central university reviving the ancient Nalanda tradition, focusing on postgraduate studies in areas like history, ecology, and Buddhist studies.",
    lat: 25.026,
    lng: 85.42
  },
  {
    id: 97,
    name: "Rajiv Gandhi University",
    location: "Itanagar, Arunachal Pradesh",
    courses: ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    type: "Public",
    rating: 4.1,
    fees: "₹5,000 - ₹10,000 per year",
    ranking: "NIRF Rank: #97",
    website: "http://www.rgu.ac.in",
    description:
      "Rajiv Gandhi University (formerly Arunachal University) is the premier institution of higher learning in Arunachal Pradesh, offering diverse academic programs and contributing to the region’s development.",
    lat: 27.1,
    lng: 93.695
  },
  {
    id: 98,
    name: "Himachal Pradesh University",
    location: "Shimla, Himachal Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.1,
    fees: "₹10,000 - ₹20,000 per year",
    ranking: "NIRF Rank: #98",
    website: "http://www.hpuniv.ac.in",
    description:
      "HPU Shimla is a leading state university situated in the Himalayas, known for its departments in commerce, management, social sciences, and law, and its scenic campus.",
    lat: 31.104,
    lng: 77.171
  },
  {
    id: 99,
    name: "Devi Ahilya Vishwavidyalaya",
    location: "Indore, Madhya Pradesh",
    courses: ["B.A.", "B.Sc.", "B.Tech", "M.A.", "MBA"],
    type: "Public",
    rating: 4.2,
    fees: "₹20,000 - ₹50,000 per year",
    ranking: "NIRF Rank: #99",
    website: "http://www.dauniv.ac.in",
    description:
      "DAVV Indore is a prominent state university offering a variety of courses and known for institutes like IET (engineering) and IIPS (management) under its umbrella.",
    lat: 22.686,
    lng: 75.88
  },
  {
    id: 100,
    name: "Goa University",
    location: "Taleigao, Goa",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    type: "Public",
    rating: 4.1,
    fees: "₹10,000 - ₹30,000 per year",
    ranking: "NIRF Rank: #100",
    website: "http://www.unigoa.ac.in",
    description:
      "Goa University, located in Taleigao near Panaji, is the premier university of Goa offering higher education in various fields and fostering research in a vibrant campus environment.",
    lat: 15.458,
    lng: 73.833
  }
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
    <div className="min-h-screen bg-black text-white w-full">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-lg p-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-4">College Directory</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore top colleges and universities based on your location, course preferences, and more
          </p>
        </div>

        {/* Filters and Find Nearby Button */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="City or State"
                className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Course
              </label>
              <input
                type="text"
                id="course"
                value={filters.course}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, course: e.target.value }))
                }
                placeholder="B.Tech, BBA, B.Sc, etc."
                className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Institution Type
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Types</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <button
              onClick={findNearbyColleges}
              disabled={isFindingLocation}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              {isFindingLocation ? "Finding..." : "Find Nearby Colleges"}
            </button>
          </div>
          {locationError && <p className="mt-2 text-red-500 text-sm">{locationError}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* College List */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-700 rounded-lg shadow-md overflow-y-auto max-h-[600px]">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">
                Colleges ({filteredColleges.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading colleges...
              </div>
            ) : filteredColleges.length > 0 ? (
              filteredColleges.map((college) => (
                <div
                  key={college.id}
                  className={`p-4 cursor-pointer border-b border-gray-700 hover:bg-blue-900 transition ${
                    selectedCollege?.id === college.id ? "bg-blue-800" : ""
                  }`}
                  onClick={() => setSelectedCollege(college)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-800 flex items-center justify-center rounded">
                      <span className="text-xl text-gray-400 font-bold">{college.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{college.name}</h3>
                      <p className="text-gray-400">{college.location}</p>
                      {userLocation && college.distance !== undefined && (
                        <p className="text-xs text-gray-500">{college.distance.toFixed(2)} km away</p>
                      )}
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-yellow-400 font-semibold">{college.rating}</span>
                        <div className="flex space-x-0.5">
                          {Array.from({ length: Math.floor(college.rating) }).map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                No colleges found matching your filters.
                <button
                  className="mt-4 px-4 py-2 border border-blue-700 rounded text-blue-500 hover:bg-blue-900"
                  onClick={() => {
                    setFilters({ location: "", course: "", type: "all" });
                    setUserLocation(null);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Map and College Details */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Map Container with padding to show black border */}
            <div
              className="bg-gray-900 border border-gray-700 rounded-lg shadow-md p-4 flex justify-center items-center"
              style={{ height: "300px" }}
            >
              <div
                ref={mapRef}
                className="w-full h-full rounded-md"
                style={{ margin: "10px" }}
              />
            </div>

            {/* Selected College Details */}
            {selectedCollege ? (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md p-6">
                <h2 className="text-white text-xl font-semibold mb-4">College Details</h2>
                <div className="flex space-x-6">
                  <div className="h-20 w-20 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-3xl font-bold">{selectedCollege.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 text-gray-300">
                    <h3 className="text-2xl font-bold text-white">{selectedCollege.name}</h3>
                    <p>{selectedCollege.location}</p>
                    <p className="mt-1">{selectedCollege.description}</p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>Type:</strong> {selectedCollege.type}
                      </div>
                      <div>
                        <strong>Ranking:</strong> {selectedCollege.ranking}
                      </div>
                      <div>
                        <strong>Fees:</strong> {selectedCollege.fees}
                      </div>
                      <div>
                        <strong>Website:</strong>{" "}
                        <a href={selectedCollege.website} className="text-blue-400 hover:underline">
                          {selectedCollege.website}
                        </a>
                      </div>
                    </div>

                    <div className="mt-4">
                      <strong>Available Courses:</strong>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedCollege.courses.map((course, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-900 text-blue-400 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-x-4">
                      <a
                        href="#"
                        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow font-semibold"
                      >
                        Apply Now
                      </a>
                      <a
                        href="#"
                        className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded shadow font-semibold"
                      >
                        Download Brochure
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md p-8 text-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16"
                  />
                </svg>
                <p>Select a college from the list to view detailed information.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDirectory;