// Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/actions";
import image1 from "../../Assets/image1.png";
import image2 from "../../Assets/image2.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-purple-200">
        <div className="w-2/5 flex justify-center items-center  p-5">
          <img className="" src={image1} alt=""></img>
          <img className="" src={image2} alt=""></img>
        </div>
        <div className="w-3/5 rounded-tl-3xl rounded-bl-3xl bg-white p-20">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3 items-center p-20">
            <div>
              <h1 className="text-5xl font-bold font-poppins">Welcome Back!</h1>
              <h3 className="p-1">
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
              className="w-full border rounded-2xl px-5 py-3 focus:outline-none bg-purple-900 text-white text-1.5xl"
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
              <hr className="w-1/4 border-gray-500 border-solid border-t-1" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="w-1/4 border-gray-500 border-solid border-t-1" />
            </div>
            <div className="flex items-center justify-center mt-4">
              <a
                href="/signup"
                className="border rounded-2xl px-20 py-2.5 focus:outline-none bg-gray-900 text-white text-1.5xl"
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
