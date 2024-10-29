import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Event listener for storage changes
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleUserLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false); // Update state immediately in the current tab
    window.location.href = '/auth'; // Navigate to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={"/"} ><div className="app-name">MyBookApp</div></Link>
        <Link to="/collections" className="nav-link">📚 Collections</Link>
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
            <button onClick={handleUserLogout} className="nav-link">🔓 Logout</button>
          </>
        ) : (
          <a href="/auth" className="nav-link">🔒 Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
