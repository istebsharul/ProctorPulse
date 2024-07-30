import React from 'react';

const QuestionNavigation = ({ currentQuestion, totalQuestions, onQuestionClick }) => {
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="flex justify-center p-2">
      {questionNumbers.map((number) => (
        <div
          key={number}
          className={`w-10 h-10 mx-1 flex justify-center items-center rounded-full cursor-pointer transition-colors text-black shadow-inner-md ${
            number === currentQuestion ? 'bg-white' : 'bg-purple-300'
          }`}
          onClick={() => onQuestionClick(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default QuestionNavigation;