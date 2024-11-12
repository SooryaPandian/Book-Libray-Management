import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import BookShelf from './BookShelf';
import RecommendedBooksCarousel from './RecommendedBooksCarousel';
import styles from './Home.module.css'; // Import the CSS module
import Footer from './Footer';
export const Home = ({ filteredBooks, fetchBooks }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
    fetchBooks('', (page * booksPerPage)); // Adjust fetchBooks to start from the next set of results
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
      fetchBooks('', ((page - 2) * booksPerPage));
    }
  };

  return (
    <div>
      <RecommendedBooksCarousel />
      <BookShelf />

      {/* Display Total Fetched Books Count */}
      <div className="book-count">
        <h2>Showing {filteredBooks.length} books</h2>
      </div>

      <div className="book-cards-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onBookClick={(selectedBook) => navigate(`/book/${selectedBook.id}`, { state: { book: selectedBook } })}
            />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className={styles.paginationContainer}>
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
