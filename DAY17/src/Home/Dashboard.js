import React from "react";
import MovieList from '../Movie/MovieList';
import './Dashboard.css';
import MovieCarousel from "../Movie/MovieCarousel";
import CrudMovie from "../Movie/CrudMovie";
import CrudMovie2 from "../Movie/CrudMovie2";
import CrudMovie3 from "../Movie/CrudMovie3";

const Dashboard = () => {
 
  return (
    <>
      <div className="carousel-container">
        <div className="poster">
          <MovieCarousel />
          <CrudMovie />
          <CrudMovie2 />
          <CrudMovie3 />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

