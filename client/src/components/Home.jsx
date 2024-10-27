import React from 'react'
import BookCard from './BookCard'
import BookShelf from './BookShelf'
import RecommendedBooksCarousel from './RecommendedBooksCarousel'
export const Home = ({}) => {
  return (
    <div>
              <RecommendedBooksCarousel />
              <BookShelf />
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
            </div>
  )
}
