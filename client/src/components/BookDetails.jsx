import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import './styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [collectionForm, setCollectionForm] = useState({ collection_name: "", description: "", visibility: "private" });
  const [readOnlineUrl, setReadOnlineUrl] = useState(null);
  const [showCollectionForm, setShowCollectionForm] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();
        const downloadLinks = Object.entries(data.formats)
          .filter(([format, url]) => format !== 'image/jpeg')
          .reduce((acc, [format, url]) => {
            if (format.includes('html') && !acc.readOnlineUrl) acc.readOnlineUrl = url;
            if (format.includes('plain') && !acc.txtUrl) acc.txtUrl = url;
            if (format.includes('epub') && !acc.epubUrl) acc.epubUrl = url;
            if (format.includes('kindle') && !acc.kindleUrl) acc.kindleUrl = url;
            return acc;
          }, {});

        setBook({
          id: data.id,
          title: data.title,
          author: data.authors.map(author => author.name).join(', ') || "Unknown Author",
          genre: data.subjects.join(', ') || "Unknown Genre",
          description: data.bookshelves.join(', ') || "Description not available.",
          cover: data.formats['image/jpeg'] || 'https://via.placeholder.com/150',
          languages: data.languages.map(lang => lang.toUpperCase()).join(', '),
          publicationDate: data.publish_date || "Unknown Year",
          downloadCount: data.download_count,
          downloadLinks,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    const fetchUserCollections = async () => {
      // try {
      //   const token = localStorage.getItem("token");
      //   const response = await fetch(`http://localhost:5000/api/collections`, {
      //     headers: { "Authorization": `Bearer ${token}` },
      //   });
      //   const data = await response.json();
      //   setCollections(data);
      // } catch (error) {
      //   console.error("Error fetching collections:", error);
      // }
    };

    fetchBookDetails();
    fetchUserCollections();
  }, [id]);

  const handleCreateCollection = async () => {
    // try {
    //   const token = localStorage.getItem("token");
    //   const response = await fetch(`http://localhost:5000/api/collections`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({ ...collectionForm, book_ids: [book.id] }),
    //   });
    //   const newCollection = await response.json();
    //   setCollections([...collections, newCollection]);
    //   setShowCollectionForm(false);
    // } catch (error) {
    //   console.error("Error creating collection:", error);
    // }
  };

  if (loading) return <Loading />;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="book-details-container">
      <div className="book-cover-container">
        <img src={book.cover} alt={book.title} className="book-cover" />
      </div>
      <div className="book-info-container">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Languages:</strong> {book.languages}</p>
        <p><strong>Publication Date:</strong> {book.publicationDate}</p>
        <p><strong>Downloads:</strong> {book.downloadCount}</p>
        <p><strong>Description:</strong> {book.description}</p>

        <button onClick={() => setShowCollectionForm(!showCollectionForm)}>
          {showCollectionForm ? "Cancel" : "Add to Collection"}
        </button>

        {showCollectionForm && (
          <div className="collection-form">
            <input
              type="text"
              placeholder="Collection Name"
              value={collectionForm.name}
              onChange={(e) => setCollectionForm({ ...collectionForm, collection_name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={collectionForm.description}
              onChange={(e) => setCollectionForm({ ...collectionForm, description: e.target.value })}
            />
            <select
              value={collectionForm.visibility}
              onChange={(e) => setCollectionForm({ ...collectionForm, visibility: e.target.value })}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
            <button onClick={handleCreateCollection}>Create Collection</button>
          </div>
        )}

        <button onClick={() => setReadOnlineUrl(book.downloadLinks.readOnlineUrl)}>
          Read Online
        </button>

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
