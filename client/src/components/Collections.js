// Collections.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Collections.css';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/collections`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionClick = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="collections-page">
      <h2>Your Collections</h2>
      {loading ? (
        <p>Loading collections...</p>
      ) : (
        <div className="collections-list">
          {collections.map((collection) => (
            <button
              key={collection._id}
              onClick={() => handleCollectionClick(collection._id)}
              className="collection-item"
            >
              {collection.collection_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
