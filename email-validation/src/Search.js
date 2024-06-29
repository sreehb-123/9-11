import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import './Navbar.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search">
        <i class='bx bx-search'></i>
      <input
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
    </div>
  );
}
