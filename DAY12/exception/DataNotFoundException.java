package com.example.app.exception;

public class DataNotFoundException extends RuntimeException
{
    public DataNotFoundException(Long id)
    {
        super("Could not found the user with id "+ id);
    }
}