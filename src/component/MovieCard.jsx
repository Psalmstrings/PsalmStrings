import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/moviecard.css';
import { Link } from 'react-router-dom';
import SingleMoviePage from './SingleMoviePage';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/movie`);
        setMovies(response.data);
      } catch (err) {
        setError('Failed to load movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Fetch user's favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem("user"));
        
        if (token && userId) {
          const response = await axios.get(`${API_URL}/user/${userId}/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFavorites(Array.isArray(response?.data) ? response.data : []);
        }
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      }
    };
    fetchFavorites();
  }, []);

  // Add to favorites
  const handleAddToFavorite = async (movie) => {
    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem("user"));
      
      if (!token || !userId) {
        alert('Please log in to add favorites');
        return;
      }

      // Check if already favorited
      if (favorites.some(fav => fav._id === movie._id)) {
        alert('This movie is already in your favorites!');
        return;
      }

      // Optimistically update UI
      setFavorites([...favorites, movie]);
      
      // Call API
      await axios.post(
        `${API_URL}/user/${userId}/favorites/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`${movie.title} added to favorites!`);
    } catch (err) {
      // Rollback UI on error
      setFavorites(prev => (prev || []).filter(fav => fav?._id !== movie._id));
      console.error("Failed to add favorite:", err);
      alert('Failed to add to favorites. Please try again.');
    }
  };

  // Check if movie is favorited
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav._id === movieId);
  };

  // Close movie preview
  const handleClosePreview = () => {
    setSelectedMovie(null);
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-page-container">
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <div className="movie-poster">
              <img 
                src={movie.image || ''} 
                alt={movie.title}
                onError={(e) => e.target.src = ''}
              />
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="movie-description">{movie.description.substring(0, 100)}...</p>
              <div className="movie-meta">
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
                <span>{movie.genre}</span>
                <span>⭐ {movie.rating}/10</span>
              </div>
              <div className='movie-actions'>
                <Link to={`/movies/${movie._id}`} className="view-movie-btn">
                  View Movie
                </Link>
                <button 
                  className={`addtofav-btn ${isFavorite(movie._id) ? 'favorited' : ''}`}
                  onClick={() => handleAddToFavorite(movie)}
                  disabled={isFavorite(movie._id)}
                >
                  {isFavorite(movie._id) ? '✓ Favorited' : '+ Favorites'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <SingleMoviePage 
          movie={selectedMovie} 
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default MovieCard;