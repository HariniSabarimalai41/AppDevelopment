package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;

@Entity
@Table(name = "movies")
public class Movie {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "movie_name")
    private String name;

    @Column(name = "movie_date")
    private String date;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "movie_genre")
    private Genre genre;

    @Column(name = "movie_rating")
    private String rating;

    @Column(name = "movie_time")
    private String time;

    public Movie() {
    }

    public Movie(int id, String name, String date, Genre genre, String rating, String time) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.genre = genre;
        this.rating = rating;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
