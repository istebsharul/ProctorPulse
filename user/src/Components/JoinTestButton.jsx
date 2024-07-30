import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function JoinTestButton() {
    const [testId, setTestId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleJoinTest = (e) => {
        e.preventDefault();
        if(testId && password){
            navigate(`/quiz?testId=${testId}&password=${password}`)
        }else if(testId && !password){
            alert("Enter Password to Continue!");
        }else if(password && !testId){
            alert("Enter Id to Continue!");
        }else{
            alert("Enter Id and Password to Continue!");
        } 
    
        setTestId('');
        setPassword('');
    };

    return (
        <div className='w-3/5 flex flex-col h-full py-10 flex justify-center items-center space-y-4 bg-purple-900 rounded-2xl'>
            <h1 className='text-center text-white text-2xl'>Join Test</h1>
            <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    value={testId}
                    onChange={(e) => setTestId(e.target.value)}
                    placeholder="Test ID"
                    className="md:w-2/5 bg-white text-black px-4 py-2 font-Poppins text-md rounded-lg shadow-inner-md"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="md:w-2/5 bg-white text-black px-4 py-2 font-Poppins text-md rounded-lg shadow-inner-md"
                />
            </div>
            <button
                className="md:w-fit bg-purple-200 hover:bg-purple-100 text-black px-10 py-2 font-Poppins text-xl rounded-3xl shadow-inner-md flex justify-center items-center"
                onClick={handleJoinTest}
            >
                Take Assessment
            </button>
        </div>
    );
}

export default JoinTestButton;
