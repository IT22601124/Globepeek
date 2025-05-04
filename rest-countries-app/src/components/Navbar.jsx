import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/globepeek.png'; // Import your logo image

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-10 py-8 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="GlobePeek Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-extrabold text-black tracking-wide">GLOBEPEEK</h1>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 text-lg font-medium">
        <a href="/dashboard" className="text-gray-700 hover:text-blue-500 transition">Home</a>
        <a href="/favourites" className="text-gray-700 hover:text-blue-500 transition">Favorites</a>
        {/* <a href="/login" className="text-gray-700 hover:text-blue-500 transition">Login</a> */}
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
