package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class UserRegisterDto {
    
    String name;
    String email;
    String password;
}
