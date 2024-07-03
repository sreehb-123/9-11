import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import './Navbar.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
   const [error, setError] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setResults([]); 
      setError(''); 
    }
  };

  const handleSearchClick = async() => {
    if(searchTerm.trim().length > 2){
      try{
        const response = await fetch(`http://localhost:5000/search?q=${searchTerm}`);
        const data = await response.json();
        setResults(data);
        setError(''); 
      } catch (error) {
        console.error('Error fetching search results', error);
        setError('Error fetching search results');
      }
    } else {
      if (searchTerm.trim().length > 0) {
        console.log('Search term must be longer than 2 characters.');
        
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
      <ul className="search-results">
          {results.map((book) => (
              <li key={book._id}>
                  <Link to={`/book/${book._id}`}>
                    <h3>{book.title}</h3>
                  </Link>
                  <p>{book.author}</p>
              </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
