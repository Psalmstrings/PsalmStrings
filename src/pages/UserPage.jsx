import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/userprofile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const userResponse = await axios.get(`${API_URL}/${userId}`);
        setUser(userResponse.data);

        const moviesResponse = await axios.get(`${API_URL}/${userId}/favorites`);
        setFavoriteMovies(moviesResponse.data.favorites || []);

        console.log('Favorite Movies:', moviesResponse.data.favorites);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch user data');
        setFavoriteMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleBackToHome = () => {
    navigate('/homepage');
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      // Confirm with user before removal
      if (!window.confirm('Are you sure you want to remove this movie from favorites?')) {
        return;
      }
      
      await axios.delete(`${API_URL}/${userId}/favorites/${movieId}`);
      
      // Update the UI by filtering out the removed movie
      setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
      
    } catch (err) {
      console.error('Remove favorite error:', err);
      setError(err.response?.data?.message || 'Failed to remove movie from favorites');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="user-profile-container">
      <button onClick={handleBackToHome} className="back-button">
        ← Back to Home
      </button>
      
      <div className="user-header">
        <h1>Hi, {user.data.name}!</h1>
        <p>Your favorite movies will appear here</p>
      </div>

      <div className="favorite-movies">
        <h2>Your Favorite Movies</h2>
        
        {favoriteMovies.length > 0 ? (
          <div className="movies-container">
            {favoriteMovies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <img 
                  src={movie.image || '/default-movie.jpg'} 
                  alt={movie.title} 
                  className="movie-poster"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/default-movie.jpg';
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.title || 'Untitled Movie'}</h3>
                  <p> {movie.genre || 'Genre unknown'}</p>
                  <p>⭐ {movie.rating || 'N/A'}/10</p>
                  <button 
                    onClick={() => handleRemoveFavorite(movie._id)}
                    className="remove-button"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-movies">You haven't added any favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;