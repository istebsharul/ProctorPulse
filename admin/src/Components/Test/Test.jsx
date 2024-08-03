import React, { useState, useEffect } from 'react';
import { FaChartBar, FaTrash } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import {toast} from 'react-hot-toast';

function Test({ id, title, description, duration, dueDate }) {
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.admin);

  useEffect(() => {
    // console.log(id);
    const currentDate = new Date();
    if (new Date(dueDate) < currentDate) {
      setExpired(true);
    }
  }, [dueDate]);

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
    >
      <div className='w-full flex justify-between'>
        <div className='flex flex-col space-y-1'>
          <h1 className='text-2xl'>{title}</h1>
          <p className='text-xs'>{description}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <div
            className='bg-white text-black hover:bg-purple-200 hover:shadow-xl hover:scale-105 p-1 rounded-md'
            onClick={handleRanking}
          >
            <FaChartBar />
          </div>
          <div
            className='bg-white text-black hover:bg-purple-200 hover:shadow-xl hover:scale-105 p-1 rounded-md'
            onClick={handleDeleteTest}
          ><FaTrash /></div>
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
