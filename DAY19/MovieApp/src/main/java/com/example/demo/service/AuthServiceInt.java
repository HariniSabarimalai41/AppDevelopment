package com.example.demo.service;

import com.example.demo.request.AuthenticationRequest;
import com.example.demo.request.RegisterRequest;
import com.example.demo.response.AuthenticationResponse;

public interface AuthServiceInt {
    boolean userRegistration(RegisterRequest request);

    AuthenticationResponse userAuthentication(AuthenticationRequest request);
}
