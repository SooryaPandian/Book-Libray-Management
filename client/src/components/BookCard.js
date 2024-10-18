import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.id}`, { state: { book } }); // Navigate to BookDetails with book data
  };

  return (
    <div className="book-card" onClick={handleBookClick}>
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
    </div>
  );
};

export default BookCard;
