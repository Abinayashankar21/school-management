"use client";

import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import schoolBusAnimation from "@/animations/schoolBus.json";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 via-teal-100 to-cyan-100 text-gray-900">

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-16">

      
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-md text-blue-800">
            🎓 School Management
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl">
            "Explore the best schools, manage your institutions, and find excellence near you."
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">

        
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition transform">
            <h2 className="text-2xl font-semibold text-green-700"> Add School</h2>
            <p className="text-center text-gray-700">
              Add new schools to keep your database updated.
            </p>
            <button
              onClick={() => router.push("/addSchool")}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-lg hover:opacity-90 transition transform"
            >
              Add School
            </button>
          </div>

        
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition transform">
            <h2 className="text-2xl font-semibold text-teal-700">Show Schools</h2>
            <p className="text-center text-gray-700">
              Explore and view details of all schools professionally.
            </p>
            <button
              onClick={() => router.push("/showSchools")}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-lg shadow-lg hover:opacity-90 transition transform"
            >
              Explore Schools
            </button>
          </div>

        </div>
      </div>

    
      <div className="absolute bottom-16 text-gray-600 text-sm text-center w-full">
        © 2025 School Management ™
      </div>

      
      <div className="absolute bottom-0 left-[-200px] w-40 sm:w-60 z-20 animate-bus">
        <Lottie animationData={schoolBusAnimation} loop autoplay />
      </div>

    
      <style jsx>{`
        @keyframes busMove {
          0% { left: -200px; }
          100% { left: 100%; }
        }
        .animate-bus {
          position: absolute;
          animation: busMove 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
