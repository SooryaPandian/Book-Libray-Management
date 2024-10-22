import React, { useState } from "react";
import "./styles/LoginSignupPage.css"; // Link the updated CSS file

function LoginSignup() {
  const [isSignUpMode, setSignUpMode] = useState(false);

  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };

  return (
    <div className={`loginSignupContainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      {/* Sign In Form Section */}
      <div className="form-container sign-in-container">
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot Your Password?</a>
        <button>Sign In</button>
      </div>

      {/* Sign Up Form Section */}
      <div className="form-container sign-up-container">
        <h1>Create Account</h1>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
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
