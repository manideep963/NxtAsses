import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/Group.png";
import logo from "../assets/Group 8004.png";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 p-4 flex justify-between items-center">
        <div className="flex items-center text-white text-xl font-bold">
          <img src={logo}  className="h-8 mr-2" /> 
          
        </div>
        <button
          onClick={handleLogout}
          className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-blue-900 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 px-4">
        {/* Instruction Box */}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full mb-8 md:mb-0 md:mr-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-900">Instructions</h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-2">
            <li><strong>Total Questions:</strong> 10</li>
            <li><strong>Types of Questions:</strong> MCQs</li>
            <li><strong>Duration:</strong> 10 Mins</li>
            <li><strong>Marking Scheme:</strong> Every correct response gets 1 mark</li>
            <li>All progress will be lost if you reload during the assessment.</li>
          </ul>
          <button
            onClick={handleStartAssessment}
            className="bg-blue-900 text-white mt-6 py-2 px-6 rounded hover:bg-blue-800 transition"
          >
            Start Assessment
          </button>
        </div>

        {/* Image */}
        <img
          src={img1} // <-- You can replace with your image
          
          className="max-w-md"
        />
      </div>
    </div>
  );
}
