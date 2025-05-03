import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCountryByAlphaCode } from '../services/api'; // Import the API function

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByAlphaCode(code); // Use the API function
        setCountry(data[0]);
      } catch (err) {
        console.error('Failed to fetch country details:', err);
      }
    };

    fetchCountry();
  }, [code]);

  if (!country) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <Navbar />
      <div className="mt-28"></div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">{country.name.common}</h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-full lg:w-1/2 rounded-lg shadow"
          />

          <div className="w-full lg:w-1/2 space-y-4 text-lg">
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
            <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
