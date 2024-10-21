package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserDto {
    int id;
    String firstName;
    String lastName;
    String email;

    public UserDto(){
    }

    public UserDto(int id, String firstName, String lastName, String email){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
