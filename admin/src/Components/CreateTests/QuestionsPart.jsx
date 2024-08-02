import React from 'react';

const QuestionsPart = ({ data, setData }) => {
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = data.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setData({ ...data, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const newQuestions = data.questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            options: q.options.map((opt, j) =>
              j === optionIndex ? value : opt
            ),
          }
        : q
    );
    setData({ ...data, questions: newQuestions });
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const newQuestions = data.questions.map((q, i) =>
      i === qIndex ? { ...q, correct_answer: 1 } : q
    );
    setData({ ...data, questions: newQuestions });
  };

  const addQuestion = (e) => {
    e.preventDefault();
    setData({
      ...data,
      questions: [
        ...data.questions,
        { title: '', options: ['', '', '', ''], correct_answer: '' },
      ],
    });
  };

  const deleteQuestion = (index) => {
    const newQuestions = data.questions.filter((_, i) => i !== index);
    setData({ ...data, questions: newQuestions });
  };

  return (
    <div className='flex flex-col gap-4'>
      {data.questions.map((q, index) => (
        <div key={index} className='flex flex-col gap-2 border-b border-gray-300 pb-4'>
          <label>
            Question:
            <input
              className='w-full border-b-2 border-gray-300 focus:border-red-600 outline-none'
              type="text"
              value={q.title}
              onChange={(e) =>
                handleQuestionChange(index, 'title', e.target.value)
              }
            />
          </label>
          {q.options.map((opt, optIndex) => (
            <div key={optIndex} className='flex justify-center items-center gap-2'>
              <input
                className='border-b-2 border-gray-300 focus:border-red-600 outline-none'
                type="text"
                value={opt}
                onChange={(e) =>
                  handleOptionChange(index, optIndex, e.target.value)
                }
              />
              <input
                type="radio"
                name={`correct_answer-${index}`}
                checked={q.correct_answer === opt}
                onChange={() => handleCorrectOptionChange(index, opt)}
              />
            </div>
          ))}
          <button
            onClick={() => deleteQuestion(index)}
            className='mt-2 w-full bg-red-600 py-1 px-2 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            Delete Question
          </button>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className='mt-4 w-full bg-purple-500 py-2 px-4 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionsPart;
