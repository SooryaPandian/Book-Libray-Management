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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <p>Loading collections...</p>;

  return (
    <div className="collections-container">
      <h2>Your Collections</h2>
      {collections.length > 0 ? (
        <div className="collection-list">
          {collections.map((collection) => (
            <div key={collection._id} className="collection-card">
              <h3>{collection.collection_name}</h3>
              <p>{collection.description}</p>
              <p><strong>Visibility:</strong> {collection.visibility}</p>
              <button
                onClick={() => navigate(`/collections/${collection._id}`)}
                className="view-books-button"
              >
                View Books
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No collections found. Create a new one!</p>
      )}
    </div>
  );
};

export default Collections;
