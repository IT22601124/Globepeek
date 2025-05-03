export const getAllCountries = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    if (!res.ok) throw new Error('Failed to fetch countries');
    return await res.json();
  };

  
export const getCountryByAlphaCode = async (code) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) throw new Error(`Failed to fetch country with code: ${code}`);
  return await res.json();
};

export const getCountriesByRegion = async (region) => {
  const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  if (!res.ok) throw new Error('Failed to filter by region');
  return await res.json();
};

export const getCountriesByCurrency = async (currency) => {
  const res = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
  if (!res.ok) throw new Error('Failed to fetch countries by currency');
  return await res.json();
};
