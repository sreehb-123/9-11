import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import './Navbar.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError('');
  };

  const handleSearchClick = () => {
    if (searchTerm.trim().length > 2) {
      navigate(`/search-results?q=${searchTerm}`);
    } else {
      if (searchTerm.trim().length > 0) {
        setError('Search term must be longer than 2 characters.');
      }
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={handleSearchClick} className="search-button">
        <i className="bx bx-search"></i>
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Search;
