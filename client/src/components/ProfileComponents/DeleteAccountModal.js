// components/ProfileComponents/DeleteAccountModal.js
import React from 'react';
import { useProfileContext } from './ProfileContext';

const DeleteAccountModal = () => {
  const { isDeleteModalOpen, setDeleteModalOpen, handleDeleteAccount } = useProfileContext();

  if (!isDeleteModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Are you sure you want to delete your account?</h3>
        <p>This action cannot be undone.</p>
        <button onClick={handleDeleteAccount} className="delete-confirm-button">
          Yes, Delete My Account
        </button>
        <button onClick={() => setDeleteModalOpen(false)} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
