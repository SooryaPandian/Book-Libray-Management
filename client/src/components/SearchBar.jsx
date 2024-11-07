import React, { useState, useEffect } from 'react';
import '../components/styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch(query); // Call onSearch whenever query changes
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title, author, or genre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
     
    </div>
  );
};

export default SearchBar;
