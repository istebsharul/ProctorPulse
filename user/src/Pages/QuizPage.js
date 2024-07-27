import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Questions from '../Components/Questions'; // Adjust path as per your project structure
import { get_test_details } from '../Actions/testAction'; // Adjust path as per your project structure

const QuizPage = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const userId = auth.user ? auth.user._id : null;
    // const testId = useSelector(state => state.test.id);
    const testId = "6693e147ef5b4e110e774af8"
    const questions = useSelector(state => state.test.questions); // Assuming 'test' is the slice of state containing questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    
    console.log('userId from state:', userId);
    console.log('testId from state:', testId); 
    console.log(`Questions: ${questions}`)

    useEffect(() => {
        console.log('User ID:', userId);
        console.log('Test ID:', testId);
        setLoading(true);
        
        // Simulate userId for testing purposes

        dispatch(get_test_details(userId, testId))
            .then(() => setLoading(false))
            .catch(error => {
                console.info(`userId: ${userId} and testId: ${testId}`)
                console.error('Error fetching questions:', error);
                setLoading(false);
            });
    }, [dispatch, userId, testId]);

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-purple-100 flex flex-col items-center">
            <header className="w-full bg-purple-500 p-4 text-white flex items-center justify-between">
                <div className="flex space-x-2">
                    {questions.map((_, index) => (
                        <button
                            key={index}
                            className={`w-8 h-8 rounded-full ${
                                currentQuestionIndex === index
                                    ? 'bg-white text-purple-500'
                                    : 'bg-purple-700'
                            }`}
                            onClick={() => setCurrentQuestionIndex(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className="bg-purple-700 text-white text-sm font-bold py-1 px-3 rounded-full">
                    19:40
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center w-full p-4">
                <Questions
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            </main>
            <footer className="w-full bg-purple-500 p-4 text-white flex justify-between items-center">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                    End Test
                </button>
            </footer>
        </div>
    );
};

export default QuizPage;