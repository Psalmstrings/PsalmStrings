import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/adminpage.css';
import UploadMoviePage from './UploadMovie';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genre: '',
    rating: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movie`);
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch movies');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentMovieId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      resetForm();
      fetchMovies();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      releaseDate: movie.year,
      genre: movie.genre,
      rating: movie.rating,
      image: movie.movieImage
    });
    setIsEditing(true);
    setCurrentMovieId(movie._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMovies();
      } catch (err) {
        setError('Failed to delete movie');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      releaseDate: '',
      genre: '',
      rating: '',
      image: ''
    });
    setIsEditing(false);
    setCurrentMovieId(null);
  };

  const handleBackToHome = () => {
    navigate('/homepage'); // Adjust the path to your homepage route if different
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Movie Management Dashboard</h1>
        <button onClick={handleBackToHome} className="btn-back">
          Back to Homepage
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}

      <div className="admin-content">
        {/* Movie Form */}
        <div className="movie-form">
          <h2>{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
          <div className='form'>
            <UploadMoviePage />
          </div>
        </div>

        {/* Movies List */}
        <div className="movies-list">
          <h2>Movie Catalog</h2>
          <div className="movie-grid">
            {movies.length === 0 ? (
              <p>No movies found</p>
            ) : (
              movies.map((movie) => (
                <div key={movie._id} className="movie-card">
                  <div className="movie-poster">
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <div className="movie-details">
                    <h3>{movie.title}</h3>
                    <p>{movie.year} • {movie.genre}</p>
                    <p>Rating: {movie.rating}/10</p>
                    <div className="movie-actions">
                      <button
                        onClick={() => handleEdit(movie)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;