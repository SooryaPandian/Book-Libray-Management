import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';
import Collection from './Collections';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [updatedUserName, setUpdatedUserName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedGenres, setUpdatedGenres] = useState('');
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false); // Add this line
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
        setUpdatedUserName(response.data.user_name);
        setUpdatedEmail(response.data.email);
        setUpdatedGenres(response.data.genres.join(', '));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/profile', {
        user_name: updatedUserName,
        email: updatedEmail,
        genres: updatedGenres.split(',').map((genre) => genre.trim()),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
      });
      setUser(response.data.user);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/profile/password',
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        }
      );
      alert(response.data.message);
      setPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setPasswordError(error.response?.data?.message || "Error updating password");
    }
  };

  if (!user) return <p>Loading...</p>;

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="content-section">
            <h2>{user.user_name}</h2>
            <p>Email: {user.email}</p>
            <p>Genres: {user.genres.join(', ')}</p>
            <button onClick={() => setEditModalOpen(true)} className="edit-profile-button">
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
            <button className="account-button" onClick={() => setPasswordModalOpen(true)}>
              Update Password
            </button>
            <button className="account-button" onClick={handleLogout}>Logout</button>
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

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleEditProfile(); }}>
              <label>
                Username:
                <input
                  type="text"
                  value={updatedUserName}
                  onChange={(e) => setUpdatedUserName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </label>
              <label>
                Genres (comma-separated):
                <input
                  type="text"
                  value={updatedGenres}
                  onChange={(e) => setUpdatedGenres(e.target.value)}
                />
              </label>
              <button type="submit" className="save-button">Save Changes</button>
              <button onClick={() => setEditModalOpen(false)} className="cancel-button">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Password</h3>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handlePasswordUpdate(); }}>
              <label>
                Current Password:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <button type="submit" className="save-button">Update Password</button>
              <button onClick={() => setPasswordModalOpen(false)} className="cancel-button">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
