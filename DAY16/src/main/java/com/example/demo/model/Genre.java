package com.example.demo.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;

@Entity
@Transactional
@Table(name = "genre")
public class Genre {
  
	@Id
	private int id;
	private String genreType;
	
	public Genre() {
		super();
	}
	public Genre(int id, String genreType) {
		super();
		this.id = id;
		this.genreType = genreType;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGenre() {
		return genreType;
	}
	public void setGenre(String genreType) {
		this.genreType = genreType;
	}

}