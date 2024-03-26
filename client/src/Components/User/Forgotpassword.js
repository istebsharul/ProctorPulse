import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, login } from "../../Actions/actions";
import image1 from "../../Assets/image1.png";
import image2 from "../../Assets/image2.png";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-purple-200">
        <div className="w-2/5 flex justify-center items-center  p-5">
          <img className="" src={image1} alt=""></img>
          <img className="" src={image2} alt=""></img>
        </div>
        <div className="w-3/5 h-screen rounded-tl-3xl rounded-bl-3xl bg-white p-20">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3 items-center p-20">
            <div>
              <h1 className="text-5xl font-bold font-poppins">
                Forgot Password?
              </h1>
              <h3 className="p-1">
                Don’t worry! It happens. Please enter the email address linked
                with your Account.
              </h3>
            </div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              className="w-full border rounded-2xl px-5 py-3 focus:outline-none bg-purple-900 text-white text-1.5xl"
            >
              Login
            </button>

            <div className="text-center m-auto flex justify-center">
              Remember Password
              <a href="/login" className="font-bold px-2">
                {" "}
                Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
