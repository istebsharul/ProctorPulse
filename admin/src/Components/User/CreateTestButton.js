import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {FaPlus} from 'react-icons/fa';

function CreateTestButton() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const redirectToCreateTest = () => {
    navigate("/create"); // Redirect to /create route
  };

  return (
    <div className="w-full h-80 pt-20 flex justify-center">
      <button
        className="md:w-1/5 bg-purple-200 hover:bg-purple-100 text-black px-3 py-3 font-Poppins text-xl rounded-lg m-auto shadow-inner-md flex justify-center items-center"
        onClick={redirectToCreateTest}
      >
        Create New Test 
        <div className="px-3 font-light ">
        <FaPlus/>
        </div>
      </button>
    </div>
  );
}

export default CreateTestButton;
