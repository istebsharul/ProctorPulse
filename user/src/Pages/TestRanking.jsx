import React, { useEffect, useState } from 'react';
import Rank from '../Components/Rank';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import useAvailableTests from '../Hooks/useAvailableTests';

function TestRanking() {
    const { test_id } = useParams();
    const { availableTests, loading, error } = useAvailableTests();
    const [rankData, setRankData] = useState([]);
    const curr_user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [testName, setTestName] = useState('');

    useEffect(() => {
        if (availableTests) {
            const currentTest = availableTests.filter((test) => test._id === test_id);
            setTestName(currentTest[0]?.name);
        }
    }, [availableTests, test_id]);  // Adding dependencies here

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ranking/test/${test_id}`);
                console.log("HELLllll",response.data.users);
                setRankData(response.data.users);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRanking();
    }, [test_id]);  // Adding dependencies here

    const currentUserIndex = curr_user && curr_user._id
        ? rankData.findIndex(user => user.user_id && user.user_id._id === curr_user._id)
        : -1;
    const current_user = currentUserIndex !== -1 ? rankData[currentUserIndex] : null;
    const current_user_rank = currentUserIndex !== -1 ? currentUserIndex + 1 : null;

    const handleRanking = () => {
        navigate('/ranking');
    };

    return (
        <div className='w-full flex flex-col items-center mt-10'>
            <div className='w-3/5'>
                <h1 className="text-xl mb-6 flex items-center cursor-pointer">
                    <span onClick={handleRanking}>
                        Ranking
                    </span>
                    <IoIosArrowForward className="mx-2" />
                    <span className='text-purple-500'>
                        {testName}
                    </span>
                </h1>
                <div className='bg-purple-100 rounded-xl p-6 sm:p-10 space-y-4'>
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}
                    {!loading && !error && (
                        <>
                            {current_user ? (
                                <div>
                                    <h1 className="text-lg mb-4">Your Rank</h1>
                                    <Rank user={current_user} testId={test_id} rank={current_user_rank} />
                                </div>
                            ) : (
                                <div>You did not attempt the test</div>
                            )}
                            <h1 className="text-lg mt-6">All Ranks</h1>
                            {rankData.length > 0 ? (
                                rankData.map((user, index) => (
                                    <Rank key={index} user={user} rank={index + 1} />
                                ))
                            ) : (
                                <div>No ranking data available.</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TestRanking;
