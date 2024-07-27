// Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/userActions";
import image1 from "../../Assets/image1.png";
import {useNavigate} from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        // Assuming login action sets isLoggedIn in Redux state
        // updateStatus(); // Update parent component state if needed
        navigate('/');
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center bg-purple-200">
        <div className="w-full md:w-2/5 flex justify-center items-center p-5">
          <img className="w-3/4" src={image1} alt="" />
          {/* <img className="w-2/5 absolute top-30 left-10" src={image2} alt="" /> */}
        </div>
        <div className="w-full md:w-3/5 md:h-screen rounded-tl-3xl md:rounded-bl-3xl bg-white flex justify-center items-center">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-3/5 space-y-1 md:space-y-3 items-center p-5 md:p-0"
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-poppins">
                Welcome Back!
              </h1>
              <h3 className="p-1 text-sm md:text-base">
                We are happy to see you back. Enter your registered email and
                password.
              </h3>
            </div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-full border rounded-2xl px-5 py-3 focus:outline-none bg-purple-900 text-white text-lg md:text-xl"
            >
              Login
            </button>

            <a
              href="/forgotpassword"
              className="text-center font-bold m-auto flex justify-center"
            >
              Forgot Password?
            </a>
            <div className="flex items-center justify-center mt-4">
              <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
            </div>
            <div className="flex items-center justify-center mt-4">
              <a
                href="/signup"
                className="border rounded-2xl px-4 md:px-10 py-2.5 focus:outline-none bg-gray-900 text-white text-lg md:text-xl"
              >
                Register with us
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
