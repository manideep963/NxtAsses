// src/Assessment/DefaultQuestion.jsx
import React from 'react';

const DefaultQuestion = ({ question, onAnswer, selectedOption }) => {
  const handleOptionClick = (optionId) => {
    onAnswer(optionId);
  };

  return (
    <div className="space-y-3">
      {question.options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleOptionClick(option.id)}
          className={`w-full text-left p-4 rounded-md ${
            selectedOption === option.id
              ? 'bg-blue-100 border-2 border-blue-500'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default DefaultQuestion;