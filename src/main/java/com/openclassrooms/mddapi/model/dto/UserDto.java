package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserDto {
    int id;
    String name;
    String email;

    public UserDto(){
    }

    public UserDto(int id, String name, String email){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
