package com.example.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.Movie2Repository;
import com.example.demo.model.Movie2;


@Service
public class Movie2Service {
    
    @Autowired
    private Movie2Repository movieRepository;

    public List<Movie2> getAllMovies(){
		return movieRepository.findAll();
	}

    public Movie2 createMovie(@RequestBody Movie2 movie) {
		return movieRepository.save(movie);
	}

    public Movie2 getMovieById(@PathVariable int id) {
		Movie2 movie = movieRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
		return movie;
	}

    public Movie2 updateMovie(@PathVariable Integer id, @RequestBody Movie2 movieDetails){
		Movie2 movie = movieRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
		
		movie.setName(movieDetails.getName());
		movie.setDate(movieDetails.getDate());
		// movie.setGenre(movieDetails.getGenre());
		movie.setRating(movieDetails.getRating());
		movie.setTime(movieDetails.getTime());
		
		Movie2 updatedMovie = movieRepository.save(movie);
		return updatedMovie;
	}

    public void deleteMovie(@PathVariable int id){
		movieRepository.deleteById(id);
	}
}

