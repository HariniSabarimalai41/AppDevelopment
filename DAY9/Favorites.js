import React, { useContext } from 'react';
import { MovieContext } from './MovieContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeMovieFromFavorites, selectFavorites } from './movieSlice';
import './Search.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(MovieContext);

  const handleRemoveFromFavorites = (movie) => {
    removeFromFavorites(movie.id);
  };

  // const dispatch = useDispatch();
  // const favorites = useSelector(selectFavorites);

  // const handleRemoveFromFavorites = (movie) => {
  //   dispatch(removeMovieFromFavorites(movie.id));
  // };

  return (
    <div className="dashboard-container">
      <h2>User Favorites</h2>
      <div className="movies-container">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={1000}
                height={400}
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Rate: {movie.vote_average}</p>
                <p>Year: {movie.release_date}</p>
                <button onClick={() => handleRemoveFromFavorites(movie)} className="rem">
                  &#10084; Remove from Favorites
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
