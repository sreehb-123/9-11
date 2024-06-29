import React from 'react'; // Replace with your SVG icon// Re
import './Navbar.css';
import Search from './Search';
import Menu from './Menu';

function Navbar() {

  return (
    <nav className="navbar">
      <div className="user-container">
        <Menu />
        <div className="welcome-text">WELCOME USER</div>
      </div>
      <div className="search-container">
        <Search />
      </div>
    </nav>
  );
}

export default Navbar;
