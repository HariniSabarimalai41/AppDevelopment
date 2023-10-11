package com.example.demo.service;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.Flix;

import java.util.Collections;
import java.util.List;

@Service
public class FlixService {

    private final RestTemplate restTemplate;

    public FlixService() {
        this.restTemplate = new RestTemplate();
    }

    public List<Flix> getAllUsers() {
        ResponseEntity<List<Flix>> response = restTemplate.exchange(
                "http://localhost:8081/get",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Flix>>() {}
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            // Handle error or return an empty list
            return Collections.emptyList();
        }
    }

    public Flix newUser(Flix review) {
        ResponseEntity<Flix> response = restTemplate.exchange(
                "http://localhost:8081/post",
                HttpMethod.POST,
                new HttpEntity<>(review),
                Flix.class
        );

        if (response.getStatusCode() == HttpStatus.CREATED) {
            return response.getBody();
        } else {
            // Handle error or return null
            return null;
        }
    }
}