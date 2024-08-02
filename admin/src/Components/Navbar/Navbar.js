import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing FontAwesome icons
import logo from "../../Assets/logo.png";
import { useSelector } from "react-redux";
import { logout } from "../../Actions/adminActions";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import profilePicture from "../../Assets/profile.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [username, setUsername] = useState(""); // To store username
  const dropdownRef = useRef(null); // Ref for the dropdown element
  const currentUser = useSelector(state=>state.auth.user);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("currentUser",currentUser);
    // Function to fetch user profile info from backend
    const fetchUserProfile = async () => {
      try {
        if(currentUser){
          setUsername(currentUser.name);
        }
      } catch (error) {
        // Handle error (e.g., user not authenticated)
        setUsername("");
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile(); // Call the function when component mounts
  }, [currentUser]);

  // Effect to add event listener when component mounts
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };

    // Add event listener
    window.addEventListener("click", handleClickOutside);

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const handleLogout = () => {
    // Implement logout functionality (clear cookies, etc.)
    // For demonstration, we're just updating state here
    dispatch(logout());
    setUsername("");
  };

  const handleProfile = () => {
    navigate('/profile');
  }

  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];

  return (
    <div className="shadow-md w-full fixed md:py-1 md:px-10 bg-white font flex justify-center z-50">
      <div className="md:w-4/5 flex items-center justify-between bg-white px-3">
        <div className="md:w-1/5 w-2/3 font-bold text-2xl cursor-pointer flex items-center text-gray-800">
          <a href="/">
            <img className="md:w-4/5" src={logo} alt="logo"></img>
          </a>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl cursor-pointer md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-white md:z-auto z-[-1] right-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-12 " : "top-[-450px]"
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

          <li className="md:px-8 md:py-0 py-3 relative" ref={dropdownRef}>
            <div onClick={toggleUserDropdown} className="cursor-pointer">
            <img className="w-8 h-8 object-cover rounded-full" src={currentUser?.imageUrl || profilePicture} alt="Profile" />
            </div>
            {userDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 border-b text-gray-700">
                      {username}
                    </div>
                    <div
                      className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                    <div onClick={handleProfile} className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100">
                      Profile
                    </div>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    Login
                  </a>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
