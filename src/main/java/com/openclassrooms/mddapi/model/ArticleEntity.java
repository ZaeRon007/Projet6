package com.openclassrooms.mddapi.model;

import java.util.Date;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "ARTICLE")
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "titre", length = 50)
    private String titre;

    @Column(name = "date")
    private Date createdAt;
    
    @Column(name = "content", length = 5000)
    private String content;

    @OneToOne 
    @JoinColumn(name = "THEME_name", referencedColumnName = "name")
    private String theme;

    @OneToOne
    @JoinColumn(name = "USER_id", referencedColumnName = "id")
    private int userId;

    // commentaires
    // @OneToMany
    // private Set<CommentEntity> commentList;
}
