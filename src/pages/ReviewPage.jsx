import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/reviewpage.css';

const UserCommentsPage = () => {
  const { id } = useParams(); // Get movieId from URL
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const movieId = id || id; // Use the id prop if available, otherwise use the URL param
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchMovieComments = async () => {
      setLoading(true);
      setError(''); 
      try {
        const response = await axios.get(`${API_URL}/comment/${movieId}`);
        console.log(response.data);
        
        setComments(response.data);
      } catch (err) {
        setError('Failed to load comments');
        console.error(err);
        console.log(movieId);
        
      } finally {
        setLoading(false);
      }
    };


      fetchMovieComments();

  }, [movieId]);

  if (loading) {
    return <div className="loading">Loading Reviews...</div>;
  }

  return (
    <div className="user-comments-container">
      <h1>Movie Reviews</h1>
     

      {comments.length === 0 ? (
        <div className="no-comments">No reviews found for this movie.</div>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment._id} className="comment-card">
              <div className="comment-header">
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="comment-content">
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCommentsPage;