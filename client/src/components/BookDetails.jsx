import React from 'react';
import { useParams } from 'react-router-dom';
import './styles/BookDetails.css';

const BookDetails = ({ books }) => {
  const { id } = useParams(); // Get the book ID from the URL
  const book = books?.find(book => book.id === parseInt(id)); // Use optional chaining to avoid errors

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="book-details-container">
      <div className="book-cover-container">
        <img src={book.cover} alt={book.title} className="book-cover" />
      </div>
      <div className="book-info-container">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
