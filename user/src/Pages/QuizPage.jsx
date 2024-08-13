import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Questions from '../Components/Questions';
import QuestionNavigation from '../Components/QuestionNavigation';
import { get_test_details } from '../Actions/testAction';
import logo from '../Assets/profile.png';

const QuizPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const testId = queryParams.get('testId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const userId = auth.user ? auth.user._id : null;
    const user_name = auth.user? auth.user.name: "title";
    const user_imageUrl = auth.user ? auth.user.imageUrl : logo;
    const testData = useSelector(state => state.test || {});
    const questions = useMemo(() => testData.test || [], [testData]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [fullscreen, setFullscreen] = useState(false); // Track fullscreen state
    const [showDisclaimer, setShowDisclaimer] = useState(true); // Show disclaimer initially
    // const [showEndDisclaimer, setShowEndDisclaimer] = useState(false);

    //Fetching Test 
    useEffect(() => {
        if (!testId) {
            console.log("Test Id Not Found!");
            return;
        }
        setLoading(true);
        dispatch(get_test_details(userId, testId))
            .then(() => {
                setLoading(false);
                console.log("Test Fetched");
            })
            .catch(error => {
                console.info(`userId: ${userId} and testId: ${testId}`);
                console.error('Error fetching questions:', error.response.data.message);
                setLoading(false);
            });
    }, [dispatch, userId, testId]);

    // Handling Questions mapping
    useEffect(() => {
        if (questions.length > 0) {
            const initialOptions = questions.map(question => ({
                questionId: question._id,
                user_answer: -1
            }));
            setSelectedOptions(initialOptions);
        }
    }, [questions]);

    //Handling Full Screen Mode
    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.key === 'Escape' && fullscreen) {
    //             exitFullscreen();
    //         }
    //     };

    //     document.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [fullscreen]);

    // const enterFullscreen = () => {
    //     if (document.documentElement.requestFullscreen) {
    //         document.documentElement.requestFullscreen();
    //     } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    //         document.documentElement.mozRequestFullScreen();
    //     } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    //         document.documentElement.webkitRequestFullscreen();
    //     } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    //         document.documentElement.msRequestFullscreen();
    //     }
    //     setFullscreen(true); // Update fullscreen state
    // };

    // const exitFullscreen = () => {
    //     if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    //         // No element is in fullscreen mode
    //         console.warn('Not in fullscreen mode');
    //         return;
    //     }

    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.mozCancelFullScreen) { // Firefox
    //         document.mozCancelFullScreen();
    //     } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    //         document.webkitExitFullscreen();
    //     } else if (document.msExitFullscreen) { // IE/Edge
    //         document.msExitFullscreen();
    //     }
    //     setFullscreen(false); // Update fullscreen state
    // };


    const handlePrev = () => {
        if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleTestEnd = async () => {
        alert('The test has ended!');
        // setShowEndDisclaimer(true);
        console.log(selectedOptions);
        try {
            const response = await axios.post(`/api/user/${userId}/test/${testId}/submit`, { answers: selectedOptions, user_name, user_imageUrl });
            console.log(`selected options: ${JSON.stringify(selectedOptions)}`);
            console.log('Test submitted successfully:', response.data);
            // exitFullscreen(); // Exit fullscreen when test ends
            // if(showEndDisclaimer){
            navigate(`/result/test/${testId}`);
            // }
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const updateSelectedOptions = useCallback((questionIndex, optionIndex) => {
        setSelectedOptions(prevOptions =>
            prevOptions.map((option, index) =>
                index === questionIndex ? { ...option, user_answer: optionIndex } : option
            )
        );
    }, []);

    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index - 1);
    };

    const handleStartTest = () => {
        // enterFullscreen(); // Enter fullscreen when test is started
        setFullscreen(true);
        setShowDisclaimer(false); // Hide disclaimer
    };

    const handleBackTest = () => {
        navigate('/');
    }

    // const handleEndTest = () => {
    //     navigate(`/result?testId=${testId}`);
    // }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-purple-100 flex flex-col justify-center items-start">
            <header className="w-full bg-purple-900 text-white flex items-center justify-start">
                <div className='w-fit ml-2'>
                    <img className='md:w-[2.7rem]' src={logo} alt="logo" />
                </div>
                <div className="w-full text-sm font-bold px-3">
                    <div className="w-full flex justify-start">
                        <QuestionNavigation
                            currentQuestion={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            onQuestionClick={handleQuestionClick}
                        />
                    </div>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center w-full p-4">
                {fullscreen &&
                    (<Questions
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        selectedOptions={selectedOptions}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        handleTestEnd={handleTestEnd}
                        updateSelectedOptions={updateSelectedOptions}
                    />)
                }
            </main>
            <button className="bg-gray-700 text-white font-bold m-2 py-2 px-4 rounded-lg" onClick={handleTestEnd}>
                End Test
            </button>
            {showDisclaimer && (
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center text-white z-50">
                    <div className="bg-black/50 flex flex-col justify-center items-center p-8 rounded-lg max-w-lg">
                        <h2 className="text-2xl mb-4">Attention!</h2>
                        <p className="mb-4">
                            This test will be conducted in full-screen mode. Please ensure you are in a suitable environment and have reviewed the test instructions.
                        </p>
                        <div className='w-full flex justify-between'>
                            <button
                                className="bg-purple-200 hover:bg-red-500 hover:text-black text-white py-2 px-4 rounded-lg"
                                onClick={handleBackTest}
                            >
                                Go Back
                            </button>
                            <button
                                className="bg-purple-700 hover:bg-green-500 text-white py-2 px-4 rounded-lg"
                                onClick={handleStartTest}
                            >
                                Start Test
                            </button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
