// components/ProfileComponents/AccountActions.js
import React from 'react';
import { useProfileContext } from './ProfileContext';

const AccountActions = () => {
  const { setPasswordModalOpen, handleLogout, setDeleteModalOpen } = useProfileContext();

  return (
    <div className="content-section">
      <h3>Account Actions</h3>
      <button className="account-button" onClick={() => setPasswordModalOpen(true)}>
        Update Password
      </button>
      <button className="account-button" onClick={handleLogout}>Logout</button>
      <button className="account-button delete-account" onClick={() => setDeleteModalOpen(true)}>
        Delete Account
      </button>
    </div>
  );
};

export default AccountActions;
