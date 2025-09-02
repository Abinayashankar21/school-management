"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import studentsAnimationData from "@/animations/students.json";

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/schools");
        const data = await res.json();
        setSchools(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const states = [...new Set(schools.map((s) => s.state?.trim()).filter(Boolean))];

  useEffect(() => {
    let result = schools;
    if (selectedState) result = result.filter((s) => s.state?.trim() === selectedState);
    if (search.trim()) result = result.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, selectedState, schools]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 overflow-hidden">
      
      {/* Lottie Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Lottie animationData={studentsAnimationData} loop autoplay />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-4 sm:mb-0">
            🎓 Explore Schools
          </h1>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Home
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by school name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value.trim())}
            className="w-full sm:w-1/4 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All States</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          {(search || selectedState) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedState("");
              }}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Loading / Cards */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition cursor-pointer flex flex-col"
              >
                {/* Zoom-in image effect */}
                <div className="overflow-hidden">
                  {school.image && (
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-indigo-700 mb-2">{school.name}</h2>
                  <p className="text-gray-600">{school.address}</p>
                  <p className="text-gray-500 mb-4">{school.city}</p>
                  <button
                    onClick={() => setSelectedSchool(school)}
                    className="mt-auto px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No schools match your search/filter.
          </p>
        )}
      </div>

      {/* Modal for school details */}
      {selectedSchool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedSchool(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✖
            </button>
            {selectedSchool.image && (
              <img
                src={selectedSchool.image}
                alt={selectedSchool.name}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
            )}
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">{selectedSchool.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Address:</strong> {selectedSchool.address}</p>
            <p className="text-gray-700 mb-1"><strong>City:</strong> {selectedSchool.city}</p>
            <p className="text-gray-700 mb-1"><strong>State:</strong> {selectedSchool.state}</p>
            <p className="text-gray-700 mb-1"><strong>Contact:</strong> {selectedSchool.contact}</p>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {selectedSchool.email_id}</p>
          </div>
        </div>
      )}
    </div>
  );
}
