import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapPinIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
  StarIcon,
  BuildingOffice2Icon,
  LinkIcon,
  CurrencyRupeeIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

// Hardcoded college data
const collegeData = [
    {
    "id": 1,
    "name": "Delhi University",
    "location": "Delhi, Delhi",
    "courses": ["B.A.", "B.Sc.", "B.Com", "BBA", "B.Tech"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹15,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #6",
    "website": "http://www.du.ac.in",
    "description": "The University of Delhi is a premier university in India and is known for its high standards in teaching and research.",
    "lat": 28.6129,
    "lng": 77.2295
  },
  {
    "id": 2,
    "name": "IIT Bombay",
    "location": "Mumbai, Maharashtra",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #3",
    "website": "http://www.iitb.ac.in",
    "description": "IIT Bombay is renowned for its four-year undergraduate program in engineering.",
    "lat": 19.1334,
    "lng": 72.9133
  },
  {
    "id": 3,
    "name": "St. Xavier's College",
    "location": "Mumbai, Maharashtra",
    "courses": ["B.A.", "B.Sc.", "B.Com", "BMS"],
    "type": "Private",
    "rating": 4.3,
    "fees": "₹50,000 - ₹1,00,000 per year",
    "ranking": "NIRF Rank: #24",
    "website": "http://www.xaviers.edu",
    "description": "St. Xavier's College is one of the oldest colleges in Mumbai and is known for its liberal arts and science programs.",
    "lat": 18.9432,
    "lng": 72.8326
  },
  {
    "id": 4,
    "name": "Anna University",
    "location": "Chennai, Tamil Nadu",
    "courses": ["B.E.", "B.Tech", "M.E.", "M.Tech"],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹25,000 - ₹75,000 per year",
    "ranking": "NIRF Rank: #15",
    "website": "http://www.annauniv.edu",
    "description": "Anna University is a public technical university located in Tamil Nadu, specializing in engineering and technology.",
    "lat": 13.0108,
    "lng": 80.2354
  },
  {
    "id": 5,
    "name": "Manipal Academy of Higher Education",
    "location": "Manipal, Karnataka",
    "courses": ["MBBS", "BDS", "B.Tech", "BBA", "B.Pharm"],
    "type": "Private",
    "rating": 4.4,
    "fees": "₹3,50,000 - ₹15,00,000 per year",
    "ranking": "NIRF Rank: #9",
    "website": "http://www.manipal.edu",
    "description": "Manipal Academy of Higher Education is a deemed university focusing on medical, engineering, and management education.",
    "lat": 13.349,
    "lng": 74.7856
  },
  {
    "id": 6,
    "name": "BITS Pilani",
    "location": "Pilani, Rajasthan",
    "courses": ["B.E.", "B.Pharm", "M.E.", "MBA"],
    "type": "Private",
    "rating": 4.7,
    "fees": "₹1,75,000 per year",
    "ranking": "NIRF Rank: #12",
    "website": "http://www.bits-pilani.ac.in",
    "description": "BITS Pilani is a private institute of higher education and a deemed university that focuses on engineering and sciences.",
    "lat": 28.3588,
    "lng": 75.588
  },
  {
    "id": 7,
    "name": "Christ University",
    "location": "Bangalore, Karnataka",
    "courses": ["B.A.", "B.Com", "BBA", "B.Tech", "B.Sc."],
    "type": "Private",
    "rating": 4.3,
    "fees": "₹60,000 - ₹1,50,000 per year",
    "ranking": "NIRF Rank: #19",
    "website": "http://www.christuniversity.in",
    "description": "Christ University is a private, deemed university known for its quality education in various disciplines.",
    "lat": 12.9345,
    "lng": 77.6064
  },
  {
    "id": 8,
    "name": "Jadavpur University",
    "location": "Kolkata, West Bengal",
    "courses": ["B.E.", "B.A.", "B.Sc.", "M.E.", "M.A."],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹10,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #11",
    "website": "http://www.jadavpur.edu",
    "description": "Jadavpur University is a public research university located in Kolkata, known for engineering and arts programs.",
    "lat": 22.4989,
    "lng": 88.3714
  },
  {
    "id": 9,
    "name": "Presidency University",
    "location": "Kolkata, West Bengal",
    "courses": ["B.A.", "B.Sc.", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹8,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #30",
    "website": "http://www.presiuniv.ac.in",
    "description": "Presidency University is a public state university in Kolkata, established as one of the oldest and most prestigious academic institutions in India.",
    "lat": 22.5852,
    "lng": 88.3619
  },
  {
    "id": 10,
    "name": "University of Mumbai",
    "location": "Mumbai, Maharashtra",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹10,000 - ₹40,000 per year",
    "ranking": "NIRF Rank: #70",
    "website": "http://www.mu.ac.in",
    "description": "The University of Mumbai is a public state university in Maharashtra. It is one of the oldest universities in India.",
    "lat": 19.0825,
    "lng": 72.8812
  },
  {
    "id": 11,
    "name": "Indian Institute of Science (IISc)",
    "location": "Bangalore, Karnataka",
    "courses": ["B.Sc.", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.9,
    "fees": "₹50,000 - ₹1,50,000 per year",
    "ranking": "NIRF Rank: #1",
    "website": "http://www.iisc.ac.in",
    "description": "IISc is a public, deemed, research university for higher education and research in science, engineering, and design.",
    "lat": 13.0219,
    "lng": 77.5678
  },
  {
    "id": 12,
    "name": "University of Madras",
    "location": "Chennai, Tamil Nadu",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹12,000 - ₹35,000 per year",
    "ranking": "NIRF Rank: #46",
    "website": "http://www.unom.ac.in",
    "description": "The University of Madras is a public state university in Chennai. It is one of the oldest and most well-regarded universities in India.",
    "lat": 13.0645,
    "lng": 80.2526
  },
  {
    "id": 13,
    "name": "Indian Institute of Technology Delhi (IIT Delhi)",
    "location": "New Delhi, Delhi",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹2,20,000 per year",
    "ranking": "NIRF Rank: #2",
    "website": "http://www.iitd.ac.in",
    "description": "IIT Delhi is a public engineering institution, consistently ranked among the top engineering colleges in India.",
    "lat": 28.5447,
    "lng": 77.1904
  },
  {
    "id": 14,
    "name": "Jawaharlal Nehru University (JNU)",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "M.A.", "M.Sc.", "M.Phil", "PhD"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹1,000 - ₹5,000 per year",
    "ranking": "NIRF Rank: #8",
    "website": "http://www.jnu.ac.in",
    "description": "JNU is a public central university known for its focus on social sciences and humanities.",
    "lat": 28.5413,
    "lng": 77.1601
  },
  {
    "id": 15,
    "name": "All India Institute of Medical Sciences (AIIMS)",
    "location": "New Delhi, Delhi",
    "courses": ["MBBS", "MD", "MS", "B.Sc. Nursing"],
    "type": "Public",
    "rating": 4.9,
    "fees": "₹5,000 - ₹10,000 per year",
    "ranking": "NIRF Rank: #1 (Medical)",
    "website": "http://www.aiims.edu",
    "description": "AIIMS Delhi is a public medical research university and hospital, considered the most prestigious medical college in India.",
    "lat": 28.5663,
    "lng": 77.2091
  },
  {
    "id": 16,
    "name": "Jamia Millia Islamia",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Sc.", "B.Tech", "B.Arch"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹10,000 - ₹60,000 per year",
    "ranking": "NIRF Rank: #10",
    "website": "http://www.jmi.ac.in",
    "description": "Jamia Millia Islamia is a public central university in Delhi, offering a wide range of courses.",
    "lat": 28.5615,
    "lng": 77.2801
  },
  {
    "id": 17,
    "name": "National Institute of Technology Karnataka (NITK)",
    "location": "Mangalore, Karnataka",
    "courses": ["B.Tech", "M.Tech", "MBA"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #12 (Engg)",
    "website": "http://www.nitk.ac.in",
    "description": "NITK is one of the premier technical institutions in India, located in Surathkal, Mangalore.",
    "lat": 13.0076,
    "lng": 74.7937
  },
  {
    "id": 18,
    "name": "Osmania University",
    "location": "Hyderabad, Telangana",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹8,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #48",
    "website": "http://www.osmania.ac.in",
    "description": "Osmania University is a public state university in Hyderabad, a major center for higher education.",
    "lat": 17.4116,
    "lng": 78.5283
  },
  {
    "id": 19,
    "name": "Government College of Technology",
    "location": "Coimbatore, Tamil Nadu",
    "courses": ["B.E.", "B.Tech", "M.E."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹20,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #108",
    "website": "http://www.gct.ac.in",
    "description": "GCT is a public engineering college in Coimbatore, known for its strong technical programs.",
    "lat": 11.0045,
    "lng": 76.9616
  },
  {
    "id": 20,
    "name": "Indian Institute of Management Bangalore (IIMB)",
    "location": "Bangalore, Karnataka",
    "courses": ["MBA", "PhD", "E-MBA"],
    "type": "Public",
    "rating": 4.9,
    "fees": "₹23,00,000 per course",
    "ranking": "NIRF Rank: #2 (Management)",
    "website": "http://www.iimb.ac.in",
    "description": "IIMB is a leading public business school in India, known for its world-class management programs.",
    "lat": 12.9372,
    "lng": 77.6148
  },
  {
    "id": 21,
    "name": "Panjab University",
    "location": "Chandigarh, Chandigarh",
    "courses": ["B.A.", "B.Sc.", "B.Pharm", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹10,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #44",
    "website": "http://www.pu.ac.in",
    "description": "Panjab University is a public collegiate university located in Chandigarh, known for its extensive range of courses.",
    "lat": 30.7672,
    "lng": 76.7876
  },
  {
    "id": 22,
    "name": "Government Medical College, Srinagar",
    "location": "Srinagar, Jammu and Kashmir",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹15,000 - ₹30,000 per year",
    "ranking": "N/A",
    "website": "http://www.gmcsrinagar.net",
    "description": "One of the oldest and most prestigious medical colleges in the Kashmir Valley.",
    "lat": 34.0772,
    "lng": 74.8105
  },
  {
    "id": 23,
    "name": "University of Jammu",
    "location": "Jammu, Jammu and Kashmir",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹8,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #106",
    "website": "http://www.jammuuniversity.ac.in",
    "description": "A public state university offering a wide array of programs in arts, sciences, and commerce.",
    "lat": 32.7352,
    "lng": 74.8697
  },
  {
    "id": 24,
    "name": "Government Engineering College, Jammu",
    "location": "Jammu, Jammu and Kashmir",
    "courses": ["B.E.", "B.Tech"],
    "type": "Public",
    "rating": 3.9,
    "fees": "₹40,000 - ₹80,000 per year",
    "ranking": "N/A",
    "website": "http://www.gcetjammu.org",
    "description": "A government-run engineering college offering various undergraduate engineering programs.",
    "lat": 32.7302,
    "lng": 74.8519
  },
  {
    "id": 25,
    "name": "Indian Institute of Management Jammu (IIM Jammu)",
    "location": "Jammu, Jammu and Kashmir",
    "courses": ["MBA", "PhD"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹16,00,000 per course",
    "ranking": "NIRF Rank: #19 (Management)",
    "website": "http://www.iimj.ac.in",
    "description": "A premier public business school in Jammu, known for its management and research programs.",
    "lat": 32.7397,
    "lng": 74.8879
  },
  {
    "id": 26,
    "name": "University of Kashmir",
    "location": "Srinagar, Jammu and Kashmir",
    "courses": ["B.A.", "B.Sc.", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹7,000 - ₹20,000 per year",
    "ranking": "NIRF Rank: #116",
    "website": "http://www.kashmiruniversity.net",
    "description": "A public university in Srinagar known for its arts and science disciplines.",
    "lat": 34.1205,
    "lng": 74.8016
  },
  {
    "id": 27,
    "name": "National Institute of Technology Srinagar (NIT Srinagar)",
    "location": "Srinagar, Jammu and Kashmir",
    "courses": ["B.Tech", "M.Tech", "M.Sc."],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #66 (Engg)",
    "website": "http://www.nitsri.ac.in",
    "description": "NIT Srinagar is a public technical institute offering various engineering programs.",
    "lat": 34.1167,
    "lng": 74.8117
  },
  {
    "id": 28,
    "name": "Sher-i-Kashmir Institute of Medical Sciences (SKIMS)",
    "location": "Srinagar, Jammu and Kashmir",
    "courses": ["MBBS", "MD", "MCh"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹20,000 - ₹40,000 per year",
    "ranking": "N/A",
    "website": "http://www.skims.ac.in",
    "description": "A premier medical institute and hospital in Srinagar, focusing on advanced medical education and research.",
    "lat": 34.137,
    "lng": 74.846
  },
  {
    "id": 29,
    "name": "Indira Gandhi National Open University (IGNOU)",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Com", "M.A.", "M.Sc.", "Diploma"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹2,000 - ₹15,000 per year",
    "ranking": "NIRF Rank: #141",
    "website": "http://www.ignou.ac.in",
    "description": "IGNOU is a public central university focused on distance education.",
    "lat": 28.5375,
    "lng": 77.2606
  },
  {
    "id": 30,
    "name": "College of Engineering, Pune (COEP)",
    "location": "Pune, Maharashtra",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹75,000 - ₹1,50,000 per year",
    "ranking": "NIRF Rank: #51 (Engg)",
    "website": "http://www.coep.org.in",
    "description": "COEP is a public engineering college in Pune, known for its long history and strong technical education.",
    "lat": 18.5307,
    "lng": 73.8446
  },
  {
    "id": 31,
    "name": "Savitribai Phule Pune University",
    "location": "Pune, Maharashtra",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹10,000 - ₹40,000 per year",
    "ranking": "NIRF Rank: #25",
    "website": "http://www.unipune.ac.in",
    "description": "A public state university offering a wide range of academic programs and research opportunities.",
    "lat": 18.5532,
    "lng": 73.8291
  },
  {
    "id": 32,
    "name": "Government Medical College, Aurangabad",
    "location": "Aurangabad, Maharashtra",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹25,000 - ₹50,000 per year",
    "ranking": "N/A",
    "website": "http://www.gmcaurangabad.ac.in",
    "description": "A public medical college known for its high-quality medical education.",
    "lat": 19.8631,
    "lng": 75.3409
  },
  {
    "id": 33,
    "name": "National Institute of Design (NID)",
    "location": "Ahmedabad, Gujarat",
    "courses": ["B.Des", "M.Des", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹2,50,000 per year",
    "ranking": "NIRF Rank: #1 (Design)",
    "website": "http://www.nid.edu",
    "description": "A public institution known for its design and innovation education.",
    "lat": 23.0338,
    "lng": 72.5447
  },
  {
    "id": 34,
    "name": "Indian Institute of Technology Gandhinagar (IITGN)",
    "location": "Gandhinagar, Gujarat",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #20",
    "website": "http://www.iitgn.ac.in",
    "description": "A public technical university in Gandhinagar, known for its interdisciplinary approach.",
    "lat": 23.2156,
    "lng": 72.6369
  },
  {
    "id": 35,
    "name": "Gujarat University",
    "location": "Ahmedabad, Gujarat",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹8,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.gujaratuniversity.ac.in",
    "description": "A public state university offering a variety of courses in arts, science, and commerce.",
    "lat": 23.0343,
    "lng": 72.5492
  },
  {
    "id": 36,
    "name": "Vellore Institute of Technology (VIT)",
    "location": "Vellore, Tamil Nadu",
    "courses": ["B.Tech", "M.Tech", "B.Sc."],
    "type": "Private",
    "rating": 4.4,
    "fees": "₹1,98,000 - ₹3,00,000 per year",
    "ranking": "NIRF Rank: #18",
    "website": "http://www.vit.ac.in",
    "description": "A private, deemed university focusing on engineering and technology.",
    "lat": 12.9165,
    "lng": 79.1325
  },
  {
    "id": 37,
    "name": "Indian Institute of Technology Bhubaneswar (IIT Bhubaneswar)",
    "location": "Bhubaneswar, Odisha",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #29",
    "website": "http://www.iitbbs.ac.in",
    "description": "An autonomous engineering and technology university in Bhubaneswar.",
    "lat": 20.1491,
    "lng": 85.6705
  },
  {
    "id": 38,
    "name": "Indian Institute of Technology Guwahati (IIT Guwahati)",
    "location": "Guwahati, Assam",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #7",
    "website": "http://www.iitg.ac.in",
    "description": "A public technical university in Guwahati, one of the top IITs in India.",
    "lat": 26.1924,
    "lng": 91.6961
  },
  {
    "id": 39,
    "name": "Guwahati Medical College",
    "location": "Guwahati, Assam",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹10,000 - ₹25,000 per year",
    "ranking": "N/A",
    "website": "http://www.gmch.ac.in",
    "description": "A public medical college offering undergraduate and postgraduate medical programs.",
    "lat": 26.1804,
    "lng": 91.7516
  },
  {
    "id": 40,
    "name": "King George's Medical University (KGMU)",
    "location": "Lucknow, Uttar Pradesh",
    "courses": ["MBBS", "BDS", "MD", "MS"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹20,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #11 (Medical)",
    "website": "http://www.kgmu.org",
    "description": "A public medical university known for its high standard of medical education.",
    "lat": 26.8524,
    "lng": 80.9168
  },
  {
    "id": 41,
    "name": "Indian Institute of Management Lucknow (IIM Lucknow)",
    "location": "Lucknow, Uttar Pradesh",
    "courses": ["MBA", "E-MBA", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹19,00,000 per course",
    "ranking": "NIRF Rank: #6 (Management)",
    "website": "http://www.iiml.ac.in",
    "description": "A top public business school known for its excellence in management education.",
    "lat": 26.8565,
    "lng": 80.9197
  },
  {
    "id": 42,
    "name": "Patna University",
    "location": "Patna, Bihar",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹5,000 - ₹20,000 per year",
    "ranking": "NIRF Rank: #151-200",
    "website": "http://www.patnauniversity.ac.in",
    "description": "A public state university offering a wide range of undergraduate and postgraduate courses.",
    "lat": 25.6178,
    "lng": 85.1539
  },
  {
    "id": 43,
    "name": "National Institute of Technology Patna (NIT Patna)",
    "location": "Patna, Bihar",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #56 (Engg)",
    "website": "http://www.nitp.ac.in",
    "description": "A public technical institute offering various engineering programs.",
    "lat": 25.6133,
    "lng": 85.168
  },
  {
    "id": 44,
    "name": "All India Institute of Medical Sciences (AIIMS) Patna",
    "location": "Patna, Bihar",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹15,000 - ₹30,000 per year",
    "ranking": "N/A",
    "website": "http://www.aiimspatna.org",
    "description": "A public medical college known for its medical education and research.",
    "lat": 25.5941,
    "lng": 85.143
  },
  {
    "id": 45,
    "name": "Indian Institute of Science Education and Research (IISER) Kolkata",
    "location": "Kolkata, West Bengal",
    "courses": ["B.S.", "B.S.-M.S.", "PhD"],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹50,000 - ₹1,00,000 per year",
    "ranking": "NIRF Rank: #24",
    "website": "http://www.iiserkol.ac.in",
    "description": "A public research institute for higher education and research in science.",
    "lat": 22.9557,
    "lng": 88.5283
  },
  {
    "id": 46,
    "name": "Pondicherry University",
    "location": "Puducherry, Puducherry",
    "courses": ["B.A.", "B.Sc.", "M.A.", "M.Sc.", "PhD"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹10,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #88",
    "website": "http://www.pondiuni.edu.in",
    "description": "A public central university offering a wide range of academic programs.",
    "lat": 12.0167,
    "lng": 79.8667
  },
  {
    "id": 47,
    "name": "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER)",
    "location": "Puducherry, Puducherry",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹5,000 - ₹20,000 per year",
    "ranking": "NIRF Rank: #5 (Medical)",
    "website": "http://www.jipmer.edu.in",
    "description": "A premier public medical institution and research center.",
    "lat": 11.9691,
    "lng": 79.8242
  },
  {
    "id": 48,
    "name": "Indian Institute of Technology Bhubaneswar (IIT Bhubaneswar)",
    "location": "Bhubaneswar, Odisha",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #29",
    "website": "http://www.iitbbs.ac.in",
    "description": "An autonomous engineering and technology university in Bhubaneswar.",
    "lat": 20.1491,
    "lng": 85.6705
  },
  {
    "id": 49,
    "name": "All India Institute of Medical Sciences (AIIMS) Bhubaneswar",
    "location": "Bhubaneswar, Odisha",
    "courses": ["MBBS", "B.Sc. Nursing"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹10,000 - ₹25,000 per year",
    "ranking": "N/A",
    "website": "http://www.aiimsbhubaneswar.nic.in",
    "description": "A public medical college and hospital known for medical education and research.",
    "lat": 20.2592,
    "lng": 85.8354
  },
  {
    "id": 50,
    "name": "Malaviya National Institute of Technology (MNIT)",
    "location": "Jaipur, Rajasthan",
    "courses": ["B.Tech", "M.Tech", "B.Arch"],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #37 (Engg)",
    "website": "http://www.mnit.ac.in",
    "description": "A public technical institution located in Jaipur, known for its engineering and architecture programs.",
    "lat": 26.864,
    "lng": 75.8087
  },
  {
    "id": 51,
    "name": "University of Rajasthan",
    "location": "Jaipur, Rajasthan",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹8,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.uniraj.ac.in",
    "description": "A public state university offering a wide range of academic courses.",
    "lat": 26.892,
    "lng": 75.808
  },
  {
    "id": 52,
    "name": "Indian Institute of Management Ahmedabad (IIMA)",
    "location": "Ahmedabad, Gujarat",
    "courses": ["MBA", "PhD"],
    "type": "Public",
    "rating": 4.9,
    "fees": "₹23,00,000 per course",
    "ranking": "NIRF Rank: #1 (Management)",
    "website": "http://www.iima.ac.in",
    "description": "A premier public business school in India, known for its world-class management programs.",
    "lat": 23.0337,
    "lng": 72.536
  },
  {
    "id": 53,
    "name": "Indian Institute of Technology Kanpur (IIT Kanpur)",
    "location": "Kanpur, Uttar Pradesh",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #4 (Engg)",
    "website": "http://www.iitk.ac.in",
    "description": "A public technical university in Kanpur, known for its research and engineering programs.",
    "lat": 26.5123,
    "lng": 80.2329
  },
  {
    "id": 54,
    "name": "University of Allahabad",
    "location": "Prayagraj, Uttar Pradesh",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹5,000 - ₹20,000 per year",
    "ranking": "NIRF Rank: #151-200",
    "website": "http://www.allduniv.ac.in",
    "description": "One of the oldest public universities in India, located in Prayagraj.",
    "lat": 25.4402,
    "lng": 81.8344
  },
  {
    "id": 55,
    "name": "Indian Institute of Technology Roorkee (IIT Roorkee)",
    "location": "Roorkee, Uttarakhand",
    "courses": ["B.Tech", "B.Arch", "M.Tech"],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #9 (Engg)",
    "website": "http://www.iitr.ac.in",
    "description": "A public engineering university in Roorkee, one of the oldest technical institutions in Asia.",
    "lat": 29.8732,
    "lng": 77.8967
  },
  {
    "id": 56,
    "name": "Govind Ballabh Pant University of Agriculture and Technology",
    "location": "Pantnagar, Uttarakhand",
    "courses": ["B.Sc. Agri", "B.Tech", "M.Sc."],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹30,000 - ₹70,000 per year",
    "ranking": "N/A",
    "website": "http://www.gbpuat.ac.in",
    "description": "A public agricultural university focusing on agricultural education and research.",
    "lat": 29.0227,
    "lng": 79.4447
  },
  {
    "id": 57,
    "name": "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
    "location": "Kharagpur, West Bengal",
    "courses": ["B.Tech", "B.Arch", "M.Tech"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #5 (Engg)",
    "website": "http://www.iitkgp.ac.in",
    "description": "One of the oldest and most prestigious IITs, known for its extensive campus and research.",
    "lat": 22.3146,
    "lng": 87.3096
  },
  {
    "id": 58,
    "name": "Visva-Bharati University",
    "location": "Santiniketan, West Bengal",
    "courses": ["B.A.", "B.Sc.", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹5,000 - ₹15,000 per year",
    "ranking": "NIRF Rank: #50",
    "website": "http://www.visvabharati.ac.in",
    "description": "A public central university founded by Rabindranath Tagore, known for its arts and humanities programs.",
    "lat": 23.6766,
    "lng": 87.6834
  },
  {
    "id": 59,
    "name": "Indian Institute of Technology Indore (IIT Indore)",
    "location": "Indore, Madhya Pradesh",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #10 (Engg)",
    "website": "http://www.iiti.ac.in",
    "description": "A public technical university in Indore, known for its quality engineering education.",
    "lat": 22.7533,
    "lng": 75.8937
  },
  {
    "id": 60,
    "name": "Maulana Azad National Institute of Technology (MANIT)",
    "location": "Bhopal, Madhya Pradesh",
    "courses": ["B.Tech", "M.Tech", "B.Arch"],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #76 (Engg)",
    "website": "http://www.manit.ac.in",
    "description": "A public technical institute offering a range of engineering and architecture courses.",
    "lat": 23.2599,
    "lng": 77.4126
  },
  {
    "id": 61,
    "name": "Indian Institute of Management Indore (IIM Indore)",
    "location": "Indore, Madhya Pradesh",
    "courses": ["MBA", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹20,00,000 per course",
    "ranking": "NIRF Rank: #8 (Management)",
    "website": "http://www.iimidr.ac.in",
    "description": "A public business school in Indore, known for its management programs.",
    "lat": 22.7196,
    "lng": 75.8577
  },
  {
    "id": 62,
    "name": "Maharaja Sayajirao University of Baroda",
    "location": "Vadodara, Gujarat",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹10,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.msubaroda.ac.in",
    "description": "A public state university offering a wide range of academic courses.",
    "lat": 22.3072,
    "lng": 73.1812
  },
  {
    "id": 63,
    "name": "Puducherry Technological University",
    "location": "Puducherry, Puducherry",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹40,000 - ₹80,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.ptue.edu.in",
    "description": "A public technical university in Puducherry.",
    "lat": 11.9338,
    "lng": 79.8242
  },
  {
    "id": 64,
    "name": "IIT Hyderabad",
    "location": "Hyderabad, Telangana",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #8 (Engg)",
    "website": "http://www.iith.ac.in",
    "description": "A public technical university located in Hyderabad, known for its research-focused curriculum.",
    "lat": 17.5855,
    "lng": 78.1189
  },
  {
    "id": 65,
    "name": "University of Hyderabad",
    "location": "Hyderabad, Telangana",
    "courses": ["M.A.", "M.Sc.", "PhD"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹10,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #15",
    "website": "http://www.uohyd.ac.in",
    "description": "A public central university offering a wide range of postgraduate and research programs.",
    "lat": 17.4526,
    "lng": 78.3308
  },
  {
    "id": 66,
    "name": "Andhra University",
    "location": "Visakhapatnam, Andhra Pradesh",
    "courses": ["B.A.", "B.Sc.", "B.Com", "B.Tech"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹10,000 - ₹40,000 per year",
    "ranking": "NIRF Rank: #36",
    "website": "http://www.andhrauniversity.edu.in",
    "description": "A public university offering various programs in arts, sciences, and engineering.",
    "lat": 17.737,
    "lng": 83.3101
  },
  {
    "id": 67,
    "name": "Indian Institute of Science Education and Research (IISER) Thiruvananthapuram",
    "location": "Thiruvananthapuram, Kerala",
    "courses": ["B.S.-M.S.", "PhD"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹50,000 - ₹1,00,000 per year",
    "ranking": "NIRF Rank: #30",
    "website": "http://www.iisertvm.ac.in",
    "description": "A public research institute focusing on basic sciences.",
    "lat": 8.5241,
    "lng": 76.9366
  },
  {
    "id": 68,
    "name": "National Institute of Technology Calicut (NITC)",
    "location": "Kozhikode, Kerala",
    "courses": ["B.Tech", "M.Tech", "B.Arch"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #31 (Engg)",
    "website": "http://www.nitc.ac.in",
    "description": "A public technical institute in Kozhikode, known for its engineering programs.",
    "lat": 11.3195,
    "lng": 75.9388
  },
  {
    "id": 69,
    "name": "Cochin University of Science and Technology (CUSAT)",
    "location": "Kochi, Kerala",
    "courses": ["B.Tech", "B.Sc.", "M.Sc.", "PhD"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹20,000 - ₹60,000 per year",
    "ranking": "NIRF Rank: #67",
    "website": "http://www.cusat.ac.in",
    "description": "A public university focusing on science and technology education.",
    "lat": 10.0401,
    "lng": 76.3263
  },
  {
    "id": 70,
    "name": "Indian Institute of Technology Palakkad (IIT Palakkad)",
    "location": "Palakkad, Kerala",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #64 (Engg)",
    "website": "http://www.iitpkd.ac.in",
    "description": "A public technical university in Palakkad.",
    "lat": 10.7867,
    "lng": 76.6543
  },
  {
    "id": 71,
    "name": "Goa University",
    "location": "Goa, Goa",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹10,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.unigoa.ac.in",
    "description": "A public state university offering a wide range of courses in arts, sciences, and commerce.",
    "lat": 15.4585,
    "lng": 73.8115
  },
  {
    "id": 72,
    "name": "Indira Gandhi National Tribal University",
    "location": "Amarkantak, Madhya Pradesh",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 3.9,
    "fees": "₹5,000 - ₹15,000 per year",
    "ranking": "N/A",
    "website": "http://www.igntu.ac.in",
    "description": "A public central university focusing on education for tribal communities.",
    "lat": 22.6781,
    "lng": 81.7588
  },
  {
    "id": 73,
    "name": "Maulana Azad College",
    "location": "Kolkata, West Bengal",
    "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹5,000 - ₹15,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.alanov.ac.in",
    "description": "A public college in Kolkata, one of the oldest and most reputed colleges in India.",
    "lat": 22.5714,
    "lng": 88.3615
  },
  {
    "id": 74,
    "name": "Indian Institute of Management Calcutta (IIMC)",
    "location": "Kolkata, West Bengal",
    "courses": ["MBA", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹22,00,000 per course",
    "ranking": "NIRF Rank: #3 (Management)",
    "website": "http://www.iimcal.ac.in",
    "description": "A premier public business school, known for its finance and management programs.",
    "lat": 22.4839,
    "lng": 88.3976
  },
  {
    "id": 75,
    "name": "Indian Statistical Institute (ISI)",
    "location": "Kolkata, West Bengal",
    "courses": ["B.Stat", "M.Stat", "M.Tech"],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹15,000 - ₹40,000 per year",
    "ranking": "NIRF Rank: #5 (Research)",
    "website": "http://www.isical.ac.in",
    "description": "A public research university and institute of national importance.",
    "lat": 22.6394,
    "lng": 88.3846
  },
  {
    "id": 76,
    "name": "Jawaharlal Nehru Centre For Advanced Scientific Research (JNCASR)",
    "location": "Bangalore, Karnataka",
    "courses": ["M.S.", "PhD"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹20,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #16 (Research)",
    "website": "http://www.jncasr.ac.in",
    "description": "A public research institute for advanced scientific research.",
    "lat": 13.0645,
    "lng": 77.5878
  },
  {
    "id": 77,
    "name": "Bangalore Medical College and Research Institute",
    "location": "Bangalore, Karnataka",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹25,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #36 (Medical)",
    "website": "http://www.bmcri.org",
    "description": "A public medical college and research institute in Bangalore.",
    "lat": 12.9691,
    "lng": 77.5753
  },
  {
    "id": 78,
    "name": "National Law School of India University (NLSIU)",
    "location": "Bangalore, Karnataka",
    "courses": ["B.A., LL.B.", "LL.M."],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹1,50,000 - ₹3,00,000 per year",
    "ranking": "NIRF Rank: #1 (Law)",
    "website": "http://www.nls.ac.in",
    "description": "A public law university and one of the most prestigious law schools in India.",
    "lat": 12.9234,
    "lng": 77.6083
  },
  {
    "id": 79,
    "name": "Indian Institute of Science Education and Research (IISER) Pune",
    "location": "Pune, Maharashtra",
    "courses": ["B.S.-M.S.", "PhD"],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹50,000 - ₹1,00,000 per year",
    "ranking": "NIRF Rank: #17",
    "website": "http://www.iiserpune.ac.in",
    "description": "A public research institute for higher education and research in science.",
    "lat": 18.5284,
    "lng": 73.8115
  },
  {
    "id": 80,
    "name": "Grant Government Medical College",
    "location": "Mumbai, Maharashtra",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹30,000 - ₹60,000 per year",
    "ranking": "NIRF Rank: #25 (Medical)",
    "website": "http://www.gmc.gov.in",
    "description": "A public medical college and hospital in Mumbai, one of the oldest in Asia.",
    "lat": 18.9669,
    "lng": 72.8273
  },
  {
    "id": 81,
    "name": "Veermata Jijabai Technological Institute (VJTI)",
    "location": "Mumbai, Maharashtra",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹80,000 - ₹1,50,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.vjti.ac.in",
    "description": "A public engineering college in Mumbai, known for its technical programs.",
    "lat": 19.0181,
    "lng": 72.8596
  },
  {
    "id": 82,
    "name": "All India Institute of Hygiene and Public Health",
    "location": "Kolkata, West Bengal",
    "courses": ["M.D.", "M.P.H.", "Ph.D."],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹15,000 - ₹30,000 per year",
    "ranking": "N/A",
    "website": "http://www.aiihph.gov.in",
    "description": "A public institution focusing on public health education and research.",
    "lat": 22.5693,
    "lng": 88.3582
  },
  {
    "id": 83,
    "name": "Indian Institute of Management Nagpur (IIMN)",
    "location": "Nagpur, Maharashtra",
    "courses": ["MBA", "PhD"],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹16,00,000 per course",
    "ranking": "NIRF Rank: #43 (Management)",
    "website": "http://www.iimnagpur.ac.in",
    "description": "A public business school in Nagpur, one of the new IIMs.",
    "lat": 21.0964,
    "lng": 79.083
  },
  {
    "id": 84,
    "name": "National Institute of Technology Raipur (NIT Raipur)",
    "location": "Raipur, Chhattisgarh",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #65 (Engg)",
    "website": "http://www.nitrr.ac.in",
    "description": "A public technical institute in Raipur, known for its engineering programs.",
    "lat": 21.2514,
    "lng": 81.6296
  },
  {
    "id": 85,
    "name": "Indira Gandhi Agricultural University",
    "location": "Raipur, Chhattisgarh",
    "courses": ["B.Sc. Agri", "M.Sc. Agri"],
    "type": "Public",
    "rating": 3.9,
    "fees": "₹10,000 - ₹25,000 per year",
    "ranking": "N/A",
    "website": "http://www.igau.edu.in",
    "description": "A public agricultural university focusing on agricultural education and research.",
    "lat": 21.2514,
    "lng": 81.6296
  },
  {
    "id": 86,
    "name": "National Institute of Technology Goa (NIT Goa)",
    "location": "Goa, Goa",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #90 (Engg)",
    "website": "http://www.nitgoa.ac.in",
    "description": "A public technical institution in Goa, known for its engineering programs.",
    "lat": 15.4851,
    "lng": 73.8242
  },
  {
    "id": 87,
    "name": "Goa College of Engineering",
    "location": "Goa, Goa",
    "courses": ["B.E.", "M.E."],
    "type": "Public",
    "rating": 3.9,
    "fees": "₹20,000 - ₹50,000 per year",
    "ranking": "N/A",
    "website": "http://www.gcoec.ac.in",
    "description": "A public engineering college in Goa.",
    "lat": 15.5132,
    "lng": 73.8821
  },
  {
    "id": 88,
    "name": "National Institute of Technology Kurukshetra (NIT Kurukshetra)",
    "location": "Kurukshetra, Haryana",
    "courses": ["B.Tech", "M.Tech", "MBA"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #50 (Engg)",
    "website": "http://www.nitkkr.ac.in",
    "description": "A public technical institute offering a variety of engineering and management programs.",
    "lat": 29.9678,
    "lng": 76.8117
  },
  {
    "id": 89,
    "name": "Maharishi Markandeshwar University",
    "location": "Ambala, Haryana",
    "courses": ["MBBS", "B.Tech", "B.Sc.", "BBA"],
    "type": "Private",
    "rating": 4.1,
    "fees": "₹1,00,000 - ₹5,00,000 per year",
    "ranking": "NIRF Rank: #101-150",
    "website": "http://www.mmumullana.org",
    "description": "A private, deemed university offering a wide range of courses.",
    "lat": 30.3807,
    "lng": 76.7865
  },
  {
    "id": 90,
    "name": "Indian Institute of Management Ranchi (IIM Ranchi)",
    "location": "Ranchi, Jharkhand",
    "courses": ["MBA", "PhD"],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹17,00,000 per course",
    "ranking": "NIRF Rank: #19 (Management)",
    "website": "http://www.iimranchi.ac.in",
    "description": "A public business school in Ranchi, known for its management programs.",
    "lat": 23.3441,
    "lng": 85.3096
  },
  {
    "id": 91,
    "name": "Birla Institute of Technology (BIT) Mesra",
    "location": "Ranchi, Jharkhand",
    "courses": ["B.Tech", "B.Arch", "M.Tech"],
    "type": "Private",
    "rating": 4.2,
    "fees": "₹1,50,000 - ₹2,50,000 per year",
    "ranking": "NIRF Rank: #31",
    "website": "http://www.bitmesra.ac.in",
    "description": "A private, deemed university focusing on engineering and technology.",
    "lat": 23.4158,
    "lng": 85.4219
  },
  {
    "id": 92,
    "name": "Indian Institute of Technology Dhanbad (IIT Dhanbad)",
    "location": "Dhanbad, Jharkhand",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #12 (Engg)",
    "website": "http://www.iitism.ac.in",
    "description": "A public technical university in Dhanbad, known for its mining and engineering programs.",
    "lat": 23.795,
    "lng": 86.4304
  },
  {
    "id": 93,
    "name": "National Institute of Technology Durgapur (NIT Durgapur)",
    "location": "Durgapur, West Bengal",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.1,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #47 (Engg)",
    "website": "http://www.nitdgp.ac.in",
    "description": "A public technical institute in Durgapur, known for its engineering programs.",
    "lat": 23.5516,
    "lng": 87.3119
  },
  {
    "id": 94,
    "name": "Indian Institute of Information Technology Guwahati (IIIT Guwahati)",
    "location": "Guwahati, Assam",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹1,50,000 per year",
    "ranking": "N/A",
    "website": "http://www.iiitg.ac.in",
    "description": "A public technical institute focusing on information technology and engineering.",
    "lat": 26.1924,
    "lng": 91.6961
  },
  {
    "id": 95,
    "name": "Indian Institute of Technology Tirupati (IIT Tirupati)",
    "location": "Tirupati, Andhra Pradesh",
    "courses": ["B.Tech", "M.Tech"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #59 (Engg)",
    "website": "http://www.iittp.ac.in",
    "description": "A public technical university in Tirupati, one of the newer IITs.",
    "lat": 13.6288,
    "lng": 79.4192
  },
  {
    "id": 96,
    "name": "All India Institute of Medical Sciences (AIIMS) Rishikesh",
    "location": "Rishikesh, Uttarakhand",
    "courses": ["MBBS", "B.Sc. Nursing"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹10,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #22 (Medical)",
    "website": "http://www.aiimsrishikesh.edu.in",
    "description": "A public medical college and hospital known for its medical education and research.",
    "lat": 30.0769,
    "lng": 78.2862
  },
  {
    "id": 97,
    "name": "Indian Institute of Technology Jodhpur (IIT Jodhpur)",
    "location": "Jodhpur, Rajasthan",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #30 (Engg)",
    "website": "http://www.iitj.ac.in",
    "description": "A public technical university in Jodhpur, known for its engineering programs.",
    "lat": 26.2829,
    "lng": 73.003
  },
  {
    "id": 98,
    "name": "University of Delhi, South Campus",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Sc.", "B.Com"],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹15,000 - ₹50,000 per year",
    "ranking": "N/A",
    "website": "http://www.south.du.ac.in",
    "description": "An integral part of the University of Delhi, offering a variety of undergraduate and postgraduate courses.",
    "lat": 28.5833,
    "lng": 77.1667
  },
  {
    "id": 99,
    "name": "Lady Hardinge Medical College",
    "location": "New Delhi, Delhi",
    "courses": ["MBBS", "MD", "MS"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹15,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #20 (Medical)",
    "website": "http://www.lhmc.in",
    "description": "A public medical college for women, one of the oldest and most prestigious in New Delhi.",
    "lat": 28.6369,
    "lng": 77.2064
  },
  {
    "id": 100,
    "name": "St. Stephen's College",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Sc."],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹25,000 - ₹50,000 per year",
    "ranking": "NIRF Rank: #4 (Colleges)",
    "website": "http://www.ststephens.edu",
    "description": "A constituent college of Delhi University, known for its academic rigor and arts and science programs.",
    "lat": 28.6835,
    "lng": 77.2144
  },
  {
    "id": 101,
    "name": "Shri Ram College of Commerce (SRCC)",
    "location": "New Delhi, Delhi",
    "courses": ["B.Com (Hons)", "B.A. (Hons) Eco"],
    "type": "Public",
    "rating": 4.8,
    "fees": "₹20,000 - ₹30,000 per year",
    "ranking": "NIRF Rank: #1 (Colleges)",
    "website": "http://www.srcc.edu",
    "description": "A premier college for commerce and economics, affiliated with Delhi University.",
    "lat": 28.6874,
    "lng": 77.2185
  },
  {
    "id": 102,
    "name": "Hindu College",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Sc.", "B.Com"],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹18,000 - ₹35,000 per year",
    "ranking": "NIRF Rank: #2 (Colleges)",
    "website": "http://www.hinducollege.ac.in",
    "description": "A constituent college of Delhi University, offering a wide range of arts, science, and commerce courses.",
    "lat": 28.6881,
    "lng": 77.2145
  },
  {
    "id": 103,
    "name": "Lady Shri Ram College for Women (LSR)",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Com", "B.Sc.", "B.El.Ed"],
    "type": "Public",
    "rating": 4.7,
    "fees": "₹18,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #5 (Colleges)",
    "website": "http://www.lsr.edu.in",
    "description": "A premier women's college affiliated with Delhi University, known for its academic excellence.",
    "lat": 28.5636,
    "lng": 77.2405
  },
  {
    "id": 104,
    "name": "National Law University, Delhi",
    "location": "New Delhi, Delhi",
    "courses": ["B.A., LL.B.", "LL.M."],
    "type": "Public",
    "rating": 4.6,
    "fees": "₹1,20,000 - ₹2,00,000 per year",
    "ranking": "NIRF Rank: #2 (Law)",
    "website": "http://www.nludelhi.ac.in",
    "description": "A public law university and one of the most prestigious law schools in India.",
    "lat": 28.5273,
    "lng": 77.2173
  },
  {
    "id": 105,
    "name": "Miranda House",
    "location": "New Delhi, Delhi",
    "courses": ["B.A.", "B.Sc."],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹15,000 - ₹25,000 per year",
    "ranking": "NIRF Rank: #3 (Colleges)",
    "website": "http://www.mirandahouse.ac.in",
    "description": "A constituent women's college of Delhi University, known for its academic excellence.",
    "lat": 28.6874,
    "lng": 77.2148
  },
  {
    "id": 106,
    "name": "G.B. Pant Institute of Post Graduate Medical Education & Research",
    "location": "New Delhi, Delhi",
    "courses": ["MD", "MS", "DM"],
    "type": "Public",
    "rating": 4.4,
    "fees": "₹10,000 - ₹30,000 per year",
    "ranking": "N/A",
    "website": "http://www.gbpimgr.delhi.gov.in",
    "description": "A public medical institute in New Delhi offering postgraduate medical education.",
    "lat": 28.625,
    "lng": 77.230
  },
  {
    "id": 107,
    "name": "Netaji Subhas University of Technology (NSUT)",
    "location": "New Delhi, Delhi",
    "courses": ["B.Tech", "M.Tech", "B.Arch"],
    "type": "Public",
    "rating": 4.3,
    "fees": "₹1,50,000 per year",
    "ranking": "NIRF Rank: #89",
    "website": "http://www.nsut.ac.in",
    "description": "A public technical university in New Delhi, known for its engineering programs.",
    "lat": 28.61,
    "lng": 77.03
  },
  {
    "id": 108,
    "name": "Delhi Technological University (DTU)",
    "location": "New Delhi, Delhi",
    "courses": ["B.Tech", "M.Tech", "BBA", "MBA"],
    "type": "Public",
    "rating": 4.5,
    "fees": "₹1,80,000 per year",
    "ranking": "NIRF Rank: #61",
    "website": "http://www.dtu.ac.in",
    "description": "A public engineering university in New Delhi, known for its engineering and management programs.",
    "lat": 28.749,
    "lng": 77.11
  },
  {
    "id": 109,
    "name": "IIT Mandi",
    "location": "Mandi, Himachal Pradesh",
    "courses": ["B.Tech", "M.Tech", "PhD"],
    "type": "Public",
    "rating": 4.2,
    "fees": "₹2,00,000 per year",
    "ranking": "NIRF Rank: #43 (Engg)",
    "website": "http://www.iitmandi.ac.in",
    "description": "A public technical university in Mandi, known for its research-focused curriculum.",
    "lat": 31.78,
    "lng": 76.97
  },
  {
    "id": 110,
    "name": "National Institute of Technology Hamirpur (NIT Hamirpur)",
    "location": "Hamirpur, Himachal Pradesh",
    "courses": ["B.Tech", "B.Arch", "M.Tech"],
    "type": "Public",
    "rating": 4.0,
    "fees": "₹1,25,000 per year",
    "ranking": "NIRF Rank: #99 (Engg)",
    "website": "http://www.nith.ac.in",
    "description": "A public technical institute offering a variety of engineering and architecture programs.",
    "lat": 31.69,
    "lng": 76.53
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

  // This is an unused useEffect from your original code.
  // I've kept it as you requested not to change anything unnecessarily.
  useEffect(() => {
    const handleScroll = () => {
      // setShowButton(window.scrollY > 300); // setShowButton is not defined
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // This is an unused function from your original code.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  // Effect to load hardcoded college data
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
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[48rem] h-[48rem] bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full opacity-20 blur-3xl animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 text-white">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-3">
            <BuildingOffice2Icon className="h-10 w-10" />
            College Directory
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Explore top colleges and universities based on your location, course preferences, and more.
          </p>
        </div>

        {/* Filters and Find Nearby Button */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                <MapPinIcon className="h-5 w-5 inline-block mr-1" />
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
                className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                <BookOpenIcon className="h-5 w-5 inline-block mr-1" />
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
                className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                <BuildingLibraryIcon className="h-5 w-5 inline-block mr-1" />
                Institution Type
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Types</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <button
              onClick={findNearbyColleges}
              disabled={isFindingLocation}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 transition-all duration-300"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              {isFindingLocation ? "Finding..." : "Find Nearby Colleges"}
            </button>
          </div>
          {locationError && <p className="mt-2 text-red-400 text-sm">{locationError}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* College List */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                Colleges ({filteredColleges.length})
              </h2>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {loading ? (
                <div className="p-8 text-center text-white/70">
                  Loading colleges...
                </div>
              ) : filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <div
                    key={college.id}
                    className={`p-4 cursor-pointer border-b border-white/10 transition-all duration-300 ${
                      selectedCollege?.id === college.id ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedCollege(college)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-white/10 flex items-center justify-center rounded-lg">
                        <span className="text-xl text-white/80 font-bold">{college.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{college.name}</h3>
                        <p className="text-white/70">{college.location}</p>
                        {userLocation && college.distance !== undefined && (
                          <p className="text-xs text-white/60">{college.distance.toFixed(2)} km away</p>
                        )}
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-yellow-400 font-semibold">{college.rating}</span>
                          <div className="flex space-x-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(college.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-white/70">
                  No colleges found matching your filters.
                  <button
                    className="mt-4 px-4 py-2 border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-black transition-all"
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
          </div>

          {/* Map and College Details */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Map Container */}
            <div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-2"
              style={{ height: "300px" }}
            >
              <div
                ref={mapRef}
                className="w-full h-full rounded-xl"
              />
            </div>

            {/* Selected College Details */}
            {selectedCollege ? (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6">
                <h2 className="text-white text-xl font-semibold mb-4">College Details</h2>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                  <div className="h-20 w-20 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AcademicCapIcon className="h-12 w-12 text-white/80" />
                  </div>
                  <div className="flex-1 text-white/80">
                    <h3 className="text-2xl font-bold text-white">{selectedCollege.name}</h3>
                    <p>{selectedCollege.location}</p>
                    <p className="mt-1">{selectedCollege.description}</p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>
                          <BuildingLibraryIcon className="h-5 w-5 inline-block mr-1" />
                          Type:
                        </strong>{" "}
                        {selectedCollege.type}
                      </div>
                      <div>
                        <strong>
                          <CheckBadgeIcon className="h-5 w-5 inline-block mr-1" />
                          Ranking:
                        </strong>{" "}
                        {selectedCollege.ranking}
                      </div>
                      <div>
                        <strong>
                          <CurrencyRupeeIcon className="h-5 w-5 inline-block mr-1" />
                          Fees:
                        </strong>{" "}
                        {selectedCollege.fees}
                      </div>
                      <div>
                        <strong>
                          <LinkIcon className="h-5 w-5 inline-block mr-1" />
                          Website:
                        </strong>{" "}
                        <a
                          href={selectedCollege.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
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
                            className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-x-4">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow font-semibold transition-all"
                      >
                        <AcademicCapIcon className="h-5 w-5" />
                        Apply Now
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded-lg shadow font-semibold transition-all"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        Download Brochure
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 text-center text-white/70">
                <BuildingOffice2Icon className="mx-auto h-12 w-12 mb-4" />
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