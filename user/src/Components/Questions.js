import React, { useState, useEffect } from 'react'; // Import useState and useEffect

const Questions = ({ questions = [], currentQuestionIndex, handlePrev, handleNext }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    if (questions.length === 0) {
        console.log("Questions are Empty");
        return <div>Questions are Empty...</div>; // Or another loading state indicator
    }

    const currentQuestion = questions[currentQuestionIndex];

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
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Questions;