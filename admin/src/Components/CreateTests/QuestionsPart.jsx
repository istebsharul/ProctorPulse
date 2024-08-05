import React from 'react';
import { MdDelete } from 'react-icons/md';

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
    console.log(qIndex);
    const newQuestions = data.questions.map((q, i) => {
      if (i === qIndex) {
        console.log(q); // Logging the question being updated
        return { ...q, correct_answer: value };
      }
      return q;
    });
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
        <div key={index} className='bg-purple-900 p-8 rounded-xl flex flex-col items-end gap-2 border-b border-gray-300 pb-4'>
          <textarea
            className='w-full p-2 rounded-lg outline-none'
            type="text"
            rows="3"
            placeholder='Write your question here'
            value={q.title}
            onChange={(e) =>
              handleQuestionChange(index, 'title', e.target.value)
            }
          />
          <div className='flex flex-wrap'>
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className='md:w-1/2 w-full py-2 flex justify-center items-center gap-2'>
                <input
                  type="radio"
                  className='md:mx-2'
                  // name={`correct_answer-${index}`}
                  checked={q.correct_answer === optIndex + 1}
                  onChange={() => handleCorrectOptionChange(index, optIndex + 1)}
                />
                <input
                  className='w-full border-1 rounded-lg p-2 focus:border-red-600 outline-none'
                  type="text"
                  value={opt}
                  placeholder={`Options ${optIndex+1}`}
                  onChange={(e) =>
                    handleOptionChange(index, optIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => deleteQuestion(index)}
            className='mt-2 w-fit bg-white py-1 px-3 flex justify-center items-center text-red-500 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            <MdDelete />
          </button>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className='mt-4 w-full bg-yellow-500 py-2 px-4 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionsPart;
