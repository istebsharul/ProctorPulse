import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestDetailsPart from '../Components/CreateTests/TestDetailsPart';
import QuestionsPart from '../Components/CreateTests/QuestionsPart';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';

const CreateTestPage = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const initialState = {
    testName: '',
    subject: '',
    duration: '',
    expiryDate: '',
    questions: [
      {
        title: '',
        options: ['', '', '', ''],
        correct_answer: ''
      }
    ],
  }

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('testData');
    return savedData ? JSON.parse(savedData) : initialState
  });

  const [showModal, setShowModal] = useState(false);

  const handleDismiss = () => {
    setData(initialState);
    localStorage.removeItem('testData');
    navigate('/');
  };

  const handlePrev = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmModal = () => {
    setShowModal(false);
    handleDismiss();
  };


  useEffect(() => {
    localStorage.setItem('testData', JSON.stringify(data));
  }, [data]);

  const createTest = async (e) => {
    console.log('Create Test Pressed');
    // e.preventDefault();
    try {
      console.log(data.testName, data.subject, data.duration, data.questions);
      console.log(data);
      await axios.post('api/admin/tests/create', data);
      alert("Test created successfully");
    } catch (error) {
      alert('Test creation failed');
      console.log(error);
    }
  };

  const titles = ["Test Details", "Questions"];

  const PageDisplay = () => {
    if (page === 0) {
      return <TestDetailsPart data={data} setData={setData} />;
    } else {
      return <QuestionsPart data={data} setData={setData} />;
    }
  };

  const handleNext = () => {
    console.log('handle Next Pressed', page);
    if (page === 0) {
      // Validation check for test details page
      if (!data.testName || !data.subject || !data.duration) {
        alert('Please fill out all test details before proceeding.');
        return;
      }
      setPage((currPage) => currPage + 1);
    } else if (page === 1) {
      createTest();
    }
  };

  // const handlePrev = () => {
  //   console.log("Hello");
  //   setData(initialState);
  //   localStorage.removeItem('testData');
  //   navigate('/');
  // }

  // const handleDismiss = () => {
  //   setData(initialState);
  //   localStorage.removeItem('testData');
  //   navigate('/');
  // };

  // const handlePrev = () => {
  //   toast((t) => (
  //     <span>
  //       Are you sure you want to exit?
  //       <button 
  //         onClick={() => {
  //           toast.dismiss(t.id);
  //           handleDismiss();
  //         }} 
  //         style={{ marginLeft: '10px' }}>
  //         Yes
  //       </button>
  //       <button 
  //         onClick={() => toast.dismiss(t.id)} 
  //         style={{ marginLeft: '10px' }}>
  //         No
  //       </button>
  //     </span>
  //   ));
  // };


  return (
    <div className='bg-gradient-to-r from-slate-100 to-purple-600 w-full min-h-full flex flex-col justify-center py-36 sm:px-6 lg:px-8 z-100 mf:h-screen'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          {titles[page]}
        </h1>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={createTest}>
            {PageDisplay()}
            <div className='flex flex-row gap-3 pt-8'>
              <button
                type="button"
                onClick={page === 0 ? handlePrev : () => setPage((currPage) => currPage - 1)}
                className='flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                {page === 0 ? "Delete Test" : "Prev"}
              </button>
              <Modal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmModal} />
              <button
                type="button"
                onClick={handleNext}
                className='flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                {page === titles.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTestPage;
