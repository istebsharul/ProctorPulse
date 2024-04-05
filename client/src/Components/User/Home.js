import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const redirectToCreateTest = () => {
    navigate("/create"); // Redirect to /create route
  };

  return (
    <div className="w-full h-80 pt-20 flex justify-center">
      <button
        className="md:w-1/6 bg-purple-900 text-white px-3 py-3 font-sans text-1xl rounded-lg m-auto"
        onClick={redirectToCreateTest}
      >
        Create New Test +
      </button>
    </div>
  );
}

export default Home;
