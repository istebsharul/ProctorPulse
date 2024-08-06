import React from 'react';

const QuestionAnalysis = ({ question, options, selectedOption, correctOption }) => {
  return (
    <div className="bg-purple-100 p-8 rounded-lg mb-4">
      <h2 className="text-lg mb-4 font-poppins">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => {
          console.log("Index",index);
          console.log("Selected Option",selectedOption);
          console.log("Correct Option",correctOption);
          const isSelected = selectedOption === index;
          const isCorrect = correctOption === index;
          const bgColor = isSelected ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white';
          const borderColor = isCorrect ? 'border-2 border-green-500':'';
          console.log("Is Correct",isCorrect);

          return (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg border text-left ${borderColor} ${bgColor} ${isSelected && 'text-white'}`}
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
