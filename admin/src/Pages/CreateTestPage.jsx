import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestDetailsPart from '../Components/CreateTests/TestDetailsPart';
import QuestionsPart from '../Components/CreateTests/QuestionsPart';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import showCustomAlert from '../Components/Alert/customAlert';


const CreateTestPage = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [testCreated, setTestCreated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const initialState = {
    name: '',
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

  const goBack = () => {
    navigate('/')
  };

  const handlePrev = () => {
    showCustomAlert(goBack)
  };

  useEffect(() => {
    localStorage.setItem('testData', JSON.stringify(data));
  }, [data]);

  const createTest = async () => {
    console.log('Create Test Pressed');
    try {
      console.log(data.name, data.subject, data.duration, data.questions);
      console.log(data);
      const response = await axios.post('api/admin/tests/create', data);
      // alert("Test created successfully");
      setResponseData(response.data);
      setIsModalVisible(true);
      console.log(isModalVisible);
    } catch (error) {
      alert('Test creation failed');
      console.log(error.response.data.message);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setResponseData(null);
    console.log(testCreated);
    setTestCreated(true);
    console.log(testCreated);
  };


  useEffect(() => {
    console.log("Hellllllo");
    if (testCreated) {
      navigate('/');
    }
  })

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
      if (!data.name || !data.subject || !data.duration) {
        alert('Please fill out all test details before proceeding.');
        return;
      }
      setPage((currPage) => currPage + 1);
    } else if (page === 1) {
      createTest();
    }
  };


  return (
    <div className='bg-white w-full min-h-full flex flex-col justify-center py-10 sm:px-6 lg:px-8 z-100 mf:h-screen'>
      <Modal isVisible={isModalVisible} onClose={closeModal} data={responseData}>
        <div>
          <p><strong>Response Data:</strong></p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      </Modal>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          {titles[page]}
        </h1>
      </div>
      <div className='w-full flex justify-center items-center mt-8'>
        <div className='w-11/12 md:w-3/5 bg-white p-2 shadow sm:rounded-lg'>
          <form onSubmit={createTest}>
            {PageDisplay()}
            <div className='flex flex-row gap-3 pt-8'>
              <button
                type="button"
                onClick={page === 0 ? handlePrev : () => setPage((currPage) => currPage - 1)}
                className='flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-purple-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                {page === 0 ? "Go Back" : "Prev"}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className='flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-purple-500 py-2 px-4 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
