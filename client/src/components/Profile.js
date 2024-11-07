import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null); // Initially set to null to indicate no data
  const [loading, setLoading] = useState(true); // Loading state for user data

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assume token is stored in localStorage after login
        const response = await axios.get("/api/user/profile", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUser(response.data); // Update user data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    // Profile editing logic
    alert("Edit Profile Clicked");
  };

  if (loading) return <p>Loading...</p>; // Loading indicator

  if (!user) return <p>Error loading profile information.</p>; // Error handling if no user data

  return (
    <div className="profile-top-section">
      <div className="profile-picture">
        <img src={user.profilePic || "https://via.placeholder.com/100"} alt="Profile" /> {/* Default picture if none */}
      </div>
      <div className="profile-info">
        <h2>{user.user_name}</h2>
        <p>{user.email}</p>
        <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
