import React, { useEffect } from 'react';
import AvailableTest from './Test/AvailableTest';
import PreviousTest from './Test/PreviousTest';
import useAvailableTests from '../Hooks/useAvailableTests';
import JoinTestButton from './JoinTestButton';
// import fetchAvailableTests from '../Hooks/useFetchAvailableTests';


function Home() {
  const { availableTests, loading, error } = useAvailableTests();

  useEffect(()=>{
    console.log("A Test from Home: ",availableTests);
  },[availableTests]);

  if (loading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  }

  if (error) {
    return <p className="flex justify-center items-center">Error: {error}</p>;
  }


  return (
    <div className='flex flex-col justify-center items-center pt-40'>
      <JoinTestButton/>
      <h1 className="text-xl text-center py-10">Assigned Test</h1>
      {!loading && !error && <AvailableTest tests={availableTests} />}
      <h1 className="text-xl text-center py-10">Previous Test</h1>
      {!loading && !error && <PreviousTest tests={availableTests}/>}
    </div>
  );
}

export default Home;
