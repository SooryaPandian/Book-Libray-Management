import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useParams } from 'react-router-dom';
import './styles/CollectionDetail.css';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // State for isOwner

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/collections/${collectionId}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (response.status === 403) {
          setError("This collection is private and can't be accessed.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch collection details.");
        }

        const data = await response.json();
        setCollection(data.collection);  // Set collection data
        setIsOwner(data.isOwner);         // Set ownership status
        console.log(data.isOwner)
        const bookDetails = await Promise.all(
          data.collection.book_ids.map(async (bookId) => {
            const bookResponse = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
            const bookData = await bookResponse.json();
            const bookInfo = bookData.volumeInfo;

            return {
              id: bookData.id,
              title: bookInfo.title,
              author: bookInfo.authors ? bookInfo.authors.join(', ') : "Unknown Author",
              genre: bookInfo.categories ? bookInfo.categories.join(', ') : "Unknown Genre",
              description: bookInfo.description || "Description not available.",
              cover: bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
              publicationDate: bookInfo.publishedDate || "Unknown Year",
              language: bookInfo.language ? bookInfo.language.toUpperCase() : "Unknown Language",
            };
          })
        );

        setBooks(bookDetails);
      } catch (error) {
        console.error("Error fetching collection details:", error);
        setError("An error occurred while fetching the collection details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionDetails();
  }, [collectionId]);

  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/collections/${collectionId}/books/${bookId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        alert("Book removed from collection successfully!");
      } else {
        alert("Failed to remove book from collection.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("An error occurred while trying to delete the book.");
    }
  };

  const handleCopyUrl = () => {
    const collectionUrl = `${window.location.origin}/collections/${collectionId}`;
    navigator.clipboard.writeText(collectionUrl);
    alert("Collection URL copied to clipboard!");
  };

  return (
    <div className="collection-detail-page">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <h2>{collection?.collection_name}</h2>
          <button onClick={handleCopyUrl}>Copy Collection URL</button>
          <p>{collection?.description}</p>

          {loading ? (
            <p>Loading books...</p>
          ) : (
            <div className="books-list">
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book.id} className="book-item">
                    <BookCard book={book} />
                    {isOwner && (  // Only show the delete button if the user is the owner
                      <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    )}
                  </div>
                ))
              ) : (
                <p>No books in this collection.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollectionDetail;
