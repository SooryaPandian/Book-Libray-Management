// components/ProfileComponents/EditProfileModal.js
import React from 'react';
import { useProfileContext } from './ProfileContext';

const EditProfileModal = () => {
  const {
    isEditModalOpen,
    setEditModalOpen,
    updatedUserName,
    setUpdatedUserName,
    updatedEmail,
    setUpdatedEmail,
    updatedGenres,
    setUpdatedGenres,
    handleEditProfile,
  } = useProfileContext();

  if (!isEditModalOpen) return null;

  return (
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
  );
};

export default EditProfileModal;
