import React, { useState, useEffect } from 'react';

const Questions = ({ questions = [], currentQuestionIndex, handlePrev, handleNext, onTestEnd, updateSelectedOptions }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        if (seconds === 0) {
            onTestEnd(); // Trigger the end of the test
            return;
        }

        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [seconds, onTestEnd]);

    useEffect(() => {
        setSelectedOption(null); // Clear selected option when moving to a new question
    }, [currentQuestionIndex]);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
        updateSelectedOptions(currentQuestionIndex, index); // Update selected options in the parent component
    };

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    if (questions.length === 0) {
        return <div>Questions are Empty...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
                <div className="bg-purple-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                    {formatTime(seconds)}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {currentQuestion.options.map((option, index) => (
                    <label
                        key={index}
                        className={`flex items-center bg-gray-200 p-4 rounded-lg cursor-pointer ${index === selectedOption ? 'bg-gray-300' : ''}`}
                    >
                        <input
                            type="radio"
                            name="option"
                            className="mr-2"
                            checked={index === selectedOption}
                            onChange={() => handleOptionChange(index)}
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handlePrev}
                    disabled={isFirstQuestion}
                    className={`text-white font-bold py-2 px-4 rounded-lg ${isFirstQuestion ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600'}`}
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    disabled={isLastQuestion}
                    className={`text-white font-bold py-2 px-4 rounded-lg ${isLastQuestion ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Questions;
