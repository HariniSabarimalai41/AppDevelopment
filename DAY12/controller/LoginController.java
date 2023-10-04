package com.example.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.model.LoginModel;
import com.example.app.repository.LoginRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class LoginController {
	
	@Autowired
	private LoginRepository service;
	
	@PostMapping(value = "/signup", consumes = "application/json")
	public boolean signup(@RequestBody LoginModel d) {
		
		List<Integer> count = service.usernameExists(d.getUsername());
		if(count.get(0) == 0) {
			
			service.save(d);
			return true;
		}
		else return false;
	}
	
	@GetMapping(value = "/login")
	public boolean login(@RequestParam String username,@RequestParam String password ) {
		
		List<Integer> count = service.usernameExists(username);
		String orgPassword = service.passwordExists(username);
		
		if(count.get(0) == 1) {
			if(orgPassword.equals(password)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

		
	}