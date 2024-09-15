import React from 'react';
import './BookCard.css'; // Ensure this file exists and is properly styled


const BookCard = ({ title, author, genre, cover }) => {
  return (
    
      <div className="book-card">
        <img src={cover} alt={title} className="book-cover" />
        <h3>{title}</h3>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Genre:</strong> {genre}</p>
      </div>
    
  );
};

export default BookCard;
