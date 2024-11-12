import React, { useState } from "react";

const NewCollectionForm = ({ onCreateCollection }) => {
  const [collectionName, setCollectionName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCollection = { collection_name: collectionName, description, visibility };
    onCreateCollection(newCollection);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Collection</h3>
      <label>
        Collection Name:
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Visibility:
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </label>
      <button type="submit">Create Collection</button>
    </form>
  );
};

export default NewCollectionForm;
