package com.openclassrooms.mddapi.model;

import jakarta.persistence.Id;
import java.sql.Date;
import com.openclassrooms.mddapi.model.dto.UserDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "USER", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email"),
    @UniqueConstraint(columnNames = "name")
})
@RequiredArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;
    
    @Column(name = "password")
    private String password;

    @Column(name = "created_at")
    private Date createdAt;
    
    @Column(name = "updated_at")
    private String updatedAt;

    public UserDto ToUserDto(){
        return new UserDto(this.getId(),
                        this.getName(),
                        this.getEmail());
    }
}