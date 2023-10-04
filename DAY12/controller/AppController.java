package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.app.exception.DataNotFoundException;
import com.example.app.model.AppModel;
import com.example.app.repository.AppRepository;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
public class AppController {

    @Autowired
    private AppRepository appRepository;

    @PostMapping("/user")
    AppModel newUser(@RequestBody AppModel newUser) {
        return appRepository.save(newUser);
    }

    @GetMapping("/users")
    List<AppModel> getAllUsers() {
        return appRepository.findAll();
    }

    @GetMapping("/user/{id}")
    AppModel getUserById(@PathVariable Long id) {
        return appRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    AppModel updateUser(@RequestBody AppModel newUser, @PathVariable Long id) {
        return appRepository.findById(id)
                .map(user -> {
                    user.setMovieName(newUser.getMovieName());
                    user.setRelease(newUser.getRelease());
                    return appRepository.save(user);
                }).orElseThrow(() -> new DataNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!appRepository.existsById(id)){
            throw new DataNotFoundException(id);
        }
        appRepository.deleteById(id);
        return  "Forecasting Data With Id "+id+" Has Been Deleted.";
    }


}