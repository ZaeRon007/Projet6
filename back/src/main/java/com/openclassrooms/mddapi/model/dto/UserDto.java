package com.openclassrooms.mddapi.model.dto;

import com.openclassrooms.mddapi.model.UserEntity;

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

    public UserEntity toUserEntity(){
        UserEntity userEntity = new UserEntity();
        userEntity.setId(id);
        userEntity.setName(name);
        userEntity.setEmail(email);
        return userEntity;
    }
}
