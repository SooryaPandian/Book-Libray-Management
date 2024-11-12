import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginSignupPage.css";

function LoginSignup({ setIsLoggedIn }) {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    genres: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      setSuccessMessage("Account created successfully! Please log in.");
      setErrorMessage("");
      toggleMode(); // Switch to login mode after successful signup
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during signup.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      setSuccessMessage("Logged in successfully!");
      setIsLoggedIn(true);
      setErrorMessage("");

      // Navigate to the home or profile page
      navigate(-1); // Adjust this path as neede

    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className={`loginSignupContainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      {/* Login Form Section */}
      <div className="form-container sign-in-container">
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>

      {/* Signup Form Section */}
      <div className="form-container sign-up-container">
        <h1>Create Account</h1>
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          value={formData.user_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="genres"
          placeholder="Favorite Genres (comma-separated)"
          value={formData.genres}
          onChange={handleInputChange}
        />
        <button onClick={handleSignup}>Create Account</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>

      {/* Overlay Section */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button onClick={toggleMode} className="ghost">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start your journey with us</p>
            <button onClick={toggleMode} className="ghost">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
