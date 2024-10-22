package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserRegisterAndLoginDto {
    String name;
    String email;
    String password;
}
