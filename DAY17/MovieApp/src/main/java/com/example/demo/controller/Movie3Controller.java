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

import com.example.demo.service.Movie3Service;
import com.example.demo.model.Movie3;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/movies3")
public class Movie3Controller  {

	@Autowired
	private Movie3Service movieService;

	
	@GetMapping("/get")
	public List<Movie3> getAllMovies(){
		return movieService.getAllMovies();
	}		
	
	@PostMapping("/post")
	public Movie3 createMovie(@RequestBody Movie3 movie) {
		return movieService.createMovie(movie);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<Movie3> getMovieById(@PathVariable int id) {
		
		return ResponseEntity.ok(movieService.getMovieById(id));
	}
	
	
	@PutMapping("/put/{id}")
	public ResponseEntity<Movie3> updateMovie(@PathVariable Integer id, @RequestBody Movie3 movieDetails){
		
		return ResponseEntity.ok(movieService.updateMovie(id, movieDetails));
	}
	
	@DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteMovie(@PathVariable int id) {
    movieService.deleteMovie(id);
    String message = "Movie with ID " + id + " has been deleted.";
    return ResponseEntity.ok(message);
}

}
