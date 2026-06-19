// components/JobBoard.jsx
import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, IndianRupee, Clock, ExternalLink, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import JobCard from "../../components/JobCard";
import axios from "axios";

const dummyJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    company: "TCS",
    location: "Bangalore, India",
    jobType: "Full-time",
    description: "We're looking for a React developer with experience in building modern UIs...",
    applyLink: "https://careers.tcs.com/apply/12345",
    salaryRange: "₹8 LPA - ₹12 LPA",
    postedBy: {
      name: "Vikrant Kushwaha",
    },
    createdAt: "2025-08-05T10:00:00Z",
    expiresAt: "2025-09-01T00:00:00Z"
  },
  {
    _id: "2",
    title: "Data Analyst Intern",
    company: "Flipkart",
    location: "Remote",
    jobType: "Internship",
    description: "We’re hiring a data intern to support our analytics team with insights...",
    applyLink: "https://flipkart.com/jobs/45678",
    salaryRange: "₹15,000/month",
    postedBy: {
      name: "Priya Mehra",
    },
    createdAt: "2025-08-01T09:30:00Z",
    expiresAt: null
  },
  {
    _id: "3",
    title: "Backend Engineer",
    company: "Amazon",
    location: "Hyderabad, India",
    jobType: "Full-time",
    description: "Join our backend engineering team to work on scalable microservices with Node.js...",
    applyLink: "https://amazon.jobs/78901",
    salaryRange: "₹15 LPA - ₹20 LPA",
    postedBy: {
      name: "Arjun Desai",
    },
    createdAt: "2025-07-30T12:00:00Z",
    expiresAt: "2025-08-30T00:00:00Z"
  },
  {
    _id: "4",
    title: "UI/UX Designer",
    company: "Zomato",
    location: "Gurgaon, India",
    jobType: "Contract",
    description: "We're seeking a creative designer to improve the usability and design of our food delivery app.",
    applyLink: "https://zomato.com/careers/123",
    salaryRange: "₹6 LPA - ₹10 LPA",
    postedBy: {
      name: "Megha Kapoor",
    },
    createdAt: "2025-08-02T15:00:00Z",
    expiresAt: null
  },
  {
    _id: "5",
    title: "Machine Learning Engineer",
    company: "Google",
    location: "Bangalore, India",
    jobType: "Full-time",
    description: "Work on cutting-edge ML models for real-world Google products.",
    applyLink: "https://careers.google.com/ml-eng/456",
    salaryRange: "₹25 LPA - ₹40 LPA",
    postedBy: {
      name: "Rahul Verma",
    },
    createdAt: "2025-07-25T11:00:00Z",
    expiresAt: "2025-09-10T00:00:00Z"
  },
  {
    _id: "6",
    title: "Digital Marketing Specialist",
    company: "BYJU’S",
    location: "Remote",
    jobType: "Part-time",
    description: "Looking for a marketing professional to manage campaigns across social platforms.",
    applyLink: "https://byjus.com/careers/marketing-234",
    salaryRange: "₹25,000/month",
    postedBy: {
      name: "Sneha Iyer",
    },
    createdAt: "2025-08-04T09:00:00Z",
    expiresAt: null
  },
  {
    _id: "7",
    title: "DevOps Engineer",
    company: "Infosys",
    location: "Pune, India",
    jobType: "Full-time",
    description: "Looking for an experienced DevOps engineer to manage CI/CD pipelines and cloud infrastructure.",
    applyLink: "https://infosys.com/careers/devops",
    salaryRange: "₹12 LPA - ₹18 LPA",
    postedBy: {
      name: "Aman Joshi",
    },
    createdAt: "2025-08-06T08:30:00Z",
    expiresAt: "2025-08-31T00:00:00Z"
  },
  {
    _id: "8",
    title: "Content Writer",
    company: "Unacademy",
    location: "Remote",
    jobType: "Part-time",
    description: "We need educational content writers with expertise in school-level math and science.",
    applyLink: "https://unacademy.com/jobs/567",
    salaryRange: "₹20,000/month",
    postedBy: {
      name: "Isha Rawat",
    },
    createdAt: "2025-08-07T10:30:00Z",
    expiresAt: null
  }
];

const JobBoard = () => {
  const [jobs,setJobs] =  useState([]);
 const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8001/jobs/");
      setJobs(data.data);
    } catch (err) {
      console.error("Error fetching jobs: ", err);
    } finally {
      setLoading(false);
    }
  };
  fetchJobs();
}, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">Job Board</h1>

      {loading ? (
  <p className="text-center text-gray-500">Loading jobs...</p>
) : jobs.length === 0 ? (
  <p className="text-center text-gray-500">No jobs available</p>
) : (jobs.map((job) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-4"
        >
          {/* Header */}
          <JobCard job={job}></JobCard>
        </motion.div>
      ))
      )}
    </div>
  );
};

export default JobBoard;
