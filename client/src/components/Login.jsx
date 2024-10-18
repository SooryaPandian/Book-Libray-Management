import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import loginImage from '../assets/login-image.png';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side for the form */}
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <button type="submit">Login</button>
          </form>

          <p className="redirect-link">
            Not a User? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        {/* Right side for the image */}
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
