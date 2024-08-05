import { useSelector } from 'react-redux';
import { FaEnvelope, FaUniversity } from 'react-icons/fa';
import {CiCircleChevRight} from 'react-icons/ci';
import useAvailableTests from '../Hooks/useAvailableTests';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const currentUser = useSelector(state => state.auth.admin);
    const { availableTests, loading, error } = useAvailableTests();
    const navigate = useNavigate();

    const tests = availableTests.data;

    useEffect(() => {
        console.log(availableTests);
    }, [availableTests]);

    if (loading) {
        return <p className="flex justify-center items-center">Loading...</p>;
    }

    if (error) {
        return <p className="flex justify-center items-center">Error: {error}</p>;
    }

    const handleExploreTest = ()=>{
        navigate('/');
    }

    const handleEditProfile = () => {
        navigate('/profile/edit');
    }

    return (
        <div className='w-full flex flex-col justify-start items-center'>
            <div className='w-full h-[11rem] bg-purple-900 shadow-inner-md relative'>
                <div className='absolute top-[7rem] left-1/2 transform -translate-x-1/2 md:top-20 md:left-1/4 border-2 border-purple-100 rounded-full p-1'>
                    <img className='w-40 h-40 object-cover rounded-full' src={currentUser.imageUrl} alt=""></img>
                </div>
            </div>

            <div className='md:w-4/6 w-5/6 mt-40 flex md:flex-row flex-col md:space-y-0 space-y-5 justify-between p-1'>
                <div className='md:w-2/6 h-full bg-purple-100 p-4 rounded-lg'>
                    {currentUser ?
                        (
                            <div className='flex flex-col'>
                                <ul className='space-y-2'>
                                    <li className='flex justify-start items-center text-lg'>{currentUser.name}</li>
                                    <li className='flex justify-start items-center text-sm'><FaEnvelope className='mr-2' />{currentUser.email}</li>
                                    <li className='flex justify-start items-center text-sm'><FaUniversity className='mr-2' />{currentUser.organisation}</li>
                                </ul>
                                <button onClick={handleEditProfile} className='bg-purple-900 hover:bg-purple-900/30 text-white hover:text-black backdrop-blur-lg shadow-lg px-1 py-2 rounded text-sm mt-4'>Edit Profile</button>
                            </div>
                        ) : (
                            <div>No User!</div>
                        )
                    }
                </div>
                <div className='md:w-3/5 w-full bg-purple-100 rounded-lg py-2 px-6'>
                    <h1 className='p-2 text-xl text-center'>Test History</h1>
                    {!loading && !error && tests && (
                        tests.map((test, index) => (
                            <div key={index}>
                                {/* Render your test details here */}
                                <div className='flex justify-between bg-purple-300/40 backdrop-blur-lg shadow-sm hover:shadow-md m-3 px-4 py-1 rounded-md'>
                                    <div className='flex flex-col'>
                                        <p>{test.name}</p>
                                        <p className='text-xs'>{test.subject}</p>
                                    </div>
                                    <button onClick={handleExploreTest} className='flex justify-center items-center text-purple-600/30 hover:text-purple-900/70 text-2xl rounded-full'>
                                        <CiCircleChevRight />
                                    </button>
                                </div>
                                {/* Add other details as necessary */}
                            </div>
                        ))
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
