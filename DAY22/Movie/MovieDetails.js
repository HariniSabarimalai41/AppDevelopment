import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Carousel } from "react-bootstrap";
import {motion} from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import './MovieDetails.css';

const MovieBackdrop = ({ backdropPath }) => ( 
  <div className="movie__intro">
    <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${backdropPath}`} alt="Movie Backdrop" />
  </div>
);

const MoviePoster = ({ posterPath }) => (
  <div className="movie__posterBox">
    <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${posterPath}`} alt="Movie Poster" />
  </div>
);                     

const MovieDetailInfo = ({ movie }) => (
  <div className="movie__detailRightTop">
    <div className="movie__name">{movie?.original_title || ''}</div>
    <div className="movie__tagline">{movie?.tagline || ''}</div>
    <div className="movie__rating">
      {movie ? `${movie.vote_average} ` : ''}<i className="fas fa-star" />
      <span className="movie__voteCount">{movie ? `(${movie.vote_count}) votes` : ''}</span>
    </div>
    <div className="movie__runtime">{movie?.runtime || ''} mins</div>
    <div className="movie__releaseDate">{movie ? `Release date: ${movie.release_date}` : ''}</div>
    <div className="movie__genres">
      {movie && movie.genres
        ? movie.genres.map((genre) => <span className="movie__genre" key={genre.id}>{genre.name}</span>)
        : ''}
    </div>
  </div>
);

const MovieSynopsis = ({ overview }) => (
  <div className="movie__detailRightBottom">
    <div className="synopsisText">SYNOPSIS</div>
    <div>{overview || ''}</div>
  </div>
);

const MovieActions = ({ isFavorite, handleToggleFavorite }) => (
  <div className="handle-fav">
    <button onClick={handleToggleFavorite} className={isFavorite ? 'rem' : 'add'}>
      &#10084; {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  </div>
);

const ProductionCompanies = ({ movie }) => (        //b1a89f5ff7960aa54d49123a25d03503
  <div className="movie__production">
    {movie &&
      movie.production_companies &&
      movie.production_companies.map((company) => (
        <div key={company.id} className="productionCompanyImage">
          <img
            className="movie__productionCompany"
            src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
            alt="Production Company"
            height={70}
            width={270}
          />
          <span>{company.name}</span>      
        </div>
      ))}
  </div>
);

const MovieTrailers = ({ trailers }) => {
  return (
    <div className="movie__trailers">
      <div className="trailer-list">
        {trailers.map((trailer) => (
          <div key={trailer.key} className="trailer">
            <iframe
              title="Trailer"
              width="280" 
              height="157.5" 
              src={`https://www.youtube.com/embed/${trailer.key}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  )
 };

 const MovieStreamingWebsites = ({ id }) => {
  const [streamingWebsites, setStreamingWebsites] = useState([]);

  useEffect(() => {
    const fetchStreamingWebsites = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=b1a89f5ff7960aa54d49123a25d03503`
        );
        const providers = response.data?.results?.US?.flatrate || [];
        setStreamingWebsites(providers);
      } catch (error) {
        console.error('Error fetching streaming websites:', error);
        setStreamingWebsites([]);
      }
    };

    fetchStreamingWebsites();
  }, [id]);

  return (
    <div className="stream__website">
      {streamingWebsites.map((provider, id) => (
        <div key={id} className="stream-card">
          <div className="stream-logo">
            <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt="Provider Logo" />
          </div>
          <h3>{provider.provider_name}</h3>
          {/* <p>{provider.display_priority}</p> */}
        </div>
      ))}
    </div>
  );
};

const MovieCast = ({ id }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=b1a89f5ff7960aa54d49123a25d03503`);
        const castData = response.data.cast || [];
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast:', error);
        setCast([]);
      }
    };

    fetchCast();
  }, [id]);

  return (
    <div className="movie__cast">
      <div className="cast__list">
        {cast.map((actor) => (
          <div key={actor.id} className="cast__item">
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={`${actor.name} profile`}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrailerBackdrop = ({ trailerKey }) => {
  if (!trailerKey) {
    return null;
  }

  return (
    <div className="trailer__backdrop">
      <iframe
        title="Trailer"
        width="1500px"
        height="700px"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&vq=hd1080`}  // Autoplay and set quality to HD (1080p)
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

