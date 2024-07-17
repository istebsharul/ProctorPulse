import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleTestButton = () => {
    navigate('/test');
  };

  const handleProfileButton = () => {
    navigate('/profile');
  }

  return (
    <div className='w-full h-80 pt-20 flex justify-center'>
      Home
      <button onClick={handleTestButton}>Go to Test Page</button>
      <button onClick={handleProfileButton}>Profile</button>
    </div>
  );
}

export default Home;
