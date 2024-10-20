package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserLoginDto {
    String email;
    String password;
}
