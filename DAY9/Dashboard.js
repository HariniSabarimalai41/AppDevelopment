import React from "react";
import MovieList from './MovieList';
import './Dashboard.css';
import MovieCarousel from "./MovieCarousel";

const Dashboard = () => {
 
  return (
    <>
      <div className="carousel-container">
        <div className="poster">
          <MovieCarousel />
          <MovieList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;