import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Questions from '../Components/Questions';
import { get_test_details } from '../Actions/testAction';

const QuizPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const userId = auth.user ? auth.user._id : null;
    const testId = "6693e147ef5b4e110e774af8";
    const testData = useSelector(state => state.test || {});
    const questions = useMemo(() => testData.test || [], [testData]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(get_test_details(userId, testId))
            .then(() => setLoading(false))
            .catch(error => {
                console.info(`userId: ${userId} and testId: ${testId}`);
                console.error('Error fetching questions:', error);
                setLoading(false);
            });
    }, [dispatch, userId, testId]);

    useEffect(() => {
        if (questions.length > 0) {
            const initialOptions = questions.map(question => ({
                questionId: question._id,
                answer: -1
            }));
            setSelectedOptions(initialOptions);
        }
    }, [questions]);

    const handlePrev = () => {
        if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleTestEnd = async () => {
        alert('The test has ended!');
        try {
            const response = await axios.post(`/api/user/${userId}/test/${testId}/submit`, { answers: selectedOptions });
            console.log(`selected options: ${JSON.stringify(selectedOptions)}`)
            console.log('Test submitted successfully:', response.data);
            navigate('/'); 
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const updateSelectedOptions = useCallback((questionIndex, optionIndex) => {
        setSelectedOptions(prevOptions => 
            prevOptions.map((option, index) =>
                index === questionIndex ? { ...option, answer: optionIndex } : option
            )
        );
    }, []);

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
                                currentQuestionIndex === index ? 'bg-white text-purple-500' : 'bg-purple-700'
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
                    onTestEnd={handleTestEnd}
                    updateSelectedOptions={updateSelectedOptions}
                />
            </main>
            <footer className="w-full bg-purple-500 p-4 text-white flex justify-between items-center">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleTestEnd}>
                    End Test
                </button>
            </footer>
        </div>
    );
};

export default QuizPage;
