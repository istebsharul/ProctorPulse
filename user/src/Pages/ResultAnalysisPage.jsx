import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionAnalysis from '../Components/QuestionAnalysis';

const ResultsPageAnalysis = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const testId = queryParams.get('testId');
  const testId = "6693e147ef5b4e110e774af8"; // Hardcoded for now
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/ranking/test/${testId}`);
        console.log("API response: ", response);

        if (response.data && response.data.users) {
          setData(response.data.users);
          console.log("User responses fetched: ", response.data.users);
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
  }, [testId]);

  useEffect(() => {
    const fetchQuestions = async (questionIds) => {
      console.log("Fetching questions with IDs: ", questionIds);
      try {
        const questionPromises = questionIds.map((id) => axios.get(`http://localhost:3000/api/questions/${id}`));
        const questionResponses = await Promise.all(questionPromises);
        console.log("Question responses: ", questionResponses);
        const questionsData = questionResponses.reduce((acc, response) => {
          const question = response.data.data; // Adjusted to access the nested 'data' property
          console.log("Question fetched: ", question);
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
      console.log("Question IDs to fetch: ", questionIds);
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
    <div className="p-6 mx-4">
      <h1 className="text-2xl font-bold mb-6">
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate(`/result?testId=${testId}`)}
        >
          Results
        </span> 
        &gt; Details
      </h1>
      {data.map((user, userIndex) => (
        <div key={userIndex}>
          {user.user_response.map((response, questionIndex) => {
            const question = questions[response.question_id];
            if (!question) return null;

            return (
              <QuestionAnalysis
                key={questionIndex}
                question={`Q${questionIndex + 1} ${question.title}`}
                options={question.options}
                selectedOption={parseInt(response.user_answer)}
                correctOption={question.correct_answer}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ResultsPageAnalysis;
