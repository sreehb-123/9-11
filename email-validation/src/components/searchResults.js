import React, { useEffect, useState } from 'react';
import { useLocation , Link} from 'react-router-dom';
import Navbar from './Navbar';
import './main.css';
import noData from './noData.svg';
import { useNavigate } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/home');
    };

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search).get('q');
      console.log('Query:', query); // Log the query parameter

      if (query) {
        try {
          const response = await fetch(`http://localhost:5000/search?q=${query}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Response data:', data); // Log the fetched data

          if (data && Array.isArray(data)) {
            setResults(data);
            setError('');
          } else {
            setResults([]);
            setError('No results found');
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
          setError('Error fetching search results');
        }
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <>
    <div className='NAVBAR'>
        <Navbar />
    </div>
    <div className="main">
    <div className="search-results">
      {error && <p className="error-message">{error}</p>}
      <ul>
        {results.length > 0 ? (
          results.map((book) => (
            <li key={book._id}>
              <h3><Link to={`/book/${book._id}`}>{book.title}</Link></h3>
              <p>{book.author}</p>
            </li>
          ))
        ) : (<div className='not-found'>
          <img src={noData} alt="Loading illustration" ></img>
          <p>No results found</p>
          <button onClick={navigateHome} className="return-home">Return To Home</button>
          </div>
        )}
      </ul>
    </div>
    </div>
    </>
  );
}

export default SearchResults;
