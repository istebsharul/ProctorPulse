const Questions = ({ questions = [], currentQuestionIndex, handlePrev, handleNext }) => {
    if (questions.length === 0) {
        console.log("Qestion is Empty")
        return <div>Question is Empty...</div>; // Or another loading state indicator
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{questions[currentQuestionIndex].text}</h2>
                <div className="bg-purple-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                    00:59
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <label
                        key={index}
                        className={`flex items-center bg-gray-200 p-4 rounded-lg cursor-pointer`}
                    >
                        <input
                            type="radio"
                            name="option"
                            className="mr-2"
                            checked={index === questions[currentQuestionIndex].selectedOption}
                            onChange={() => {}}
                            disabled // Disable radio button, remove this if you want to enable selection
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