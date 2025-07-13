import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/reviewform.css';

const ReviewForm = () => {
  const { id } = useParams(); // Get movieId from URL
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const movieId = id || id; // Use the id prop if available, otherwise use the URL param

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post(`${API_URL}/comment`, {
        movieId, // Using the movieId from URL params
        comment: review, // Changed to lowercase 'comment' to match your other component
        rating // Include the rating in the submission
      }, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });

      setReview('');
      setRating(5);
      setSuccess(true);

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3>Leave a Review</h3>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Review submitted successfully!</div>}

      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-input">
          <label>Rating:</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={loading}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} star{num !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading || !review.trim()}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;