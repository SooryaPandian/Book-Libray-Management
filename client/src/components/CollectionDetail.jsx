import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useParams } from 'react-router-dom';
import './styles/CollectionDetail.css';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/collections/${collectionId}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        setCollection(data);

        const bookDetails = await Promise.all(
          data.book_ids.map(async (bookId) => {
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
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No books in this collection.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
