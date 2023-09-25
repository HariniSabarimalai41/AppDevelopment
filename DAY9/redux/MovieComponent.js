import React, { useContext } from 'react';
import { MovieContext } from '../MovieProvider'; // Update the import

const addToFavorites = (movie) => {
  const { favorites, setFavorites } = useContext(MovieContext);
  const updatedFavorites = [...favorites, movie];
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

const removeFromFavorites = (movieId) => {
  const { favorites, setFavorites } = useContext(MovieContext);
  const updatedFavorites = favorites.filter((favorite) => favorite.id !== movieId);
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

const addToWatchlist = (movie) => {
  const { watchlist, setWatchlist } = useContext(MovieContext);
  const updatedWatchlist = [...watchlist, movie];
  setWatchlist(updatedWatchlist);
  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
};

const removeFromWatchlist = (movieId) => {
  const { watchlist, setWatchlist } = useContext(MovieContext);
  const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
  setWatchlist(updatedWatchlist);
  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
};

export { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist };