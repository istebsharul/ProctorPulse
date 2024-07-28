import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get_user_test_response } from '../Actions/testAction';

const ResultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const userId = auth.user ? auth.user._id : null;
  const testId = "6693e147ef5b4e110e774af8"; // Replace with dynamic testId
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const payload = await dispatch(get_user_test_response(userId, testId));
        const { total_score, attempted_questions, skipped_questions } = payload;
        const totalQuestions = attempted_questions + skipped_questions;
        setCorrectAnswers(total_score);
        setTotalQuestions(totalQuestions);
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    if (userId && testId) {
      fetchTestDetails();
    }
  }, [dispatch, userId, testId]);

  const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const handleSeeMoreDetails = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-black text-lg mb-4">Results</h1>
      <div className="bg-purple-600 text-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl font-bold">{Math.round(percentage)}%</div>
        <div className="text-xl mt-4">You Have Answered {correctAnswers} out of {totalQuestions} Correct</div>
        <button
          onClick={handleSeeMoreDetails}
          className="mt-6 bg-white text-purple-600 rounded-full px-6 py-2 font-medium shadow-md hover:bg-gray-100 transition duration-300"
        >
          See More Details
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
