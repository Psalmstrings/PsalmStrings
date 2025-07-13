import React, { useState } from 'react';
import MovieCard from './MovieCard';
import MoviePreview from './SingleMoviePage'; // Ensure the path is correct
import '../styles/MovieRow.css';

const MovieRow = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies] = useState([
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      posterUrl: 'https://example.com/inception.jpg',
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      year: 2008,
      posterUrl: 'https://example.com/dark-knight.jpg',
      description: 'Batman faces the Joker, a criminal mastermind who unleashes chaos on Gotham.',
    },
  ]);

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePreview = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-row">
      <h1>Movie Collection</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      
    </div>
  );
};

export default MovieRow;