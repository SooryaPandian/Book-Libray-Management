import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import BookDetails from './components/BookDetails';
import LoginSignupPage from './components/LoginSignupPage';
import Collections from './components/Collections';
import Profile from './components/Profile';
import CollectionDetail from './components/CollectionDetail';
import { useTheme } from './components/ThemeContext'; // Import useTheme
import "./App.css";

function App() {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.open('', '_self');
    window.close();
    window.location.href = '/auth';
  };

  const fetchBooks = async (query) => {
    const url = query
      ? `https://www.googleapis.com/books/v1/volumes?q=${query}`
      : 'https://www.googleapis.com/books/v1/volumes?q=random';

    try {
      const response = await fetch(url);
      const data = await response.json();
      const fetchedBooks = data.items.map(book => ({
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown Author",
        cover: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        year: book.volumeInfo.publishedDate || "Unknown Year",
      }));
      setBooks(fetchedBooks);
      setFilteredBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Navbar onSearch={fetchBooks} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home filteredBooks={filteredBooks} />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/auth" element={<LoginSignupPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:collectionId" element={<CollectionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
