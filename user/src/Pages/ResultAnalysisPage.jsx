import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionAnalysis from '../Components/QuestionAnalysis';
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";

const ResultsPageAnalysis = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const { test_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/ranking/test/${test_id}`);
        console.log("API response: ", response);

        if (response.data && response.data.users) {
          const usersResponse = response.data.users;
          // const userResponse =  usersResponse.filter((user)=> user.user_id!== userId);
          const userResponse = usersResponse.filter(user => user.user_id._id === userId);
          console.log("Userrrrrrrs", userResponse);
          setData(userResponse);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err) {
        console.error("Error fetching user responses: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserResponses();
  }, [test_id]);

  useEffect(() => {
    const fetchQuestions = async (questionIds) => {
      // console.log("Fetching questions with IDs: ", questionIds);
      try {
        const questionPromises = questionIds.map((id) => axios.get(`http://localhost:3000/api/questions/${id}`));
        const questionResponses = await Promise.all(questionPromises);
        // console.log("Question responses: ", questionResponses);
        const questionsData = questionResponses.reduce((acc, response) => {
          const question = response.data.data; // Adjusted to access the nested 'data' property
          // console.log("Question fetched: ", question);
          acc[question._id] = question;
          return acc;
        }, {});
        setQuestions(questionsData);
      } catch (err) {
        console.error("Error fetching questions: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (data.length > 0) {
      const questionIds = [...new Set(data.flatMap((user) => user.user_response.map((res) => res.question_id)))];
      // console.log("Question IDs to fetch: ", questionIds);
      fetchQuestions(questionIds);
    } else {
      setLoading(false); // Handle case when there's no data
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="w-full mt-10 flex justify-center">
      <div className='w-3/5'>
        <h1 className="text-xl text-purple-500 mb-6 flex items-center">
          <span
            className="text-black cursor-pointer"
            onClick={() => navigate(`/result/test/${test_id}`)}
          >
            Result
          </span>
          <IoIosArrowForward />
          Details
        </h1>
        {data.map((user, userIndex) => (
          <div key={userIndex}>
            {user.user_response.map((response, questionIndex) => {
              const question = questions[response.question_id];
              if (!question) return null;

              return (
                <QuestionAnalysis
                  key={questionIndex}
                  question={`Q${questionIndex + 1}. ${question.title}`}
                  options={question.options}
                  selectedOption={parseInt(response.user_answer)}
                  correctOption={parseInt(question.correct_answer)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPageAnalysis;