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



@CrossOrigin
@RestController
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieService movieService;

	@Autowired
	private UserService userService;
	
// get all remainder
	@GetMapping("/get")
	public List<Movie> getAllMovies(){
		return movieService.getAllMovies();
	}		
	
	// create remainder rest api
	@PostMapping("/post")
	public Movie createMovie(@RequestBody Movie movie) {
		return movieService.createMovie(movie);
	}
	
	// get remainder by id rest api
	@GetMapping("/get/{id}")
	public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
		
		return ResponseEntity.ok(movieService.getMovieById(id));
	}
	
	// update remainder rest api
	
	@PutMapping("/put/{id}")
	public ResponseEntity<Movie> updateMovie(@PathVariable Integer id, @RequestBody Movie movieDetails){
		
		return ResponseEntity.ok(movieService.updateMovie(id, movieDetails));
	}
	
	// delete remainder rest api
	@DeleteMapping("/delete/{id}")
	public void deleteMovie(@PathVariable int id){
		movieService.deleteMovie(id);
		// return "Deleted";
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
