"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import studentsAnimationData from "@/animations/students.json";

export default function AddSchoolPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        formData.append("image", value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("School added successfully!");
        reset();
      } else {
        setMessage(result.error || " Failed to add school");
      }
    } catch (err) {
      console.error(err);
      setMessage(" Error while saving school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Lottie Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <Lottie animationData={studentsAnimationData} loop autoplay />
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 text-center">
           Add School
        </h1>

        {message && (
          <p
            className={`text-center font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* School Name */}
          <input
            type="text"
            placeholder="School Name"
            {...register("name", { required: "School name is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          {/* City */}
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}

          {/* State */}
          <input
            type="text"
            placeholder="State"
            {...register("state", { required: "State is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}

          {/* Contact Number */}
          <input
            type="text"
            placeholder="Contact Number"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email ID"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email_id && (
            <p className="text-red-500 text-sm">{errors.email_id.message}</p>
          )}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "School image is required" })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 font-semibold text-white rounded-lg shadow-lg transition transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105"
            }`}
          >
            {loading ? "Saving..." : "Save School"}
          </button>
        </form>

        <button
          onClick={() => router.push("/")}
          className="w-full py-3 mt-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
           Back to Home
        </button>
      </div>
    </div>
  );
}
