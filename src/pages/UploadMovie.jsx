import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/uploadmovie.css';

const UploadMoviePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    movieImage: null,
    releaseDate: '',
    genre: '',
    rating: '',
  });

  const genreOptions = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller'
  ];

  const API_URL = import.meta.env.VITE_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMovieData(prev => ({ ...prev, movieImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: name === 'movieImage' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!movieData.title || !movieData.description || !movieData.movieImage) {
        throw new Error('Title, description, and image are required');
      }

      if (movieData.rating && (movieData.rating < 1 || movieData.rating > 10)) {
        throw new Error('Rating must be between 1 and 10');
      }

      const formData = new FormData();
      formData.append('title', movieData.title);
      formData.append('description', movieData.description);
      formData.append('movieImage', movieData.movieImage);
      formData.append('releaseDate', movieData.releaseDate);
      formData.append('genre', movieData.genre);
      formData.append('rating', movieData.rating);

      const response = await axios.post(`${API_URL}/movie`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Movie uploaded successfully!');
        setMovieData({
          title: '',
          description: '',
          movieImage: null,
          releaseDate: '',
          genre: '',
          rating: '',
        });
        setPreviewImage(null);
        navigate('/adminpage');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h1 className="upload-title">Upload New Movie</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={movieData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Poster Image*</label>
            <input
              type="file"
              id="movieImage"
              name="movieImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {previewImage && (
              <div className="image-preview">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="releaseDate">Release Date</label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={movieData.releaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (1-10)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="10"
                step="0.1"
                value={movieData.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
            >
              <option value="">Select a genre</option>
              {genreOptions.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="upload-button"
          >
            {loading ? 'Uploading...' : 'Upload Movie'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMoviePage;