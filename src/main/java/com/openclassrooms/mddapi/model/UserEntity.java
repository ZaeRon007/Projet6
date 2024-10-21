package com.openclassrooms.mddapi.model;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

import java.util.List;

import com.openclassrooms.mddapi.model.dto.UserDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

    @Column(name = "pseudo")
    private String pseudo;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "SUBSCRIBE",
            joinColumns = @JoinColumn( name = "user_id" ),
            inverseJoinColumns = @JoinColumn( name = "theme_name" ))
    private List<String> themes;

    public UserEntity(){}

    public UserEntity(  String pseudo,
                    boolean admin,
                    String email,
                    String createdAt){
        this.pseudo = pseudo;
        this.admin = admin;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    public UserEntity(  String pseudo,
                        String email,
                        String createdAt){
        this.pseudo = pseudo;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    public UserDto ToUserDto(){
        return new UserDto(this.getId(),
                        this.getPseudo(),
                        this.getEmail());
    }
}