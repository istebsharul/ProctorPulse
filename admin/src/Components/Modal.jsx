import React from 'react';

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4">Are you sure you want to exit?</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onConfirm} 
            className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-500"
          >
            Yes
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
