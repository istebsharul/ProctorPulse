import React, { useEffect } from 'react';
import Test from './Test'; // Adjust the import path as needed

function AvailableTest({ tests = [] }) { // Ensure tests defaults to an empty array
  useEffect(() => {
    console.log("Tests", tests);
    // Ensure tests is an array and check its properties
    if (Array.isArray(tests) && tests.length > 0) {
      console.log("Example expiryDate", tests[0].expiryDate);
    }
  }, [tests]);

  const activeTests = Array.isArray(tests)
  ? tests.filter(test => {
      const expiryDate = new Date(test.expiryDate);
      return expiryDate > new Date();
    })
  : [];


  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-2/3 px-4 flex flex-wrap justify-center items-center gap-4'>
        {Array.isArray(activeTests) && activeTests.length > 0 ? (
          activeTests.map((test, index) => {
            // Convert expiryDate to a Date object if it exists
            const formattedExpiryDate = test.expiryDate ? new Date(test.expiryDate).toISOString().split('T')[0] : 'N/A';
            return (
              <Test
                key={index} // Add a unique key for each item
                title={test.name}
                description={test.subject}
                duration={test.duration}
                dueDate={formattedExpiryDate}
              />
            );
          })
        ) : (
          <p>No tests available</p>
        )}
      </div>
    </div>
  );
}

export default AvailableTest;
