package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserRegisterAndLoginDto {
    String pseudo;
    String email;
    String password;
}
