package com.openclassrooms.mddapi.model.responses;


import lombok.Data;

@Data
public class simpleToken {
    private String token;

    public simpleToken(String token) {
        this.token = token;
    }
}