import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load user from localStorage and set state
  const loadUser = () => {
    const user = localStorage.getItem("user");
    try {
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser?.username) {
          setUserName(parsedUser.username);
          setUserRole(parsedUser.role);
        }
      } else {
        setUserName('');
        setUserRole('');
      }
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      localStorage.removeItem("user");
      setUserName('');
      setUserRole('');
    }
  };

  useEffect(() => {
    // Load user on component mount
    loadUser();

    // Listen for custom storageUpdate event
    window.addEventListener("storageUpdate", loadUser);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("storageUpdate", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName('');
    setUserRole('');
    navigate('/');
    window.dispatchEvent(new Event("storageUpdate")); // 👈 Update Navbar state
  };

  const isLoggedIn = !!userName;

  return (
    <div className='flex items-center justify-between text-sm p-0.5 mb-5 border-b border-b-gray-400'>
      <img
        onClick={() => navigate('/home')}
        className='w-40 cursor-pointer'
        src={assets.logo}
        alt="CareNest Logo"
      />

      <ul className='hidden md:flex items-center justify-center flex-grow gap-8 font-medium pt-12'>
        <Link to='/home'>
          <li className='py-1 hover:text-primary'>HOME</li>
        </Link>
        <Link to='/about'>
          <li className='py-1 hover:text-primary'>ABOUT</li>
        </Link>
        <Link to='/contact'>
          <li className='py-1 hover:text-primary'>CONTACT</li>
        </Link>

        {isLoggedIn && (
          <>
            {userRole === 'admin' && (
              <>
                <Link to='/admin'>
                  <li className='py-1 hover:text-primary'>MANAGE CAREGIVERS</li>
                </Link>
                <Link to='/add-caregiver'>
                  <li className='py-1 hover:text-primary'>ADD CAREGIVER</li>
                </Link>
              </>
            )}

            {userRole === 'caregiver' && (
              <Link to='/caregiver-panel'>
                <li className='py-1 hover:text-primary'>MY APPOINTMENTS</li>
              </Link>
            )}

            {userRole === 'family' && (
              <>
                <Link to='/caregivers'>
                  <li className='py-1 hover:text-primary'>FIND CAREGIVERS</li>
                </Link>
                <Link to='/my-appointments'>
                  <li className='py-1 hover:text-primary'>MY APPOINTMENTS</li>
                </Link>
              </>
            )}
          </>
        )}
      </ul>

      <div className="flex flex-col items-center">
        {isLoggedIn ? (
          <div className="relative mt-8">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
            >
              <FaUserCircle size={24} className="text-gray-700" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My-Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-9 flex flex-row gap-4">
            <Link to='/'>
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
