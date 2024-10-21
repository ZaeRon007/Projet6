package com.openclassrooms.mddapi.model;

import jakarta.persistence.Id;

import com.openclassrooms.mddapi.model.dto.UserDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "USERS")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "admin")
    private boolean admin;

    @Column(name = "email")
    private String email;
    
    @Column(name = "password")
    private String password;

    @Column(name = "created_at")
    private String createdAt;
    
    @Column(name = "updated_at")
    private String updatedAt;

    public UserEntity(){}

    public UserEntity(  String firstName,
                    String lastName,
                    boolean admin,
                    String email,
                    String createdAt){
        this.firstName = firstName;
        this.lastName = lastName;
        this.admin = admin;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    public UserEntity(  String firstName,
                        String lastName,
                        String email,
                        String createdAt){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    public UserDto ToUserDto(){
        return new UserDto(this.getId(),
                        this.getFirstName(),
                        this.getLastName(),
                        this.getEmail());
    }
}