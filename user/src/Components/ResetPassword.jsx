import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Actions/userActions";
import image1 from "../Assets/image1.png";
import image2 from "../Assets/image2.png";
import { useParams } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    const {token} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password,confirmPassword,token));
    }

    return (
        <>
            <div className="flex flex-wrap justify-center items-center bg-purple-200">
                <div className="w-full md:w-2/5 flex justify-center items-center p-5">
                    <img className="w-1/3" src={image1} alt="" />
                    <img className="w-1/3" src={image2} alt="" />
                </div>
                <div className="w-full md:w-3/5 md:h-screen rounded-tl-3xl rounded-bl-3xl bg-white flex justify-center items-center">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full md:w-3/5 space-y-2 items-center p-5 md:p-0"
                    >
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold font-poppins">
                                Reset Password
                            </h1>
                            <h3 className="p-1 text-sm md:text-base">
                                Your are just one step away from creating new Password!
                            </h3>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-2xl px-5 py-2.5 focus:outline-none focus:border-purple-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-2xl px-5 py-2.5 focus:outline-none focus:border-purple-500"
                        />

                        <button
                            type="submit"
                            className="w-full border rounded-2xl px-5 py-3 focus:outline-none bg-purple-900 text-white text-lg md:text-xl"
                        >
                            Reset Password
                        </button>

                        <div className="text-center flex justify-center">
                            Remember Password
                            <a href="/login" className="font-bold px-2">
                                Log In
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
