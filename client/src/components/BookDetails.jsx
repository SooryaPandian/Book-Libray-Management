import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Collections from './Collections';
import './styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCollections, setShowCollections] = useState(false);
  const [readOnlineUrl, setReadOnlineUrl] = useState(null);
  const userId = "currentUserId";

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();

        const downloadLinks = Object.entries(data.formats)
          .filter(([format, url]) => format !== 'image/jpeg') // Exclude cover image
          .reduce((acc, [format, url]) => {
            if (format.includes('html') && !acc.readOnlineUrl) {
              acc.readOnlineUrl = url;
            }
            if (format.includes('plain') && !acc.txtUrl) {
              acc.txtUrl = url;
            }
            if (format.includes('epub') && !acc.epubUrl) {
              acc.epubUrl = url;
            }
            if (format.includes('kindle') && !acc.kindleUrl) {
              acc.kindleUrl = url;
            }
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

    fetchBookDetails();
  }, [id]);

  const handleAddToCollection = () => {
    setShowCollections(!showCollections);
  };

  const handleReadOnline = () => {
    setReadOnlineUrl(book.downloadLinks.readOnlineUrl);
  };

  const closeReadOnlineModal = () => {
    setReadOnlineUrl(null);
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

        <button onClick={handleReadOnline} className="read-online-btn">
          Read Online
        </button>

        {readOnlineUrl && (
          <div className="read-online-modal-overlay">
            <div className="read-online-modal">
              <button className="close-modal-btn" onClick={closeReadOnlineModal}>x</button>
              <iframe
                src={readOnlineUrl}
                title="Read Online"
                className="read-online-iframe"
              />
            </div>
          </div>
        )}

        <div className="download-btn-container">
          <button className="download-btn">Download</button>
          <div className="download-options">
            {book.downloadLinks.txtUrl && (
              <a href={book.downloadLinks.txtUrl} target="_blank" rel="noopener noreferrer">Text</a>
            )}
            {book.downloadLinks.epubUrl && (
              <a href={book.downloadLinks.epubUrl} target="_blank" rel="noopener noreferrer">ePub</a>
            )}
            {book.downloadLinks.kindleUrl && (
              <a href={book.downloadLinks.kindleUrl} target="_blank" rel="noopener noreferrer">Kindle</a>
            )}
          </div>
        </div>

        <button onClick={handleAddToCollection}>Add to Collection</button>
        
        {showCollections && (
          <Collections
            userId={userId}
            bookId={book.id}
            onCollectionSelect={() => setShowCollections(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BookDetails;
