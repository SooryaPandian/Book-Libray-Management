// components/ConfirmationModal.js
import React from 'react';
import './styles/ConfirmationModal.css';

const ConfirmationModal = ({ showModal, onClose, onConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Are you sure you want to delete this collection?</h3>
        <p>This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-btn">Yes, Delete</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
