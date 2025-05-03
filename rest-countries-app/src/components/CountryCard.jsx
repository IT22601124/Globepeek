import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const CountryCard = ({ country }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const [loading, setLoading] = useState(false); // State to track loading status
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const modalRef = useRef(null); // Ref for the modal


  const navigate = useNavigate();
  // Check if the country is already a favorite
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const res = await fetch('http://localhost:5000/api/favorites/', {
          method: 'GET',
          headers: {
            Authorization: token, // Pass the token in the Authorization header
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch favorites');

        // Check if the current country is in the list of favorites
        const isFavorited = data.favorites.some(
          (fav) => fav.country.cca3 === country.cca3
        );
        setIsFavorite(isFavorited);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    checkFavoriteStatus();
  }, [country]);

  const toggleFavorite = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (isFavorite) {
        // Remove from favorites
        const res = await fetch(`http://localhost:5000/api/favorites/${country.cca3}`, {
          method: 'DELETE',
          headers: {
            Authorization: token, // Pass the token in the Authorization header
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to remove favorite');
        console.log('Favorite removed successfully');
      } else {
        // Add to favorites
        const res = await fetch('http://localhost:5000/api/favorites/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token, // Pass the token in the Authorization header
          },
          body: JSON.stringify({ country }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to save favorite');
        console.log('Favorite saved successfully');
      }

      setIsFavorite(!isFavorite); // Toggle the favorite status
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      {/* Country Card */}
      <div
        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => {
          navigate(`/country/${country.cca3}`);}} // Open modal on click
      >
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-40 object-cover rounded"
        />
        <div className="flex justify-between items-center mt-4">
          <h2 className="font-semibold text-lg">{country.name.common}</h2>
          {/* Favorite Icon */}
          {loading ? (
            <FaSpinner className="animate-spin text-gray-500" size={20} /> // Show spinner while loading
          ) : (
            <FaHeart
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening when clicking the heart
                toggleFavorite();
              }}
              className={`cursor-pointer transition ${
                isFavorite ? 'text-red-500' : 'text-gray-300'
              }`}
              size={20}
            />
          )}
        </div>
        <p className="text-sm text-gray-600">Population: {country.population.toLocaleString()}</p>
        <p className="text-sm text-gray-600">Region: {country.region}</p>
        <p className="text-sm text-gray-600">Capital: {country.capital?.[0]}</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)} // Close modal
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center">{country.name.common}</h2>
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Population:</strong> {country.population.toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="text-gray-700">
                <strong>Capital:</strong> {country.capital?.[0]}
              </p>
              <p className="text-gray-700">
                <strong>Subregion:</strong> {country.subregion}
              </p>
              <p className="text-gray-700">
                <strong>Area:</strong> {country.area.toLocaleString()} km²
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryCard;