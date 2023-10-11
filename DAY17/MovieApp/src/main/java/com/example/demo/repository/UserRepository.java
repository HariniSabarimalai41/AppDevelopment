package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

import com.example.demo.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {

    @Query("select count(d) from User d where d.email = ?1")
	public List<Integer> usernameExists(String email);
	
	@Query("select password from User d where d.email = ?1")
	public String passwordExists(String password);
 
 
    @Query(value = "SELECT * FROM users u WHERE u.email=? AND u.password=?",nativeQuery=true)//SELECT * FROM USERS u WHERE u.status = 1
    public User verifyUser(String email,String password);

    Optional<User> findByEmail(String username);

    User findByUid(Long uid);

    void deleteByUid(Long uid);

}
