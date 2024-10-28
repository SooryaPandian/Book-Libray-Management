import React, { useState } from 'react';
import './styles/Navbar.css';

const Navbar = ({ onSearch, isLoggedIn, handleLogout }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="app-name">MyBookApp</div>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <a href="/profile" className="nav-link">👤 Profile</a>
            <button onClick={handleLogout} className="nav-link"> Logout</button>
          </>
        ) : (
          <>
            {/* <a href="/signup" className="nav-link">🔑 Sign Up</a> */}
            <a href="/auth" className="nav-link">🔒 Login</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
