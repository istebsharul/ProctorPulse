import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

const TestDetailsPart = ({ data, setData }) => {
  return (
    <div className='w-full bg-purple-900 flex flex-col justify-center md:items-center items-start md:p-10 px-5 py-10 rounded-lg'>
      <h1 className='w-full md:text-2xl text-xl text-center text-white pb-5'>You are just 1 step away!</h1>
      <div className='md:w-4/6 w-full text-nowrap flex flex-col justify-center md:items-center items-start gap-4 font-poppins'>
        <div className='w-full bg-purple-200 rounded-lg flex md:flex-row flex-col md:items-center items-start'>
          <div className='md:w-2/6 text-left md:px-4 px-2'>Test Name:</div>
          <input
            className='w-full border bg-white focus:border-purple-600 outline-none p-2 rounded-lg'
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Test Name"
          />
        </div>
        <div className='w-full bg-purple-200 rounded-lg flex md:flex-row flex-col md:items-center items-start'>
          <div className='md:w-2/6 text-left md:px-4 px-2'>Subject:</div>
          <input
            className='w-full border bg-white focus:border-purple-600 outline-none p-2 rounded-lg'
            type="text"
            value={data.subject}
            onChange={(e) => setData({ ...data, subject: e.target.value })}
            placeholder="Subject"
          />
        </div>
        <div className='w-full bg-purple-200 rounded-lg flex md:flex-row flex-col md:items-center items-start'>
          <div className='md:w-2/6 text-left md:px-4 px-2'>Duration:</div>
          <input
            className='w-full border bg-white focus:border-purple-600 outline-none p-2 rounded-lg'
            type="number"
            value={data.duration}
            onChange={(e) => setData({ ...data, duration: e.target.value })}
            placeholder="Duration (minutes)"
          />
        </div>
        <div className='sm relative text-nowrap bg-purple-200 rounded-lg flex md:flex-row flex-col md:items-center items-start md:justify-center'>
          <div className='md:w-2/5 text-left md:px-4 px-2'>Due Date:</div>
          <DatePicker
            selected={data.expiryDate ? new Date(data.expiryDate) : null}
            onChange={(date) => setData({ ...data, expiryDate: date })}
            className="w-full border bg-white focus:border-purple-600 outline-none md:px-4 px-2 py-2 rounded-lg"
            placeholderText="Due Date"
          />
          <FaCalendarAlt className='absolute right-5 md:top-1/2 top-2/3 transform -translate-y-1/2 pointer-events-none' />
        </div>
      </div>
    </div>
  );
};

export default TestDetailsPart;
