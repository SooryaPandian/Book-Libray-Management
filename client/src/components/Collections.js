import React, { useEffect, useState } from 'react';
import './styles/Collections.css';

const Collections = ({ userId, bookId, onCollectionSelect }) => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    // Fetch user collections from the backend
    const fetchCollections = async () => {
      try {
        const response = await fetch(`/api/collections/${userId}`);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, [userId]);

  const handleAddToCollection = async (collectionId) => {
    // Add book to the selected collection
    await fetch(`/api/collections/${collectionId}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
    onCollectionSelect(); // Callback to update parent component
  };

  const handleCreateCollection = async () => {
    // Create new collection with the specified name
    const response = await fetch(`/api/collections/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, collectionName: newCollectionName }),
    });
    const newCollection = await response.json();
    setCollections([...collections, newCollection]);
    setNewCollectionName('');
  };

  return (
    <div className="collections-container">
      <h3>Select a Collection</h3>
      {collections.length > 0 ? (
        collections.map(collection => (
          <button key={collection._id} onClick={() => handleAddToCollection(collection._id)}>
            {collection.collection_name}
          </button>
        ))
      ) : (
        <p>No collections available.</p>
      )}
      <input
        type="text"
        placeholder="New Collection Name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <button onClick={handleCreateCollection}>Create Collection</button>
    </div>
  );
};

export default Collections;
