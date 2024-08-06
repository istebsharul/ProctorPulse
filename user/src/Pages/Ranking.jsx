import React from 'react';
import useAvailableTests from '../Hooks/useAvailableTests';  // Make sure to update the import path
import { useNavigate } from 'react-router-dom';

function Ranking() {
    const { availableTests, loading, error } = useAvailableTests();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleTestRank = (testId) => {
        navigate(`/ranking/test/${testId}`);
    };

    return (
        <div className='w-full flex justify-center items-center mt-10'>
            <div className='md:w-3/5 w-4/5'>
                <h1 className="text-xl mb-6">Ranking</h1>
                <ul className='bg-purple-100 rounded-xl p-10 space-y-2 flex flex-wrap'>
                    {availableTests.length > 0 ? (
                        availableTests.map(test => (
                            <li key={test._id} onClick={() => handleTestRank(test._id)} className="md:w-40 w-full md:h-40 h-full bg-purple-300 p-2 m-2 rounded-xl shadow hover:shadow-lg flex flex-col justify-center items-center cursor-pointer">
                                <img className='md:w-2/4 w-full md:m-2' src="https://res.cloudinary.com/dllddjxkf/image/upload/v1722891157/hpqsok3wub8khlpt2hgc.webp" alt={test.name} />
                                <div className='w-full flex flex-col justify-center items-center'>
                                    <p className='text-lg'>
                                        {test.name}
                                    </p>
                                    <p className='text-sm'>
                                        Total Respones: {test.users.length}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No available tests</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Ranking;
