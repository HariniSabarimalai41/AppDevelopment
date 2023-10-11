package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.MovieService;
import com.example.demo.service.UserService;
import com.example.demo.model.Movie;
import com.example.demo.model.User;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieService movieService;

	@Autowired
	private UserService userService;
	
	@GetMapping("/get")
	public List<Movie> getAllMovies(){
		return movieService.getAllMovies();
	}		
	
	@PostMapping("/post")
	public Movie createMovie(@RequestBody Movie movie) {
		return movieService.createMovie(movie);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
		
		return ResponseEntity.ok(movieService.getMovieById(id));
	}
	
	
	@PutMapping("/put/{id}")
	public ResponseEntity<Movie> updateMovie(@PathVariable Integer id, @RequestBody Movie movieDetails){
		
		return ResponseEntity.ok(movieService.updateMovie(id, movieDetails));
	}
	
	@DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteMovie(@PathVariable int id) {
    movieService.deleteMovie(id);
    String message = "Movie with ID " + id + " has been deleted.";
    return ResponseEntity.ok(message);
}

	
	//login

	@PostMapping("/login")
	public boolean verifyUser(@RequestBody User user){
		return userService.verifyUser(user);
	}
	
	@PostMapping("/signup")
	public boolean postUser(@RequestBody User user){
		return userService.postUser(user);
	}
}
