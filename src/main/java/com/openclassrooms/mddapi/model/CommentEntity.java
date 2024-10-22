package com.openclassrooms.mddapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
@Table(name = "COMMENT")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    
    @Column(name = "content", length = 2000)
    private String content;

    @OneToOne//pourquoi ? 
    @JoinColumn(name = "USER_id", referencedColumnName = "id")//comment savoir pour les deux champs renseignés ? 
    private int userId;

    @OneToOne//pourquoi ? 
    @JoinColumn(name = "ARTICLE_id", referencedColumnName = "id")//comment savoir pour les deux champs renseignés ? 
    private int articleId;
}
