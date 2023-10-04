package com.example.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.model.AppModel;

public interface AppRepository extends JpaRepository<AppModel,Long> {
}