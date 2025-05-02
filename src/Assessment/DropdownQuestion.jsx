// src/Assessment/DropdownQuestion.jsx
import React from 'react';

const DropdownQuestion = ({ question, onAnswer, selectedOption }) => {
  const handleChange = (e) => {
    onAnswer(e.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <select
        value={selectedOption || ''}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select an option
        </option>
        {question.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div className="mt-2 text-sm text-yellow-600">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            First option is selected by default
          </span>
        </div>
      )}
    </div>
  );
};

export default DropdownQuestion;