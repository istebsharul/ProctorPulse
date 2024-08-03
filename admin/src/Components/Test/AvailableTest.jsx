import React, {useMemo } from 'react';
import Test from '../Test/Test'; // Adjust the import path as needed

function AvailableTest({ tests = [] }) { // Ensure tests defaults to an empty array
  const activeTests = useMemo(() => {
    return Array.isArray(tests)
      ? tests.filter(test => {
          const expiryDate = new Date(test.expiryDate);
          console.log(test.name);
          console.log("Expiry Date",expiryDate);
          console.log("New Date",new Date());
          return expiryDate > new Date();
        })
      : [];
  }, [tests]);


  return (
    <div className='w-full flex justify-center items-center'>
      <div className='md:w-2/3 w-full px-4 flex flex-wrap justify-center items-center gap-4'>
        {Array.isArray(activeTests) && activeTests.length > 0 ? (
          activeTests.map((test, index) => {
            // Convert expiryDate to a Date object if it exists
            const formattedExpiryDate = test.expiryDate ? new Date(test.expiryDate).toISOString().split('T')[0] : 'N/A';
            return (
              <Test
                key={index} 
                id={test._id}
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
