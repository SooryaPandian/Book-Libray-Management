// frontend/src/services/collectionService.js
const API_URL = "http://localhost:5000/api/collections"; // replace with your backend URL

// Create a new collection
export const createCollection = async (collectionData) => {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // to include cookies for authentication
    body: JSON.stringify(collectionData),
  });
  return response.json();
};

// Get all collections for the logged-in user
export const getUserCollections = async () => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

// Get a specific collection by ID
export const getCollectionById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

// Update a specific collection by ID
export const updateCollection = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

// Create a named export object
const collectionService = {
  getUserCollections,
  createCollection,
  getCollectionById,
  updateCollection,
};

// Export the named object
export default collectionService;
