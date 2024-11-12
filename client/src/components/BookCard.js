import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/BookCard.css';
const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate(`/book/${book.id}`, { state: { book } }); // Navigate to BookDetails with book data
  };

  return (
    <div className="book-container">
    <div className="book-cards" onClick={handleBookClick}>
      <img src={book.cover} alt={book.title} className="book-cover" />
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">Author: {book.author}</div>
      </div>
    </div>
    </div>
  );
};

export default BookCard;
