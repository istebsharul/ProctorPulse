import React, { useState, useEffect } from 'react';
import { FaEdit, FaChartBar, FaTrash } from 'react-icons/fa';

function Test({ title, description, duration, dueDate }) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    if (new Date(dueDate) < currentDate) {
      setExpired(true);
    }
  }, [dueDate]);

  return (
    <div className={`w-[25rem] p-4 rounded-xl flex flex-col justify-between items-start ${expired ? 'bg-gray-500' : 'bg-purple-900'} text-white space-y-3`}>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col space-y-1'>
          <h1 className='text-2xl'>{title}</h1>
          <p className='text-xs'>{description}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <FaEdit size={20} />
          <FaChartBar />
          <FaTrash />
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
