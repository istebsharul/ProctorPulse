import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Actions/actions";
import image1 from "../../Assets/image1.png";
import image2 from "../../Assets/image2.png";
import google_logo from "../../Assets/google_logo.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password, userType));
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center bg-purple-200">
        <div className="w-full md:w-2/5 flex justify-center items-center p-5">
          <img className="w-1/3" src={image1} alt="" />
          <img className="w-1/3" src={image2} alt="" />
        </div>
        <div className="w-full md:w-3/5 rounded-tl-3xl md:h-screen md:rounded-bl-3xl bg-white flex justify-center items-center">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-3/5 space-y-1 m-auto p-5 md:p-0"
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-poppins">
                Create an Account
              </h1>
              <h3 className="p-1 text-sm md:text-base">
                Create an Account, It takes less than a minute. Enter your
                Credentials.
              </h3>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="w-full border border-gray-300 rounded-2xl px-5 py-2.5 focus:outline-none focus:border-purple-500 flex ">
                <input
                  type="radio"
                  id="student"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label className="px-2" htmlFor="student">
                  Student
                </label>
              </div>

              <div className="w-full border border-gray-300 rounded-2xl px-5 py-2.5 focus:outline-none focus:border-purple-500 flex">
                <input
                  type="radio"
                  id="teacher"
                  name="userType"
                  value="teacher"
                  checked={userType === "teacher"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label className="px-2" htmlFor="teacher">
                  Teacher
                </label>
              </div>
            </div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-2.5 focus:outline-none focus:border-purple-500"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-2.5 focus:outline-none focus:border-purple-500"
            />
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
              className="w-full border rounded-2xl px-5 py-2.5 focus:outline-none bg-purple-900 text-white text-lg md:text-xl"
            >
              Register
            </button>
            <div className="flex items-center justify-center mt-4">
              <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
            </div>
            <div className="flex items-center justify-center mt-4">
              <a
                href="/signup"
                className="border rounded-2xl px-4 md:px-10 py-2.5 flex items-center justify-center focus:outline-none bg-gray-900 text-white text-lg md:text-xl"
              >
                <img src={google_logo} className="w-5 mr-2" alt="Google Logo" />
                Continue with Google
              </a>
            </div>

            <div className="text-center p-4">
              Already Have an Account?{" "}
              <a href="/login" className="font-bold text-purple-900">
                Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
