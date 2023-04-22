import React from 'react';

const Movie = ({ movie }) => {
  const poster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x445' : movie.Poster;

  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img src={poster} alt={`The movie titled: ${movie.Title}`} />
      </div>
      <p>Released: {movie.released}</p>
      <p>IMDb rating: {movie.imdbRating}</p>
    </div>
  );
};


export default Movie;
