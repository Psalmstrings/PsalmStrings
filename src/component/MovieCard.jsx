import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/moviecard.css';
import MoviePreview from './SingleMoviePage';
import { Link } from 'react-router-dom'
import SingleMoviePage from './SingleMoviePage';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

const API_URL = import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/movie`)
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

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePreview = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
     
    <div className="movie-page-container">
     
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <div className="movie-poster">
              <img 
                src={movie.image || ''} 
                alt={movie.title}
                onError={(e) => {
                  e.target.src = '';
                }}
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
              
              <Link to={`/movies/${movie._id}`} className="view-movie-btn">
                View Movie
              </Link>
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