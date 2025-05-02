import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { totalQuestions, correctAnswers, answeredQuestions } = state || {};

  if (!state) {
    return (
      <div className="text-center py-10">
        <p>No assessment data found.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Go Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Assessment Result</h1>
        <p className="text-lg mb-2">You answered {correctAnswers} out of {totalQuestions} correctly.</p>
        <p className="text-sm text-gray-500">{answeredQuestions.length} questions attempted.</p>
        <button onClick={() => navigate('/')} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Home</button>
      </div>
    </div>
  );
};

export default ResultPage;
