package com.openclassrooms.mddapi.model;

import java.util.ArrayList;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @Column(name = "themeId")
    private int themeId;

    @Column(name = "userId")
    private int userId;

    @Column(name = "commentList")
    private ArrayList<Integer> commentList;

    public ArticleEntity(String titre, int themeId, String content){
        this.titre = titre;
        this.themeId = themeId;
        this.content = content;
    }
}
