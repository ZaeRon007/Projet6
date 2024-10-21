package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserDto {
    int id;
    String pseudo;
    String email;

    public UserDto(){
    }

    public UserDto(int id, String pseudo, String email){
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
    }
}
