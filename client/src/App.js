// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import BookDetails from './components/BookDetails';
import LoginSignupPage from './components/LoginSignupPage';
import Collections from './components/Collections'; 
import Profile from './components/Profile';
import NewCollection from './components/NewCollectionForm';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logout logic, e.g., clearing cookies or local storage
  };

  const fetchBooks = async (query) => {
    const url = query
      ? `https://gutendex.com/books?search=${query}`
      : 'https://gutendex.com/books?sort=random';

    try {
      const response = await fetch(url);
      const data = await response.json();
      const fetchedBooks = data.results.map(book => ({
        id: book.id,
        title: book.title,
        author: book.authors[0]?.name || "Unknown Author",
        cover: book.formats['image/jpeg'] || 'https://via.placeholder.com/150',
        year: book.publish_date || "Unknown Year",
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
      <div className="App">
        <Navbar
          onSearch={fetchBooks}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home filteredBooks={filteredBooks} />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/auth" element={<LoginSignupPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/new" element={<NewCollection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
