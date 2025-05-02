// src/Assessment/TrueFalseQuestion.jsx
import React from 'react';

const TrueFalseQuestion = ({ question, onAnswer, selectedOption }) => {
  const handleOptionClick = (optionId) => {
    onAnswer(optionId);
  };

  // Find the true and false options
  const trueOption = question.options.find(option => option.text.toLowerCase() === 'true');
  const falseOption = question.options.find(option => option.text.toLowerCase() === 'false');

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleOptionClick(trueOption.id)}
        className={`flex-1 py-3 rounded-md ${
          selectedOption === trueOption.id
            ? 'bg-blue-100 border-2 border-blue-500'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        True
      </button>
      <button
        onClick={() => handleOptionClick(falseOption.id)}
        className={`flex-1 py-3 rounded-md ${
          selectedOption === falseOption.id
            ? 'bg-blue-100 border-2 border-blue-500'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        False
      </button>
    </div>
  );
};

export default TrueFalseQuestion;