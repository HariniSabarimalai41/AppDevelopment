import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import "./Dashboard.css";

const MovieDetails = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
  };

  const handleRemoveFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(error => console.error("Error fetching movie details:", error));
  };

  return (
    <div className="movie">
      {currentMovieDetail && (
        <div className="movie__intro">
          <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} alt={currentMovieDetail.original_title} />
        </div>
      )}
      <div className="movie__detail">
        <div className="movie__detailLeft">
          {currentMovieDetail && (
            <div className="movie__posterBox">
              <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`} alt={currentMovieDetail.original_title} />
            </div>
          )}
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
              <span className="movie__voteCount">{currentMovieDetail ? `(${currentMovieDetail.vote_count} votes)` : ""}</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}</div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres ? currentMovieDetail.genres.map(genre => (
                <span className="movie__genre" key={genre.id}>{genre.name}</span>
              )) : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">SYNOPSIS</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
          <div className="mcont">
            <div className="mcard" key={currentMovieDetail?.id}>
              <div className="mdetails">
                {favorites.find((fav) => fav.id === currentMovieDetail?.id) ? (
                  <button onClick={() => handleRemoveFromFavorites(currentMovieDetail)} className='rem'>
                    &#10084; Remove from Favorites
                  </button>
                ) : (
                  <button onClick={() => handleAddToFavorites(currentMovieDetail)} className='add'>
                    &#10084; Add to Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">LINKS</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p><span className="moviehomeButton movie_Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p><span className="movieimdbButton movie_Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p>
          </a>
        )}
      </div>
      <div className="movie__heading">PRODUCTION COMPANIES</div>
      <div className="movie__production">
        {currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
          <div key={company.id} className="productionCompanyImage">
            {company.logo_path && <img className="movie__productionCompany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt="Production Company" />}
            <span>{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
