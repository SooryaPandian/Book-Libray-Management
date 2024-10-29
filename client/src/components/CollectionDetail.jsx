// CollectionDetail.js
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
            const bookResponse = await fetch(`https://gutendex.com/books/${bookId}`);
            return await bookResponse.json();
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
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p>No books in this collection.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
