import React from 'react';
import axios from 'axios';

const PopularSearches = ({ setSearchTerm, setMovies, setFilteredMovies }) => {
  const popularSearchTerms = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Sci-Fi', 'Crime', 'Fantasy'];

  const handlePopularSearch = async (term) => {
    setSearchTerm(term);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=b1a89f5ff7960aa54d49123a25d03503&query=${term}`
      );
      if (response.data && response.data.results) {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
        localStorage.setItem('movies', JSON.stringify(response.data.results));
      }
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <div className="popular-searches">
      <h3>{("Popular Searches").toUpperCase()}</h3>
      <div className="popular-buttons">
        {popularSearchTerms.map((term, index) => (
          <button key={index} onClick={() => handlePopularSearch(term)}>
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
