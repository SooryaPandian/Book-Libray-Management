// components/ProfileComponents/ProfileSection.js
import React from 'react';
import { useProfileContext } from './ProfileContext';

const ProfileSection = () => {
  const { user, setEditModalOpen } = useProfileContext();

  return (
    <div className="content-section">
      <h2>{user?.user_name}</h2>
      <p>Email: {user?.email}</p>
      <p>Genres: {user?.genres.join(', ')}</p>
      <button onClick={() => setEditModalOpen(true)} className="edit-profile-button">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSection;
