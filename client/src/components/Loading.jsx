// components/Loading.jsx
import React from 'react';
import './styles/Loading.css'; // Optional: Add custom styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
