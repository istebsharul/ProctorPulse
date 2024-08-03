import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { get_user_test_response } from '../Actions/testAction';
import { SlArrowRight } from "react-icons/sl";

const ResultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const userId = auth.user ? auth.user._id : null;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('testId');
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
        console.log(total_score,attempted_questions,skipped_questions,totalQuestions);
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
    if (testId) {
      navigate(`/ranking/test/${testId}/analysis`);
    } else {
      console.error('Test ID is missing');
    }
  };

  return (
    <div className='w-full h-screen pt-40 flex flex-col items-center'>
      <div className="w-3/6">
      <h1 className="w-full text-black text-lg mb-4">Results</h1>
      <div className="w-full flex flex-col justify-center items-center bg-purple-900 text-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl font-bold">{Math.round(percentage)}%</div>
        <div className="text-xl mt-4">You Have Answered {correctAnswers} out of {totalQuestions} Correct</div>
        <button
          onClick={handleSeeMoreDetails}
          className="w-fit mt-6 text-sm flex justify-center items-center bg-white text-black rounded-full px-6 py-2 shadow-md hover:bg-gray-100 transition duration-300"
        >
          See More Details
          <SlArrowRight className='text-xs ml-2 font-bold'/>
        </button>
      </div>
    </div>
    </div>
  );
};

export default ResultPage;
