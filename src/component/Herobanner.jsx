import React, { useState } from 'react';
import axios from 'axios';
import '../styles/herobanner.css';


function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

   const API_URL = import.meta.env.VITE_API_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    setSearchResults(null);

    try {
      const response = await axios.get(
        `${API_URL}/movie/search/by-title?title=${encodeURIComponent(searchQuery)}`
      );
      
      setSearchResults(response.data);
      setShowPopup(true);
      
      console.log("response", response.data)
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSearchQuery('');
  };

  return (
    <div className="hero-banner">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="https://i.pinimg.com/1200x/33/d9/bf/33d9bfa8c6ee759be6adddbdfb3842eb.jpg" 
          alt="Featured Movie Banner"
          className="hero-image"
        />
      </div>
      
      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome</h1>
        
        <p className="hero-description">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        
        <form className="hero-actions" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder='Search for movie by title...' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Search Results Popup */}
      {showPopup && (
        <div className="search-popup-overlay">
          <div className="search-popup">
            <button className="close-popup" onClick={closePopup}>×</button>
            
            <h2>Search Results</h2>
            
            {searchResults ? (
              <div className="movie-resultt">
                <img 
                  src={searchResults.data.image} 
                  alt={searchResults.data.title}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <h3>{searchResults.data.title}</h3>
                  <p>{searchResults.data.description}</p>
                  <div className="movie-meta">
                    <span>⭐ {searchResults.data.rating}/10</span>
                    <span>{new Date(searchResults.data.releaseDate).getFullYear()}</span>
                    <span>{searchResults.data.genre}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="no-results">No results found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroBanner;