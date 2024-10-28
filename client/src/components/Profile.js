import React, { useEffect, useState } from "react";
import collectionService from "../services/collectionService"; // Ensure you have collectionService for API calls
import NewCollectionForm from "./NewCollectionForm"; // Import form component for creating new collections

const Profile = () => {
  const [collections, setCollections] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch user's collections when the component mounts
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await collectionService.getCollections();
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Handle toggle of the create collection form
  const handleCreateCollection = async (newCollection) => {
    try {
      const createdCollection = await collectionService.createCollection(newCollection);
      setCollections([...collections, createdCollection]);
      setShowCreateForm(false); // Close the form after creation
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <div>
      <h2>Your Collections</h2>
      {collections.length > 0 ? (
        <div className="collections-list">
          {collections.map((collection) => (
            <div key={collection._id} className="collection-item">
              <h3>{collection.collection_name}</h3>
              <p>{collection.description}</p>
              <p>Visibility: {collection.visibility}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>You have no collections yet.</p>
          <button onClick={() => setShowCreateForm(true)}>Create New Collection</button>
        </div>
      )}

      {showCreateForm && (
        <NewCollectionForm onCreateCollection={handleCreateCollection} />
      )}
    </div>
  );
};

export default Profile;
