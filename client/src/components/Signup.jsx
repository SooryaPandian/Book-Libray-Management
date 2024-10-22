import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import signupImage from '../assets/login-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Home button */}
        <button onClick={() => navigate('/')} className="home-button">
        <FontAwesomeIcon icon={faHouse} />
        </button>

        {/* Left side for the image */}
        <div className="signup-image">
          <img src={signupImage} alt="Signup" />
        </div>

        {/* Right side for the form */}
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <button type="submit">Sign Up</button>
          </form>

          <p className="redirect-link">
            Already signed up? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
