package com.example.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public boolean postUser(User user){
        
        userRepo.save(user);
        return true;

    }

    public boolean verifyUser(User user){
       User u =   userRepo.verifyUser(user.getEmail(), user.getPassword());

       if(u!=null)
       return true;

       return false;
    }
}
