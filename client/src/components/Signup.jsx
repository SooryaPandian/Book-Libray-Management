import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import signupImage from '../assets/login-image.png';

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
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
