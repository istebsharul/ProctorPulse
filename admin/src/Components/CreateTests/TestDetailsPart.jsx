import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TestDetailsPart = ({ data, setData }) => {
  return (
    <div className='flex flex-col gap-4 font-poppins'>
      <label className='flex flex-col'>
        Test Name:
        <input
          className='border-b-2 border-gray-300 focus:border-purple-600 outline-none'
          type="text"
          value={data.testName}
          onChange={(e) => setData({ ...data, testName: e.target.value })}
        />
      </label>
      <label className='flex flex-col'>
        Subject:
        <input
          className='border-b-2 border-gray-300 focus:border-purple-600 outline-none'
          type="text"
          value={data.subject}
          onChange={(e) => setData({ ...data, subject: e.target.value })}
        />
      </label>
      <label className='flex flex-col'>
        Duration (minutes):
        <input
          className='border-b-2 border-gray-300 focus:border-purple-600 outline-none'
          type="number"
          value={data.duration}
          onChange={(e) => setData({ ...data, duration: e.target.value })}
        />
      </label>
      <label className='flex flex-col'>
        Due Date:
        <DatePicker
          selected={data.expiryDate ? new Date(data.expiryDate) : null}
          onChange={(date) => setData({ ...data, expiryDate: date })}
          className="w-full border-b-2 border-gray-300 focus:border-purple-600 outline-none"
        />
      </label>
    </div>
  );
};

export default TestDetailsPart;
