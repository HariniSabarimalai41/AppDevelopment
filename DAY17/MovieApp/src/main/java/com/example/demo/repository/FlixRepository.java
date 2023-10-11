package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Flix;

public interface FlixRepository extends JpaRepository<Flix,Long> {
}