import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from './Movie';
import Search from './Search';

const API_KEY = '312e3b9';
const MOVIE_API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(`${MOVIE_API_URL}&s=batman`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          const promises = jsonResponse.Search.map(movie => {
            return fetch(`${MOVIE_API_URL}&i=${movie.imdbID}&plot=full`)
              .then(response => response.json())
              .then(movieDetails => {
                return {
                  ...movie,
                  released: movieDetails.Released,
                  imdbRating: movieDetails.imdbRating
                };
              });
          });
          Promise.all(promises).then(moviesWithDetails => {
            setMovies(moviesWithDetails || []);
            setLoading(false);
          });
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
  
    fetch(`${MOVIE_API_URL}&s=${searchValue}&plot=full`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          const promises = jsonResponse.Search.map(movie => {
            return fetch(`${MOVIE_API_URL}&i=${movie.imdbID}&plot=full`)
              .then(response => response.json())
              .then(movieDetails => {
                return {
                  ...movie,
                  released: movieDetails.Released,
                  imdbRating: movieDetails.imdbRating
                };
              });
          });
          Promise.all(promises).then(moviesWithDetails => {
            setMovies(moviesWithDetails || []);
            setLoading(false);
          });
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Search App</h1>
        <Search search={search} />
      </header>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
