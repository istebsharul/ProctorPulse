import { useSelector } from 'react-redux';

const Profile = () => {
    const currentUser = useSelector(state => state.auth.user);

    return (
        <div className='w-full h-screen bg-red-300 flex justify-center items-center'>
            {currentUser ? (
                <div>
                    <h1>Welcome, {currentUser.name}!</h1>
                    <p>Email: {currentUser.email}</p>
                    <p>{currentUser._id}</p>
                </div>
            ) : (
                <h1 >No user is currently logged in</h1>
            )}
        </div>
    );
};

export default Profile;
