import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/globepeek.png'; // Import your logo image

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-6 md:px-10 py-4 md:py-8 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="GlobePeek Logo" className="h-8 w-8 md:h-10 md:w-10" />
        <h1 className="text-xl md:text-2xl font-extrabold text-black tracking-wide">GLOBEPEEK</h1>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:text-blue-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } absolute top-full left-0 w-full bg-white md:static md:w-auto md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-lg font-medium shadow-md md:shadow-none`}
      >
        <a
          href="/dashboard"
          className="block text-gray-700 hover:text-blue-500 transition px-4 py-2 md:p-0"
        >
          Home
        </a>
        <a
          href="/favourites"
          className="block text-gray-700 hover:text-blue-500 transition px-4 py-2 md:p-0"
        >
          Favorites
        </a>
        <button
          onClick={handleLogout}
          className="block text-gray-700 hover:text-red-500 transition px-4 py-2 md:p-0"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;