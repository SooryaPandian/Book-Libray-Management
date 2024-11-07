import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import './styles/SearchBar.css'; // Import search styles
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
        <Link to="/" className="app-name">MyBookApp</Link>
        <Link to="/collections" className="nav-link">📚 Collections</Link>
      </div>
      <div className="navbar-center">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for books"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input" // Updated for styling consistency
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-link">👤 Profile</Link>
            <button onClick={handleUserLogout} className="nav-link logout-button">🔓 Logout</button>
          </>
        ) : (
          <Link to="/auth" className="nav-link">🔒 Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
