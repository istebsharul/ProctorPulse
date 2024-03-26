import React, { useState } from "react";
import { FaUser, FaUserPlus, FaPhone, FaSignOutAlt } from "react-icons/fa"; // Assuming you're using react-icons for icons
import logo from "../../Assets/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      console.log("Profile");
    }
  };
  return (
    <nav className="w-4/5 flex justify-between items-center m-auto">
      <div className="w-1/5 ">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="w-1/3 flex justify-end items-center">
        <li className="w-1/5 flex justify-center">
          <a href="/">Home</a>
        </li>
        <li className="w-1/5 flex justify-center">
          <a href="/about">About</a>
        </li>
        <li className="w-1/5 flex justify-center">
          <a href="/services">Services</a>
        </li>
        <li className="w-1/5 flex justify-center">
          <FaUser />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
