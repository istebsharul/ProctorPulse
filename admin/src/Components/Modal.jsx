import React, { useEffect } from 'react';
import { PiLinkSimple } from "react-icons/pi";
import useCopyToClipboard from '../Hooks/useCopyToClipBoard';

const Modal = ({ isVisible, onClose, data }) => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    console.log(isCopied);
  });

  if (!isVisible) return null;

  const handleCopy = () => {
    copyToClipboard(`Enter the Test Id and password to attempt the test.\nTEST ID: ${data?.testId}\nPASSWORD: ${data?.password}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="w-11/12 max-w-xl md:w-[40rem] h-auto flex flex-col justify-center items-center relative bg-purple-900 text-white rounded-lg shadow-lg p-4 md:p-10 z-50">
        <h1 className="text-2xl md:text-3xl font-light mb-2 md:mb-4 text-center">Congratulations!</h1>
        <h2 className='text-center text-lg md:text-xl mb-4'>{data.message}</h2>
        <div className='w-full space-y-4 p-2 md:p-4'>
          <div className='bg-purple-200 text-black rounded-lg flex items-center'>
            <div className='w-1/3 md:w-1/5 pl-2 md:pl-3 py-2 md:py-3 md:text-lg text-sm'>TEST ID</div>
            <div className='w-2/3 md:w-4/5 bg-white md:ml-6 pl-2 md:pl-4 py-2 md:py-3 rounded-lg md:text-lg text-sm'>{data?.testId}</div>
          </div>
          <div className='bg-purple-200 text-black rounded-lg flex items-center'>
            <div className='w-1/3 md:w-1/5 pl-2 md:pl-3 py-2 md:py-3 md:text-lg text-sm'>PASSWORD</div>
            <div className='w-2/3 md:w-4/5 bg-white md:ml-6 pl-2 md:pl-4 py-2 md:py-3 rounded-lg md:text-lg text-sm'>{data?.password}</div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-center mt-2 md:mt-4 px-2 md:px-4">
          <button 
            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-gray-200 hover:bg-red-500 hover:text-white rounded-md flex justify-center items-center' 
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-gray-200 hover:bg-green-500 hover:text-white rounded-md flex justify-center items-center"
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}<PiLinkSimple className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
