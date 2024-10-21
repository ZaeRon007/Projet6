package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserLoginDto {
    String pseudo;
    String email;
    String password;
}
