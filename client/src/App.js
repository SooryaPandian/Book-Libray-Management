import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RecommendedBooksCarousel from "./components/RecommendedBooksCarousel";
import BookCard from "./components/BookCard";
import BookShelf from "./components/BookShelf";
import "./App.css";

// Add image paths to books array
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', cover: require('./assets/tgg.jpeg') },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', cover: require('./assets/To_Kill_a_Mockingbird.jpg') },
  { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', cover: require('./assets/invisibleman.jpg') },
  { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', cover: require('./assets/The_hobbit.avif') },
  { id: 5, title: 'The Art of War', author: 'Sun Tzu', genre: 'Philosophy', cover: require('./assets/Harry_Potter.jpeg') },
  { id: 6, title: 'Walk Into The Shadows', author: 'F. Scott Fitzgerald', genre: 'Fiction', cover: require('./assets/walk_into_the_shadows.jpeg') },
  { id: 7, title: 'Hide And Seek', author: 'Harper Lee', genre: 'Fiction', cover: require('./assets/hide_and_seek.webp') },
  { id: 8, title: 'The Story Of A Old Lonely Man', author: 'Stephen Hawking', genre: 'Science', cover: require('./assets/oldman.jpeg') },
  { id: 9, title: '1984', author: 'George Orwell', genre: 'Dystopian', cover: require('./assets/The_hobbit.avif') },
  { id: 10, title: 'The Art of War', author: 'Sun Tzu', genre: 'Philosophy', cover: require('./assets/Harry_Potter.jpeg') }
];

function App() {
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(books); // Show all books if query is empty
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(lowercasedQuery) ||
      book.author.toLowerCase().includes(lowercasedQuery) ||
      book.genre.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredBooks(filtered);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <RecommendedBooksCarousel />
      <BookShelf />
      <div className="book-cards-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              cover={book.cover} // Pass cover image
            />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}

export default App;
