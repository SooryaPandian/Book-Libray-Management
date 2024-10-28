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

  const navigate = useNavigate(); // useNavigate hook

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
    } catch (error) {
      setErrorMessage(error.message);
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

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={`loginSignupContainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      {/* Sign In Form Section */}
      <div className="form-container sign-in-container">
        <h1>Sign In</h1>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <button onClick={handleLogin}>Sign In</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>

      {/* Sign Up Form Section */}
      <div className="form-container sign-up-container">
        <h1>Create Account</h1>
        <input type="text" name="user_name" placeholder="Name" value={formData.user_name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="genres" placeholder="Favorite Genres (comma-separated)" value={formData.genres} onChange={handleInputChange} />
        <button onClick={handleSignup}>Sign Up</button>
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
