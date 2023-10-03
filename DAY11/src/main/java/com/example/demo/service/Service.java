package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Model;

public class Service implements ServiceInt {
	public static ArrayList<Model> se=new ArrayList();
	static {
		Model m=new Model(1,"pooja","pooja@123");
		Model m1=new Model(2,"nikitha","nikith@123");
		se.add(m);
		se.add(m1);
	}
	
	@Override
	public List<Model> getDatas() {
		// TODO Auto-generated method stub
		return se;
	}

}
