import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CountryCard from '../components/CountryCard';
import Footer from '../components/Footer';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]); // State to store favorite countries
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();

  // Check for session on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const res = await fetch('https://globepeekbackend.azurewebsites.net/api/favorites', {
          method: 'GET',
          headers: {
            Authorization: token, // Pass the token in the Authorization header
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch favorites');

        setFavorites(data.favorites); // Set the favorite countries
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className='mt-20'></div>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Your Favorite Countries</h1>
        {loading ? (
          // Show loading animation while data is being fetched
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : favorites.length > 0 ? (
          // Show favorite country cards
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((favorite) => (
              <CountryCard key={favorite.country.cca3} country={favorite.country} />
            ))}
          </div>
        ) : (
          // Show message if no favorites are found
          <p className="text-center text-gray-500">You have no favorite countries yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourites;