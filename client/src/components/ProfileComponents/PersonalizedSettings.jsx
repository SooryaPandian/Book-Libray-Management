import React from 'react';

const PersonalizedSettings = ({ user }) => (
  <div className="content-section">
    <h3>Personalized Settings</h3>
    <p><strong>Genres:</strong> {user?.genres.join(", ")}</p>
    <p><strong>Themes:</strong> Dark Mode</p>
    <p><strong>Notifications:</strong> Enabled</p>
  </div>
);

export default PersonalizedSettings;
