import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setMovie } from './actions/movieActions'; 
import './Explore.css';
import vid1 from './vid1.mp4';

const Explore = ({ username }) => {

//    const movie = username; 
//    const dispatch = useDispatch();

//     useEffect(() => {

//         dispatch(setMovie(movie));
//     });

    return (
        <div className="Explore">
            <video src={vid1} autoPlay muted loop className="video-bg" />
            <div className="bg-overlay"></div>
            <div className="exp-txt">Welcome, {username}</div>
        </div>
    );
};

export default Explore;
