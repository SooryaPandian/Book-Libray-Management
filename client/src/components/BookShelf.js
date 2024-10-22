import React, { useState } from 'react';
import '../components/styles/BookShelf.css'; // Add this file for custom styles

// Sample books data
const books = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Book ${index + 1}`,
  author: `Author ${index + 1}`,
  genre: `Genre ${index % 5 + 1}`,
  cover: `https://via.placeholder.com/100x150?text=Book+${index + 1}` // Placeholder image
}));

const BookShelf = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="bookshelf-container">
      <div className="book-details">
        {selectedBook ? (
          <div>
            <h3>{selectedBook.title}</h3>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Genre:</strong> {selectedBook.genre}</p>
            <img src={selectedBook.cover} alt={selectedBook.title} className="book-detail-cover" />
          </div>
        ) : (
          <p>Hover over a book to see details</p>
        )}
      </div>
      <div className="bookshelf">
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className="bookshelf-row">
            {books.slice(rowIndex * 10, (rowIndex + 1) * 10).map(book => (
              <div
                key={book.id}
                className="book-item"
                onMouseEnter={() => setSelectedBook(book)}
                onMouseLeave={() => setSelectedBook(null)}
              >
                <img src={book.cover} alt={book.title} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
