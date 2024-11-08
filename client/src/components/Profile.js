import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Profile.css';
import Collection from './Collections'; // Import the Collection component


const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  // const [collections, setCollections] = useState([]); // New state for collections
  // const [loadingCollections, setLoadingCollections] = useState(false);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to fetch user's collections
  // const fetchUserCollections = async () => {
  //   setLoadingCollections(true);
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/collections', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //       withCredentials: true,
  //     });
  //     setCollections(response.data); // Update collections with fetched data
  //   } catch (error) {
  //     console.error("Error fetching collections:", error);
  //   } finally {
  //     setLoadingCollections(false);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch collections only when the Collections section is active
  //   if (activeSection === 'collections') {
  //     fetchUserCollections();
  //   }
  // }, [activeSection]);

  if (!user) return <p>Loading...</p>;

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="content-section">
            <h2>{user.user_name}</h2>
            <p>Email: {user.email}</p>
            <p>Genres: {user.genres.join(', ')}</p>
            <button onClick={() => alert("Edit Profile Clicked")} className="edit-profile-button">
              Edit Profile
            </button>
          </div>
        );
      case 'stats':
        return (
          <div className="content-section">
            <h3>Reading Stats and Goals</h3>
            <p><strong>Books Read:</strong> 15</p>
            <p><strong>Currently Reading:</strong> 2</p>
            <p><strong>To-Read List:</strong> 8</p>
            <p><strong>Annual Goal Progress:</strong> 75%</p>
          </div>
        );
      case 'reviews':
        return (
          <div className="content-section">
            <h3>Reviews and Favorites</h3>
            <p><strong>Reviews & Ratings:</strong> View your recent reviews</p>
            <p><strong>Recommendations:</strong> Based on your ratings</p>
            <p><strong>Bookmarked Books:</strong> 10</p>
          </div>
        );
      case 'settings':
        return (
          <div className="content-section">
            <h3>Personalized Settings</h3>
            <p><strong>Genres:</strong> {user.genres.join(", ")}</p>
            <p><strong>Themes:</strong> Dark Mode</p>
            <p><strong>Notifications:</strong> Enabled</p>
          </div>
        );
      case 'actions':
        return (
          <div className="content-section">
            <h3>Account Actions</h3>
            <button className="account-button">Update Password</button>
            <button className="account-button">Logout</button>
            <button className="account-button delete-account">Delete Account</button>
          </div>
        );
      case 'collections':
        return <Collection userId={user.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <button onClick={() => setActiveSection('profile')}>Profile</button>
        <button onClick={() => setActiveSection('stats')}>Reading Stats & Goals</button>
        <button onClick={() => setActiveSection('reviews')}>Reviews & Favorites</button>
        <button onClick={() => setActiveSection('collections')}>Collections</button>
        <button onClick={() => setActiveSection('settings')}>Personalized Settings</button>
        <button onClick={() => setActiveSection('actions')}>Account Actions</button>
      </div>

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
