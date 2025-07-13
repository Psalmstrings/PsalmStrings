import React from 'react';
import '../styles/MoviePreview.css';
import ReviewForm from './ReviewForm';

const MoviePreview = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="movie-preview-overlay">
      <div className="movie-preview-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="movie-preview-grid">
          <div className="movie-poster-column">
            <img 
              src={movie.image || 'https://via.placeholder.com/300x450'} 
              alt={movie.title} 
              className="movie-preview-image"
            />
          </div>
          
          <div className="movie-details-column">
            <h2>{movie.title}</h2>
            <div className="movie-meta">
              <span>Year: {new Date(movie.releaseDate).getFullYear()}</span>
              <span>Genre: {movie.genre}</span>
              <span>Rating: ⭐ {movie.rating}/10</span>
            </div>
            <p className="movie-description">{movie.description}</p>
            
            <div className="reviews-section">
              <h3>Leave a Review</h3>
              <ReviewForm movieId={movie._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;