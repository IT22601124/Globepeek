import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterMenu from '../components/FilterMenu';
import Footer from '../components/Footer';
import { getAllCountries, getCountriesByRegion, getCountriesByCurrency } from '../services/api'; // Import the new API function
import backgroundImage from '../assets/images/487528.jpg'; // Import your background image

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
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
    const fetchCountries = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFiltered(data);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (query) => {
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  const handleRegionFilter = async (region) => {
    if (region === 'All') {
      setFiltered(countries);
      return;
    }

    try {
      setLoading(true);
      const result = await getCountriesByRegion(region);
      setFiltered(result);
    } catch (err) {
      console.error('Region filter failed:', err);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  // New function to filter countries by currency
  const handleCurrencyFilter = async (currency) => {
    if (!currency) {
      setFiltered(countries); // fallback to all
      return;
    }

    try {
      setLoading(true);
      const result = await getCountriesByCurrency(currency);
      setFiltered(result);
    } catch (err) {
      console.error('Currency filter failed:', err);
      setFiltered([]); // No result or error fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
      <Navbar />
      <div className="container mx-auto mt-24"></div>
      <div className="p-4 md:p-8 bg-black bg-opacity-80 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <SearchBar onSearch={handleSearch} />
          <div className='flex flex-row gap-4'>
          <FilterMenu onFilter={handleRegionFilter} />
          {/* Add a dropdown or input for currency filtering */}
          <div >
            <select
              onChange={(e) => handleCurrencyFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
        </div>

          </div>
          
        {!loading && (
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
