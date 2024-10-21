package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserRegisterDto {
    String firstName;
    String lastName;
    String email;
    String password;
}
