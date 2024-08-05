import React from 'react'
import profile from "../Assets/profile.png";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';

function Rank({ rank, testId, user }) {
    const curr_user = useSelector((state) => state.auth.user);
    const isLoggedInUser = curr_user._id === user.user_id._id;
    const navigate = useNavigate();

    const handleTestDetails = () => {
        if (testId) {
            navigate(`/ranking/test/${testId}/analysis`)
        }
    }

    return (
        <div
            className={`${isLoggedInUser ? 'bg-purple-900 text-white' : 'bg-purple-300'} backdrop-blur-lg shadow-sm hover:shadow-md flex justify-start items-center p-4 rounded-md`}>
            <div className='px-4'>{rank}</div>
            <div className='w-full flex justify-between items-center'>
                <div className='flex justify-center items-center'>
                    <img className='md:w-[2rem] md:h-[2rem] mx-2 rounded-full object-cover' src={user?.user_imageUrl || profile} alt="Profile" />
                    {user.user_name}
                    {rank === 1 ? (
                        <div className='bg-white mx-3 p-1 rounded-lg'><img className='w-5 h-5' src="https://res.cloudinary.com/dllddjxkf/image/upload/v1722459795/samples/rgtf25zxl1zepcmjiwaq.png" alt="" /></div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className='flex justify-center items-center space-x-3'>
                    <div className=''>Score: {user.total_score}</div>
                    {   testId &&
                        <div 
                        onClick={handleTestDetails}
                        className='bg-white text-black p-1 rounded-md hover:bg-purple-100 hover:scale-125 transition-all duration-2000'
                    ><TbListDetails /></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Rank