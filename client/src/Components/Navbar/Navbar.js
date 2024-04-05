import React, { useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa"; // Importing FontAwesome icons
import logo from "../../Assets/logo.png";

const Navbar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed md:py-1 md:px-10 bg-white font flex justify-center z-50">
      <div className="md:w-4/5 flex items-center justify-between bg-white px-3">
        <div className="md:w-1/5 w-2/3 font-bold text-2xl cursor-pointer flex items-center text-gray-800">
          <a href="/">
            <img className="md:w-4/5" src={logo}></img>
          </a>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl cursor-pointer md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-white md:z-auto z-[-1] right-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12 " : "top-[-450px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}

          <li className="md:px-8 md:py-0 py-3">
            <a href="/login">
              <FaUser />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
