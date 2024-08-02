import React from 'react'
import profile from "../Assets/profile.png";
import { useSelector } from 'react-redux';

function Rank({ rank, user }) {
    const curr_user = useSelector((state) => state.auth.user);
    const isLoggedInUser = curr_user._id === user.user_id._id;

    // useEffect(() => {
    //     // console.log("Hiiiiiiiii");
    //     // console.log("User from Ranks",user.name);
    //     console.log(user);
    // })

    return (
        <div className={`${isLoggedInUser ? 'bg-purple-900 text-white' : 'bg-purple-300'} backdrop-blur-lg shadow-sm hover:shadow-md flex justify-start items-center p-4 rounded-md`}>
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
                <div>{user.total_score}</div>
            </div>
            </div>
            )
}

            export default Rank