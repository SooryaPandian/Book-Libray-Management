import React from 'react';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="app-name">MyBookApp</div>
      </div>
      <div className="navbar-center">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="navbar-right">
        <a href="/signup" className="nav-link">
          <span className="signup-icon">🔑 Sign Up</span>
        </a>
        <a href="/login" className="nav-link">
          <span className="login-icon">🔒 Login</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
