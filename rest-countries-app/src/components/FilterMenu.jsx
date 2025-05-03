import React from 'react';

const FilterMenu = ({ onFilter }) => {
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="p-2 border border-gray-300 rounded"
    >
      {regions.map((region) => (
        <option key={region} value={region}>{region}</option>
      ))}
    </select>
  );
};

export default FilterMenu;