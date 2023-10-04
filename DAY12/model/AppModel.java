package com.example.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class AppModel {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String release;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovieName() {
        return name;
    }
    public void setMovieName(String name) {
    	this.name = name;
    }
    
    public String getRelease() {
    	return release;
    }
    public void setRelease(String release) {
    	this.release = release;
    }

}
