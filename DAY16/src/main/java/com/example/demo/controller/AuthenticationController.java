package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.request.RegisterRequest;
import com.example.demo.response.AuthenticationResponse;
import com.example.demo.request.AuthenticationRequest;
import com.example.demo.service.AuthService;
import com.example.demo.constant.Api;
import com.example.demo.repository.UserRepository;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.AUTH)
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthService authService;
    @Autowired
	private UserRepository service;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        boolean isRegistered = authService.userRegistration(request);
        return isRegistered ? ResponseEntity.ok("User registered successfully")
                : ResponseEntity.badRequest().body("Sommething went wrong!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.userAuthentication(request));
    }

    @GetMapping(value = "/log")
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
