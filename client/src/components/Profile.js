// components/Profile.js
import React, { useState } from 'react';
import './styles/Profile.css';
import { ProfileProvider } from './ProfileComponents/ProfileContext';
import ProfileSection from './ProfileComponents/ProfileSection';
import ReadingStats from './ProfileComponents/ReadingStats';
import ReviewsFavorites from './ProfileComponents/ReviewsFavorites';
import PersonalizedSettings from './ProfileComponents/PersonalizedSettings';
import AccountActions from './ProfileComponents/AccountActions';
import Collection from './Collections';
import EditProfileModal from './ProfileComponents/EditProfileModal';
import PasswordModal from './ProfileComponents/PasswordModal';
import DeleteAccountModal from './ProfileComponents/DeleteAccountModal';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'stats':
        return <ReadingStats />;
      case 'reviews':
        return <ReviewsFavorites />;
      case 'collections':
        return <Collection />;
      case 'settings':
        return <PersonalizedSettings />;
      case 'actions':
        return <AccountActions />;
      default:
        return null;
    }
  };

  return (
    <ProfileProvider>
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

        {/* Render Modals */}
        <EditProfileModal />
        <PasswordModal />
        <DeleteAccountModal />
      </div>
    </ProfileProvider>
  );
};

export default Profile;
