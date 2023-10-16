import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const result = await axios.get('http://localhost:8080/api/movies/get', config);
    setMovies(result.data);
  };

  const deleteMovie = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await axios.delete(`http://localhost:8080/api/movies/delete/${id}`, config);
    loadMovies();
  };

  const handleAddClick = () => {
    navigate('/addcrud');
  };

  const handleEditClick = (movieId) => {
    navigate(`/editcrud/${movieId}`);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Movie ID</th>
              <th scope="col">Movie Name</th>
              <th scope="col">Release Date</th>
              <th scope="col">Rating</th>
              <th scope="col">Time</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.name}</td>
                <td>{movie.date}</td>
                <td>{movie.rating}</td>
                <td>{movie.time}</td>
                <td>
                  <div className="btn-container">
                    <button className="btn-add" onClick={handleAddClick}>
                      ADD
                    </button>
                    <button className="btn-edit" onClick={() => handleEditClick(movie.id)}>
                      EDIT
                    </button>
                    <button className="btn-delete" onClick={() => deleteMovie(movie.id)}>
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
