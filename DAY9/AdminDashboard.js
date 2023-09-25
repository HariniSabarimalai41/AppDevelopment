import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState('');
  const [showQuery, setShowQuery] = useState(false);
  const [queryContent, setQueryContent] = useState('');

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=b1a89f5ff7960aa54d49123a25d03503&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&page=2&page=3'
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const updateMovieDetails = () => {
    if (!selectedMovie) return;

    const updatedMovie = { ...selectedMovie, ...editedData };

    const updatedMovies = movies.map((movie) =>
      movie.id === selectedMovie.id ? updatedMovie : movie
    );

    setMovies(updatedMovies);
    setSelectedMovie(null);
    setEditedData({});
    setIsEditing(false); // Disable editing after saving
  };

  const handleDeleteMovie = (movieToDelete) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieToDelete.id);
    setMovies(updatedMovies);
    setSelectedMovie(null);
  };

  const handleAddMovie = () => {
    if (newMovieTitle && newMovieReleaseDate) {
      const newMovie = {
        title: newMovieTitle,
        release_date: newMovieReleaseDate,
      };
      setMovies([...movies, newMovie]);
      setNewMovieTitle('');
      setNewMovieReleaseDate('');
      setIsAdding(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setIsDeleting(false);
    setIsAdding(false);
  };

  const toggleDelete = () => {
    setIsDeleting(!isDeleting);
    setIsEditing(false);
    setIsAdding(false);
  };

  const toggleAdd = () => {
    setIsAdding(!isAdding);
    setIsEditing(false);
    setIsDeleting(false);
  };

  // Function to display the query content
  const viewQuery = (query) => {
    setQueryContent(query);
    setShowQuery(true);
  };

  // Function to hide the query content
  const hideQuery = () => {
    setShowQuery(false);
    setQueryContent('');
  };

  return (
    <div>
      <h1 className="adhead">Admin Dashboard</h1>
      <div className="action-buttons">
        <button className={`action-button ${isEditing ? 'active' : ''}`} onClick={toggleEdit}>
          Edit
        </button>
        <button className={`action-button ${isDeleting ? 'active' : ''}`} onClick={toggleDelete}>
          Delete
        </button>
        <button className={`action-button ${isAdding ? 'active' : ''}`} onClick={toggleAdd}>
          Add
        </button>
        {/* Add a button to view the query content */}
        <button
          className="action-button"
          onClick={() => viewQuery("Your query content goes here.")}
        >
          View Query
        </button>
      </div>
      <div className="edit-heading">
        <h3>Edit Movies: </h3>
      </div>
      <div className="add-movie-form">
        {isAdding && (
          <div>
            <input
              type="text"
              placeholder="Movie Title"
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Release Date"
              value={newMovieReleaseDate}
              onChange={(e) => setNewMovieReleaseDate(e.target.value)}
            />
            <button className="add-button" onClick={handleAddMovie}>
              Add Movie
            </button>
          </div>
        )}
      </div>
      <div className="movie-list-container">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className={`movie-card ${
              selectedMovie && selectedMovie.id === movie.id ? 'selected-movie' : ''
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-year">Release Year: {movie.release_date}</p>
            </div>
            {selectedMovie && selectedMovie.id === movie.id && (
              <div className="movie-actions">
                {isEditing && (
                  <div className="edit-container">
                    <h2 className='edit-text'>Edit Movie: </h2>
                    <label>
                      <input
                        type="text"
                        name="title"
                        value={editedData.title || selectedMovie.title}
                        onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                      />
                    </label>
                    <label>
                      <input
                        type="text"
                        name="release_date"
                        value={editedData.release_date || selectedMovie.release_date}
                        onChange={(e) =>
                          setEditedData({ ...editedData, release_date: e.target.value })
                        }
                      />
                    </label>
                    <button className="save-button" onClick={updateMovieDetails}>
                      Save
                    </button>
                  </div>
                )}
                {isDeleting && (
                  <div className="delete-container">
                    <h2 className='delete-text'>Delete Movie</h2>
                    <button className="delete-button" onClick={() => handleDeleteMovie(selectedMovie)}>
                      Confirm Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Display the query content when the button is clicked */}
      {showQuery && (
        <div className="query-content">
          <h2>Query Content:</h2>
          <p>{queryContent}</p>
          <button className="action-button" onClick={hideQuery}>
            Close Query
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
