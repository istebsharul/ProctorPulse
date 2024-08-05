import React, { useState, useEffect } from 'react';
import { FaChartBar, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi';

function Test({ id, title, description, duration, dueDate }) {
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(id);
    const currentDate = new Date();
    if (new Date(dueDate) < currentDate) {
      setExpired(true);
    }
  }, [dueDate]);

  const handleTestClick = async () => {
    // try {
    //   const attempted = await dispatch(checkTestAttempted({ userId, testId: id }));
    //   console.log(attempted);
    //   if (!attempted) {
    //     navigate(`/quiz?testId=${id}`);
    //   } else {
    //     toast.error("You have Already Attempted the Test!")
    //     console.log("User has already attempted the test.");
    //   }
    // } catch (error) {
    //   console.error("Error checking test attempt:", error);
    // }
  };

  const handleDeleteTest = (e) => {
    e.stopPropagation();
    console.log("Delete Clicked!!");
  }

  const handleRanking = (e) => {
    e.stopPropagation();
    console.log("Ranking Pressed!!!");
    navigate(`/ranking/test/${id}`)
  }

  return (
    <div className={`w-[25rem] p-4 rounded-xl flex flex-col justify-between items-start ${expired ? 'bg-gray-500' : 'bg-purple-900'} hover:shadow-xl hover:bg-purple-700 transform transition-transform duration-300 hover:scale-105 text-white space-y-3`}
      onClick={handleTestClick}
    >
      <div className='w-full flex justify-between'>
        <div className='flex flex-col space-y-1'>
          <h1 className='text-2xl'>{title}</h1>
          <p className='text-xs'>{description}</p>
        </div>
        <div className='flex flex-col space-y-1'>
        <div
            className='w-7 h-7 flex justify-center items-center bg-white text-black hover:bg-purple-200 font-bold hover:shadow-xl hover:scale-105 p-1 rounded-md'
          >
            <BiEdit className='w-full h-full' />
          </div>
          <div
            className='w-7 h-7 flex justify-center items-center bg-white text-black hover:bg-purple-200 hover:shadow-xl hover:scale-105 p-1 rounded-md'
            onClick={handleRanking}
          >
            <FaChartBar className='w-full h-full' />
          </div>
          <div
            className='w-7 h-7 flex justify-center items-center bg-white text-black hover:bg-purple-200 hover:shadow-xl hover:scale-105 p-1 rounded-md'
            onClick={handleDeleteTest}
          ><FaTrash className='w-full h-full' />
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between items-center space-x-2'>
        <div className='text-md'>
          Duration: {duration}
        </div>
        <div className='text-md'>
          Due Date: {new Date(dueDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default Test;
