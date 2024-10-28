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
  const userId = "currentUserId";
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();

        const downloadLinks = Object.entries(data.formats)
          .filter(([format, url]) => format !== 'image/jpeg') // Exclude cover image
          .map(([format, url]) => {
            let displayText = '';
            if (format.includes('html')) displayText = 'Read Online';
            else if (format.includes('pdf')) displayText = 'Download PDF';
            else if (format.includes('epub')) displayText = 'Download ePub';
            else if (format.includes('plain')) displayText = 'Download Text';
            return { displayText, url };
          });

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
