import React, { useEffect, useState } from 'react';
import Rank from '../Components/Rank';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Ranking() {
    const { test_id } = useParams();
    const [rankData, setRankData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const curr_user = useSelector((state) => state.auth.admin);

    useEffect(() => {
        const fetchRanking = async () => {
            if (!test_id) {
                setError("TestId is missing in URL parameter");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/api/ranking/test/${test_id}`);
                console.log(response.data.users);
                setRankData(response.data.users);
            } catch (error) {
                console.log(JSON.stringify(error.response.data.message));
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, [test_id]);

    // Find the current user in the rank data
    const currentUserIndex = rankData.findIndex(user => user.user_id._id === curr_user._id);
    const current_user = currentUserIndex !== -1 ? rankData[currentUserIndex] : null;
    const current_user_rank = currentUserIndex !== -1 ? currentUserIndex + 1 : null;

    return (
        <div className='flex flex-col justify-center items-center mt-20'>
            <h1 className='text-xl py-5'>Ranking</h1>
            <div className='w-3/5 bg-purple-100 rounded-xl p-10 space-y-2'>
                <div>
                    { current_user &&
                        <Rank user={current_user} rank={current_user_rank} />
                    }
                </div>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {!loading && !error && rankData.length > 0 ? (
                    rankData.map((user, index) => (
                        <Rank key={index} user={user} rank={index + 1} />
                    ))
                ) : (
                    !loading && !error && <div>No ranking data available.</div>
                )}
            </div>
        </div>
    );
}

export default Ranking;
