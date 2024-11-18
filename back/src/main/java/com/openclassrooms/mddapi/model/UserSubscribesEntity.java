package com.openclassrooms.mddapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "USER_SUBSCRIBES")
@NoArgsConstructor
public class UserSubscribesEntity {
    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "theme_id")
    private String themeId;    
}
