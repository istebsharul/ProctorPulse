import React from "react";
import CreateTestButton from "../Components/User/CreateTestButton";
import AvailableTest from "../Components/Test/AvailableTest";
import useAvailableTests from "../Hooks/useAvailableTests";
import PreviousTest from "../Components/Test/PreviousTest";

function HomePage() {
  const { availableTests, loading, error } = useAvailableTests();

  if (loading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  }

  if (error) {
    return <p className="flex justify-center items-center">Error: {error}</p>;
  }

  return (
    <div className="bg-white">
      <CreateTestButton />
      <h1 className="text-xl text-center py-10">Assigned Test</h1>
      {!loading && !error && <AvailableTest tests={availableTests.data} />}
      <h1 className="text-xl text-center py-10">Previous Test</h1>
      {!loading && !error && <PreviousTest tests={availableTests.data}/>}
    </div>
  );
}

export default HomePage;
