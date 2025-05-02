// src/Assessment/ImageQuestion.jsx
import React from 'react';

const ImageQuestion = ({ question, onAnswer, selectedOption }) => {
  const handleOptionClick = (optionId) => {
    onAnswer(optionId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleOptionClick(option.id)}
          className={`p-4 rounded-md border-2 ${
            selectedOption === option.id
              ? 'border-blue-500 bg-blue-100'
              : 'border-gray-200 hover:bg-gray-100'
          }`}
        >
          <div className="flex justify-center mb-3">
            <img 
              src={option.image_url} 
              alt={option.text} 
              className="max-h-40 object-contain" 
            />
          </div>
          <div className="text-center">{option.text}</div>
        </button>
      ))}
    </div>
  );
};

export default ImageQuestion;