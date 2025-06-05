import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons

const Navbar = () => {
  const navigate = useNavigate();

  // State to track the username
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility

  useEffect(() => {
    // Check localStorage for user data on component mount
    const user = localStorage.getItem("user");
    if (user) {
      setUserName(JSON.parse(user).username); // Assuming 'username' is stored in user data
    }
  }, []); // Empty dependency array ensures this runs only on component mount

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem("user");
    setUserName('');
    navigate('/login');
  };

  // Check if the user is logged in based on localStorage
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className='flex items-center justify-between text-sm p-0.5 mb-5 border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt="CareNest Logo" />

      <ul className='hidden md:flex items-center justify-center flex-grow gap-8 font-medium pt-12'>
        <Link to='/'>
          <li className='py-1 hover:text-primary'>HOME</li>
        </Link>
        <Link to='/caregivers'>
          <li className='py-1 hover:text-primary'>CAREGIVERS</li>
        </Link>
        <Link to='/about'>
          <li className='py-1 hover:text-primary'>ABOUT</li>
        </Link>
        <Link to='/contact'>
          <li className='py-1 hover:text-primary'>CONTACT</li>
        </Link>
      </ul>

      <div className="flex flex-col items-center">
        {/* Profile Icon in a separate div */}
        {isLoggedIn && (
          <div className="relative mt-8">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
            >
              <FaUserCircle size={24} className="text-gray-700" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Login/Signup Buttons in a separate div */}
        {!isLoggedIn && (
          <div className="mt-9 flex flex-row gap-4">
            <Link to='/login'>
              <button className='py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300'>
                Login
              </button>
            </Link>

            <Link to='/signup'>
              <button className='py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300'>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
