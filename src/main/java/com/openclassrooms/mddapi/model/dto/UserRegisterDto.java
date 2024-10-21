package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserRegisterDto {
    String pseudo;
    String email;
    String password;
}
