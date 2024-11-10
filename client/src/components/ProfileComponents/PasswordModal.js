// components/ProfileComponents/PasswordModal.js
import React from 'react';
import { useProfileContext } from './ProfileContext';

const PasswordModal = () => {
  const {
    isPasswordModalOpen,
    setPasswordModalOpen,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    handlePasswordUpdate,
    passwordError,
  } = useProfileContext();

  if (!isPasswordModalOpen) return null;

  return (
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
  );
};

export default PasswordModal;
