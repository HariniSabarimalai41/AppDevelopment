package com.example.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.app.model.LoginModel;


@Repository
public interface LoginRepository extends JpaRepository<LoginModel, Integer>{
	
	@Query("select count(d) from LoginModel d where d.username = ?1")
	public List<Integer> usernameExists(String username);
	
	@Query("select password from LoginModel d where d.username = ?1")
	public String passwordExists(String username);

}