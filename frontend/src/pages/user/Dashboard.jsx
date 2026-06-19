import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, CalendarDays, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// StatCard Component
const StatCard = ({ title, icon, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4"
  >
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-gray-300 text-sm">{title}</p>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
  </motion.div>
);

// AlumniCard Component
const AlumniCard = ({ name, position, company }) => (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      {position} at {company}
    </p>
    <button
      className="mt-2 text-sm text-blue-600 hover:underline"
      onClick={() => toast.success(`Connection request sent to ${name}`)}
    >
      Connect
    </button>
  </div>
);

// EventCard Component
const EventCard = ({ title, date, time }) => (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      {date} at {time}
    </p>
    <button
      className="mt-2 text-sm text-blue-600 hover:underline"
      onClick={() => toast.info(`You opened event: ${title}`)}
    >
      View Details
    </button>
  </div>
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDashboardData({
        name: 'Vikrant',
        appliedJobsCount: 3,
        upcomingEvents: [
          { title: 'Tech Talk: AI in 2025', date: 'Aug 12', time: '4:00 PM' }
        ],
        suggestedAlumni: [
          { name: 'Rahul Mehta', position: 'Software Engineer', company: 'Google' },
          { name: 'Sneha Verma', position: 'UX Designer', company: 'Adobe' }
        ],
        profileCompletion: '80%'
      });

      toast.success('Welcome to your Dashboard!');
    }, 1000);
  }, []);

  if (!dashboardData) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-300 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {dashboardData.name}! 🎓
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Applied Jobs" value={dashboardData.appliedJobsCount} icon={<Briefcase />} />
        <StatCard title="Upcoming Events" value={dashboardData.upcomingEvents.length} icon={<CalendarDays />} />
        <StatCard title="Suggested Alumni" value={dashboardData.suggestedAlumni.length} icon={<UserPlus />} />
        <StatCard title="Profile Completion" value={dashboardData.profileCompletion} icon={<CheckCircle2 />} />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Suggested Alumni to Connect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.suggestedAlumni.map((alum, index) => (
            <AlumniCard key={index} {...alum} />
          ))}
        </div>
        <Link to="/student/connect" className="text-blue-600 dark:text-blue-400 mt-3 block text-sm">
          See all alumni →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.upcomingEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <Link to="/student/events" className="text-blue-600 dark:text-blue-400 mt-3 block text-sm">
          View all events →
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Link to="/student/jobs">
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            Explore Job Board
          </button>
        </Link>
        <Link to="/student/profile/edit">
          <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition dark:hover:bg-gray-800">
            Edit Your Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
