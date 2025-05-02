// src/Assessment/Assessment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultQuestion from './DefaultQuestion';
import ImageQuestion from './ImageQuestion';
import DropdownQuestion from './DropdownQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';



const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      
        const response = await fetch('https://apis.ccbp.in/assess/questions');
        const data = await response.json();
        setQuestions(data.questions);
        setLoading(false);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAnswerSubmit = (questionId, selectedOption) => {
    const updatedAnsweredQuestions = [...answeredQuestions];
    const existingAnswerIndex = updatedAnsweredQuestions.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      updatedAnsweredQuestions[existingAnswerIndex] = {
        questionId,
        selectedOption,
      };
    } else {
      updatedAnsweredQuestions.push({ questionId, selectedOption });
    }

    setAnsweredQuestions(updatedAnsweredQuestions);
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitAssessment = () => {
    const correctAnswers = answeredQuestions.filter((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      const correctOption = question.options.find(
        (option) => option.is_correct === 'true'
      );
      return answer.selectedOption === correctOption.id;
    });
  
    navigate('/results', {
      state: {
        totalQuestions: questions.length,
        correctAnswers: correctAnswers.length,
        answeredQuestions,
      },
    });
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (loading) return <div className="text-center py-10">Loading questions...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (questions.length === 0) return <div className="text-center py-10">No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

  const renderQuestionComponent = () => {
    switch (currentQuestion.options_type) {
      case 'IMAGE':
        return (
          <ImageQuestion
            question={currentQuestion}
            onAnswer={(optionId) =>
              handleAnswerSubmit(currentQuestion.id, optionId)
            }
            selectedOption={
              answeredQuestions.find(
                (answer) => answer.questionId === currentQuestion.id
              )?.selectedOption
            }
          />
        );
      case 'DROPDOWN':
        return (
          <DropdownQuestion
            question={currentQuestion}
            onAnswer={(optionId) =>
              handleAnswerSubmit(currentQuestion.id, optionId)
            }
            selectedOption={
              answeredQuestions.find(
                (answer) => answer.questionId === currentQuestion.id
              )?.selectedOption
            }
          />
        );
      case 'TRUE_FALSE':
        return (
          <TrueFalseQuestion
            question={currentQuestion}
            onAnswer={(optionId) =>
              handleAnswerSubmit(currentQuestion.id, optionId)
            }
            selectedOption={
              answeredQuestions.find(
                (answer) => answer.questionId === currentQuestion.id
              )?.selectedOption
            }
          />
        );
      default:
        return (
          <DefaultQuestion
            question={currentQuestion}
            onAnswer={(optionId) =>
              handleAnswerSubmit(currentQuestion.id, optionId)
            }
            selectedOption={
              answeredQuestions.find(
                (answer) => answer.questionId === currentQuestion.id
              )?.selectedOption
            }
          />
        );
    }
  };

  return (
    <>
    
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium">
              {currentQuestionIndex + 1}. {currentQuestion.question_text}
            </h2>
          </div>
          {renderQuestionComponent()}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next Question
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar with question navigation */}
      <div className="md:w-80 bg-white p-4 border-l">
        <div className="mb-4 bg-blue-600 text-white p-4 rounded">
          <div className="font-bold text-center">Time Left</div>
          <div className="text-2xl text-center">{formatTime(timeLeft)}</div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2">
              {answeredQuestions.length}
            </div>
            <span>Answered Questions</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              {questions.length - answeredQuestions.length}
            </div>
            <span>Unanswered Questions</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Questions ({questions.length})</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionNavigation(index)}
                className={`w-full h-10 rounded-md flex items-center justify-center ${
                  answeredQuestions.some(
                    (answer) => answer.questionId === questions[index].id
                  )
                    ? 'bg-purple-600 text-white'
                    : index === currentQuestionIndex
                    ? 'border-2 border-blue-500 bg-blue-100'
                    : 'bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmitAssessment}
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
          Submit Assessment
        </button>
      </div>
    </div>
          
          </>
  );
};

export default Assessment;