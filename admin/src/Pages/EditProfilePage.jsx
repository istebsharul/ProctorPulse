import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEnvelope, FaUniversity } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../Actions/adminActions'; // Replace with your actual action
import profilepicture from '../Assets/profile.png';

const EditProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth.admin);
    const [initialFormData, setInitialFormData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organisation: '',
        imageUrl: '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedImage, setSelectedImage] = useState(currentUser.imageUrl);

    useEffect(() => {
        if (currentUser) {
            const initialData = {
                name: currentUser.name || '',
                email: currentUser.email || '',
                organisation: currentUser.organisation || '',
            };
            setFormData(initialData);
            setInitialFormData(initialData);
        }
    }, [currentUser]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFormData({ ...formData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if (hasChanges()) {
            dispatch(updateProfile(formData)); // Replace with your actual update action
        }
    };


    const handlePasswordSubmit = (e) => {
        e.preventDefault();

    };

    const handleCancelChanges = () => {
        alert("Are you sure you want exit?");
        navigate('/profile');
    }

    const hasChanges = () => {
        return (
            formData.name !== initialFormData.name ||
            formData.email !== initialFormData.email ||
            formData.organisation !== initialFormData.organisation ||
            formData.imageUrl !== initialFormData.imageUrl
        );
    };
    
    return (
        <div className='w-full flex flex-col justify-start items-center'>
            <div className='w-full h-[11rem] bg-purple-900 shadow-inner-md relative group'>
                <div className='absolute top-[7rem] left-1/2 transform -translate-x-1/2 md:top-20 md:left-1/4 border-2 border-white rounded-full p-1'>
                    <img className='w-40 h-40 object-cover rounded-full' src={selectedImage || profilepicture} alt="Profile" />
                    <input
                        type='file'
                        id='file-input'
                        onChange={handleImageChange}
                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        aria-label='Upload image'
                    />
                    <label
                        htmlFor='file-input'
                        className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                        <span className='text-black p-2 bg-purple-100 rounded-lg'>Edit Image</span>
                    </label>
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
                                <button onClick={handleCancelChanges} className='bg-purple-900 hover:bg-purple-900/30 text-white hover:text-black backdrop-blur-lg shadow-lg px-1 py-2 rounded text-sm mt-4'>Exit</button>
                            </div>
                        ) : (
                            <div>No User!</div>
                        )
                    }
                </div>
                <div className='md:w-3/5 w-full flex flex-col justify-end items-center'>
                    <div className='md:w-full w-5/6 bg-purple-100 p-6 rounded-lg'>
                        <h1 className='text-2xl font-bold text-center mb-4'>Edit Profile</h1>
                        <div className='flex justify-center mb-6'>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-4 py-2 rounded-l-lg ${activeTab === 'profile' ? 'bg-purple-900 text-white' : 'bg-purple-200 text-purple-900'}`}
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`px-4 py-2 rounded-r-lg ${activeTab === 'password' ? 'bg-purple-900 text-white' : 'bg-purple-200 text-purple-900'}`}
                            >
                                Change Password
                            </button>
                        </div>

                        {activeTab === 'profile' && (
                            <form onSubmit={handleProfileSubmit} className='mb-8'>
                                <div className='flex flex-col space-y-4'>
                                    <div className='flex flex-col'>
                                        <label className='text-sm font-medium mb-1'>Name</label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleProfileChange}
                                            className='border rounded p-2'
                                            placeholder='Enter your name'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-sm font-medium mb-1'>Email</label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleProfileChange}
                                            className='border rounded p-2'
                                            placeholder='Enter your email'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-sm font-medium mb-1'>Organisation</label>
                                        <input
                                            type='text'
                                            name='organisation'
                                            value={formData.organisation}
                                            onChange={handleProfileChange}
                                            className='border rounded p-2'
                                            placeholder='Enter your organisation'
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className={`px-4 py-2 rounded mt-4 ${hasChanges() ? 'bg-purple-900 hover:bg-purple-700 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
                                        disabled={!hasChanges()}
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'password' && (
                            <form onSubmit={handlePasswordSubmit} className='mb-8'>
                                <div className='flex flex-col space-y-4'>
                                    <div className='flex flex-col'>
                                        <label className='text-sm font-medium mb-1'>Old Password</label>
                                        <input
                                            type='password'
                                            name='oldPassword'
                                            value={passwordData.oldPassword}
                                            onChange={handlePasswordChange}
                                            className='border rounded p-2'
                                            placeholder='Enter your old password'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-sm font-medium mb-1'>New Password</label>
                                        <input
                                            type='password'
                                            name='newPassword'
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className='border rounded p-2'
                                            placeholder='Enter your new password'
                                        />
                                    </div>
                                    <button type='submit' className='bg-purple-900 hover:bg-purple-900/30 text-white hover:text-black backdrop-blur-lg shadow-lg px-1 py-2 rounded text-sm'>
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;