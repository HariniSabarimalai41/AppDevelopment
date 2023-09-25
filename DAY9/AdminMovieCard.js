// MovieCard.js (Separate Component)
import React, { useState } from 'react';

function AdminMovieCard({ movie, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...movie });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className={`movie-card ${isEditing ? 'editing' : ''}`}>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={editedData.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="release_date"
              value={editedData.release_date}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-year">Release Year: {movie.release_date}</p>
          </>
        )}
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default AdminMovieCard;
