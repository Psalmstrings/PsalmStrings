import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/singlemoviepreview.css';
import ReviewForm from './ReviewForm';
import ReviewPage from '../pages/ReviewPage';

const SingleMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}/movie/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  return (
    <div className="movie-page-containerr">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Movies
      </button>

      <div className="movie-content">
        <div className="movie-poster-container">
          <img 
            src={movie.image || 'https://via.placeholder.com/500x750'} 
            alt={movie.title} 
            className="movie-poster"
          />
        </div>

        <div className="movie-details">
          <h1 className="movie-title">{movie.title}</h1>
          
          <div className="movie-meta">
            <span className="release-year">
              {new Date(movie.releaseDate).getFullYear()}
            </span>
            <span className="genre">{movie.genre}</span>
            <span className="rating">⭐ {movie.rating}/10</span>
          </div>

          <div className="movie-description">
            <h3>Description</h3>
            <p>{movie.description}</p>
          </div>

          <div className="reviews-section">
            <h2>Reviews</h2>
            <ReviewPage movieId={id} />
            <h2>Add a Review</h2>
            <ReviewForm movieId={movie._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;