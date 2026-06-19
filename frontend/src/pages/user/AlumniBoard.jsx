import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import AlumniCard from "../../components/AlumniCard.jsx"; 
import axios from "axios";
import { motion } from "framer-motion";

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = alumniList.filter(
      (alumnus) =>
        alumnus.name.toLowerCase().includes(query) ||
        alumnus.profession?.toLowerCase().includes(query) ||
        alumnus.location?.toLowerCase().includes(query)
    );
    setFilteredAlumni(filtered);
  }, [searchQuery, alumniList]);


const AlumniBoard = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [filteredAlumni,setFilteredAlumni] =  useState([]);
  const [searchQuery, setSearchQuery] = useState("");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get("http://localhost:8001/alumni/get-all-alumni");
        console.log(data);
        setAlumniList(data);
        setFilteredAlumni(data);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  // Search filter
  useEffect(() => {
    const fetchSearchedAlumni = async () => {
      if (searchQuery.trim() === "") {
        // If search empty → show all alumni
        try {
          setFilteredAlumni(alumniList);
        } catch (err) {
          console.error("Error fetching alumni:", err);
        }
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8001/alumni/search-alumni?query=${encodeURIComponent(searchQuery)}`
        );
        setFilteredAlumni(data.data);
      } catch (err) {
        console.error("Error searching alumni:", err);
      } finally {
        setLoading(false);
      }
    };
     
    // debounce → wait 500ms after typing before calling API
    const debounceTimer = setTimeout(() => {
      fetchSearchedAlumni();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery,alumniList]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                    relative overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')]"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
            Connect With Alumni
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Search and connect with alumni by name, profession, or location
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-3 justify-center items-center">
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 text-lg" />
            <input
              type="text"
              placeholder="Search by name, profession, or location..."
              className="w-full pl-12 pr-4 py-3 rounded-full shadow-md 
                         bg-white/70 dark:bg-gray-800/70 
                         backdrop-blur-md border border-white/20 
                         text-gray-800 dark:text-gray-200 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         transition duration-200 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full 
                             bg-white/60 dark:bg-gray-700/60 
                             backdrop-blur-md border border-white/20 
                             text-gray-700 dark:text-gray-200 
                             shadow-md hover:shadow-lg 
                             transition-all duration-200">
            <FiFilter /> Filters
          </button>
        </div>

        {/* Alumni Grid */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredAlumni.length > 0 ? (
              filteredAlumni.map((alumni) => (
                 <motion.div
          key={alumni._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          // className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-4"
        >
          {/* Header */}
          <AlumniCard key={alumni._id} alumni={alumni} />
        </motion.div>
                
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center col-span-full">
                No matching alumni found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default AlumniBoard;
