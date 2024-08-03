import React from 'react';

const QuestionAnalysis = ({ question, options, selectedOption, correctOption }) => {
  return (
    <div className="bg-purple-100 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-4">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = correctOption === index;
          const bgColor = isSelected ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white';

          return (
            <button
              key={index}
              className={`p-2 rounded-lg border text-left ${bgColor} ${isSelected && 'text-white'}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionAnalysis;
