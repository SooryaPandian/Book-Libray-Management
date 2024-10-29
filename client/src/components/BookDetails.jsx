import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import './styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [newCollectionForm, setNewCollectionForm] = useState({ collection_name: "", description: "", visibility: "private" });
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);
  const [readOnlineUrl, setReadOnlineUrl] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();

        const bookInfo = data.volumeInfo;
        setBook({
          id: data.id,
          title: bookInfo.title,
          author: bookInfo.authors ? bookInfo.authors.join(', ') : "Unknown Author",
          genre: bookInfo.categories ? bookInfo.categories.join(', ') : "Unknown Genre",
          description: bookInfo.description || "Description not available.",
          cover: bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
          languages: bookInfo.language ? bookInfo.language.toUpperCase() : "Unknown Language",
          publicationDate: bookInfo.publishedDate || "Unknown Year",
          pageCount: bookInfo.pageCount || "Unknown Page Count",
          publisher: bookInfo.publisher || "Unknown Publisher",
          previewLink: bookInfo.previewLink || null, // Preview link for viewing the book online
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    const fetchUserCollections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/collections`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchBookDetails();
    fetchUserCollections();
  }, [id]);

  const handleAddBookToCollections = async () => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedCollections.map(async (collectionId) => {
          await fetch(`http://localhost:5000/api/collections/${collectionId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ book_ids: [book.id] }),
          });
        })
      );
      alert("Book added to selected collections successfully!");
      setShowCollectionForm(false);
    } catch (error) {
      console.error("Error adding book to collections:", error);
    }
  };

  const handleCreateNewCollection = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newCollectionForm, book_ids: [book.id] }),
      });
      const newCollection = await response.json();
      setCollections([...collections, newCollection]);
      setShowNewCollectionForm(false);
      setShowCollectionForm(false);
      alert("New collection created successfully!");
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const toggleCollectionSelection = (collectionId) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  if (loading) return <Loading />;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="book-details-container">
  <div className="book-cover-container">
    <img src={book.cover} alt={book.title} style={{height:'600px'}} />
  </div>
  <div className="book-info-container">
    <h2 className="book-title-detail">{book.title}</h2>
    <p className="book-detail"><strong>Author:</strong> {book.author}</p>
    <p className="book-detail"><strong>Genre:</strong> {book.genre}</p>
    <p className="book-detail"><strong>Languages:</strong> {book.languages}</p>
    <p className="book-detail"><strong>Publication Date:</strong> {book.publicationDate}</p>
    <p className="book-detail"><strong>Page Count:</strong> {book.pageCount}</p>
    <p className="book-detail"><strong>Publisher:</strong> {book.publisher}</p>
    <p className="book-detail"><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: book.description }} /></p>

    {book.previewLink && (
      <div className="preview-link">
        <a href={book.previewLink} target="_blank" rel="noopener noreferrer">
          View Book Preview
        </a>
      </div>
    )}

    <button onClick={() => setShowCollectionForm(!showCollectionForm)}>
      {showCollectionForm ? "Cancel" : "Add to Collection"}
    </button>

    {showCollectionForm && (
      <div className="collections-list">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection._id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCollections.includes(collection._id)}
                  onChange={() => toggleCollectionSelection(collection._id)}
                />
                {collection.collection_name}
              </label>
            </div>
          ))
        ) : (
          <p>No collections available. Create a new collection.</p>
        )}
        <button onClick={handleAddBookToCollections}>Add to Selected Collections</button>
        <button onClick={() => {
          if(localStorage.getItem('token')!=null)
          setShowNewCollectionForm(true);
          
        }}>Create New Collection</button>
      </div>
    )}

    {showNewCollectionForm && (
      <div className="new-collection-form">
        <input
          type="text"
          placeholder="Collection Name"
          value={newCollectionForm.collection_name}
          onChange={(e) => setNewCollectionForm({ ...newCollectionForm, collection_name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newCollectionForm.description}
          onChange={(e) => setNewCollectionForm({ ...newCollectionForm, description: e.target.value })}
        />
        <select
          value={newCollectionForm.visibility}
          onChange={(e) => setNewCollectionForm({ ...newCollectionForm, visibility: e.target.value })}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <button onClick={handleCreateNewCollection}>Create Collection</button>
      </div>
    )}

    {readOnlineUrl && (
      <div className="read-online-modal-overlay">
        <div className="read-online-modal">
          <button onClick={() => setReadOnlineUrl(null)}>&times;</button>
          <iframe src={readOnlineUrl} title="Read Online" className="read-online-iframe" />
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default BookDetails;
