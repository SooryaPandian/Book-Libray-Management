import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import loginImage from '../assets/login-image.png';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Home button */}
        <button onClick={() => navigate('/')} className="home-button">
        <FontAwesomeIcon icon={faHouse} />
        </button>

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
