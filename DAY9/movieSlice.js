import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  watchlist: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovieToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeMovieFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((movie) => movie.id !== action.payload);
    },
    addMovieToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeMovieFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const {
  addMovieToFavorites,
  removeMovieFromFavorites,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} = movieSlice.actions;

export const selectFavorites = (state) => state.movie.favorites;
export const selectWatchlist = (state) => state.movie.watchlist;

export default movieSlice.reducer;