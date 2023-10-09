package com.example.flix.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.flix.model.Flix;

public interface FlixRepository extends JpaRepository<Flix,Long> {
}