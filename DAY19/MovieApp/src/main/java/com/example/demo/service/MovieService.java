package com.example.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.MovieRepository;
import com.example.demo.model.Movie;


@Service
public class MovieService {
    
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies(){
		return movieRepository.findAll();
	}

    public Movie createMovie(@RequestBody Movie movie) {
		return movieRepository.save(movie);
	}

    public Movie getMovieById(@PathVariable int id) {
		Movie movie = movieRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
		return movie;
	}

    public Movie updateMovie(@PathVariable Integer id, @RequestBody Movie movieDetails){
		Movie movie = movieRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
		
		movie.setName(movieDetails.getName());
		movie.setDate(movieDetails.getDate());
		// movie.setGenre(movieDetails.getGenre());
		movie.setRating(movieDetails.getRating());
		movie.setTime(movieDetails.getTime());
		
		Movie updatedMovie = movieRepository.save(movie);
		return updatedMovie;
	}

    public void deleteMovie(@PathVariable int id){
		movieRepository.deleteById(id);
	}
}

