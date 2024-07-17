import { useSelector } from 'react-redux';

const Profile = () => {
    const currentUser = useSelector(state => state.auth.user);

    return (
        <div className='bg-red-300'>
            {currentUser ? (
                <div>
                    <h1>Welcome, {currentUser.name}!</h1>
                    <p>Email: {currentUser.email}</p>
                </div>
            ) : (
                <h1 >No user is currently logged in</h1>
            )}
        </div>
    );
};

export default Profile;
