package com.example.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.Movie3Repository;
import com.example.demo.model.Movie3;


@Service
public class Movie3Service {
    
    @Autowired
    private Movie3Repository movieRepository;

    public List<Movie3> getAllMovies(){
		return movieRepository.findAll();
	}

    public Movie3 createMovie(@RequestBody Movie3 movie) {
		return movieRepository.save(movie);
	}

    public Movie3 getMovieById(@PathVariable int id) {
		Movie3 movie = movieRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
		return movie;
	}

    public Movie3 updateMovie(@PathVariable Integer id, @RequestBody Movie3 movieDetails){
		Movie3 movie = movieRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
		
		movie.setName(movieDetails.getName());
		movie.setDate(movieDetails.getDate());
		// movie.setGenre(movieDetails.getGenre());
		movie.setRating(movieDetails.getRating());
		movie.setTime(movieDetails.getTime());
		
		Movie3 updatedMovie = movieRepository.save(movie);
		return updatedMovie;
	}

    public void deleteMovie(@PathVariable int id){
		movieRepository.deleteById(id);
	}
}

