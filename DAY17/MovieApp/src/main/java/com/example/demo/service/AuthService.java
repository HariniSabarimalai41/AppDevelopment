package com.example.demo.service;



import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.response.AuthenticationResponse;
import com.example.demo.request.AuthenticationRequest;
import com.example.demo.model.User;
import com.example.demo.model.enumerate.Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.RegisterRequest;
import com.example.demo.util.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService implements AuthServiceInt{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public boolean userRegistration(RegisterRequest request) {
        Optional<User> isUserExists = userRepository.findByEmail(request.getEmail());
        if (!isUserExists.isPresent()) {
            var user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .isEnabled(true)
                    .role(Role.valueOf(request.getRole().toUpperCase()))
                    .build();
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public AuthenticationResponse userAuthentication(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var token = jwtUtil.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .uid(user.getUid())
                .role(user.getRole())
                .build();
    }

    public List<User> getAllUserDetails() {
        return userRepository.findAll();
    }

    // public boolean deleteUserById(Long uid) {
    //     int id = uid.intValue();  
    //     Optional<User> userOptional = userRepository.findById(id);
    //     if (userOptional.isPresent()) {
    //         userRepository.deleteById(id);
    //         Long deletedUid = Long.valueOf(id);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // public boolean updateUser(Long uid, User userUpdates) {
    //     int id = uid.intValue();  
    //     Optional<User> userOptional = userRepository.findById(id);
    //     if (userOptional.isPresent()) {
    //         User user = userOptional.get();
    //         if (userUpdates.getName() != null) user.setName(userUpdates.getName());
    //         if (userUpdates.getEmail() != null) user.setEmail(userUpdates.getEmail());
    //         if (userUpdates.getPassword() != null)
    //             user.setPassword(passwordEncoder.encode(userUpdates.getPassword()));
    //         userRepository.save(user);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


}