const UserScore = ({ movie }) => {
  const [userScorePercentage, setUserScorePercentage] = useState(0);
  
  const fetchUserScore = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=b1a89f5ff7960aa54d49123a25d03503`
      );
      const userScore = response.data?.vote_average || 0;
      const percentage = (userScore / 10) * 100;
      setUserScorePercentage(percentage);
    } catch (error) {
      console.error('Error fetching user score:', error);
    }
  };

  useEffect(() => {
    if (movie) {
      fetchUserScore();
    }
  }, [movie]);

  return (
    <div className="user-score"><h2>User Score</h2>
      <svg className="circle-progress" width="100" height="100">
        <circle
          className="circle-progress-bar"
          strokeWidth="10"
          stroke="#3498db"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          style={{ strokeDasharray: `${userScorePercentage}, 100` }}
        />
      </svg>
      <div className="user-score-text">{userScorePercentage.toFixed(1)}%</div>
    </div>
  );
};

const MovieDetails = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userScorePercentage, setUserScorePercentage] = useState(0);
  const [streamingWebsites, setStreamingWebsites] = useState([]); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchUserScore = async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b1a89f5ff7960aa54d49123a25d03503`
      );
      const userScore = response.data?.vote_average || 0;
      const percentage = (userScore / 10) * 100;
      setUserScorePercentage(percentage);
    } catch (error) {
      console.error('Error fetching user score:', error);
    }
  };

  useEffect(() => {
    const fetchTrailerKey = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b1a89f5ff7960aa54d49123a25d03503`
        );
        const trailers = response.data?.results || [];
        const firstTrailer = trailers.find((trailer) => trailer.site === 'YouTube');
        return firstTrailer?.key;
      } catch (error) {
        console.error('Error fetching trailer key:', error);
        return null;
      }
    };

    const fetchTrailer = async () => {
      const fetchedTrailerKey = await fetchTrailerKey(id);
      setTrailerKey(fetchedTrailerKey);
    };

    fetchTrailer();
    fetchUserScore(id);
  }, [id]);

  useEffect(() => {
    const fetchTrailerKey = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b1a89f5ff7960aa54d49123a25d03503`
        );
        const trailers = response.data?.results || [];
        const firstTrailer = trailers.find((trailer) => trailer.site === 'YouTube');
        return firstTrailer?.key;
      } catch (error) {
        console.error('Error fetching trailer key:', error);
        return null;
      }
    };

    const fetchTrailer = async () => {
      const fetchedTrailerKey = await fetchTrailerKey(id);
      setTrailerKey(fetchedTrailerKey);
    };

    fetchTrailer();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getData();
    fetchTrailers();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchTrailers = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b1a89f5ff7960aa54d49123a25d03503`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          const trailers = data.results.filter((result) => result.site === 'YouTube');
          setTrailers(trailers);
        } else {
          console.error('Error fetching trailers:', data);
          setTrailers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching trailers:', error);
        setTrailers([]);
      });
  };

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b1a89f5ff7960aa54d49123a25d03503&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const handleToggleFavorite = () => {
    const isCurrentlyFavorite = favorites.find((fav) => fav.id === currentMovieDetail?.id);
    const updatedFavorites = isCurrentlyFavorite
      ? favorites.filter((fav) => fav.id !== currentMovieDetail.id)
      : [...favorites, currentMovieDetail];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleHomepageClick = () => {
    if (currentMovieDetail && currentMovieDetail.homepage) {
      window.open(currentMovieDetail.homepage, "_blank");
    }
  };

  const handleIMDBClick = () => {
    if (currentMovieDetail && currentMovieDetail.imdb_id) {
      window.open(`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`, "_blank");
    }
  };

  return (

    <div className="movie">
      <MovieBackdrop backdropPath={currentMovieDetail?.backdrop_path} /> 
       {/* <TrailerBackdrop trailerKey={trailerKey} />  */}
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <MoviePoster posterPath={currentMovieDetail?.poster_path} />
        </div>

        <div className="movie__detailRight">
          <MovieDetailInfo movie={currentMovieDetail} />
          <MovieSynopsis overview={currentMovieDetail?.overview} />
          <div className="mcont">
            <div className="mcard" key={currentMovieDetail?.id}>
              <MovieActions
                isFavorite={favorites.find((fav) => fav.id === currentMovieDetail?.id)}
                handleToggleFavorite={handleToggleFavorite}
              />
             <div className="user-score">
                  <UserScore movie={currentMovieDetail} />
              </div>
            </div>
          </div>
       </div></div>


      <div className="stream__heading">Streaming In
      <div className='stream'>
      <MovieStreamingWebsites id={id} />
      </div></div>

      <div className="trailer__heading">Trailers & Clips
      <div className="trailer-list">
      <div className="trailer">
      <div className="trailer__card">
      <MovieTrailers trailers={trailers} />
      </div></div>
      </div></div>

      <div className='cast__heading'>
      <h2>Cast & Crew</h2>
      <MovieCast id={id} />
      </div>

      <div className="movie__links">
        <div className="link__heading">Links</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <div onClick={handleHomepageClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <p>
              <span className="movie__homeButton">Homepage </span>
            </p>
          </div>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <div onClick={handleIMDBClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <p>
              <span className="movie__imdbButton">IMDb</span>
            </p>
          </div>
        )}
        <div>
      </div></div>

      <div className="prod_company">Production Companies</div>
      <ProductionCompanies movie={currentMovieDetail} />
    </div>
  );
};

export default MovieDetails;
