package com.example.flix.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.flix.model.Flix;


public interface FlixRepository extends JpaRepository<Flix,Long> {



}