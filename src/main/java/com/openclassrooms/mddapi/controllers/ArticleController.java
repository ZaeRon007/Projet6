package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.model.dto.ArticleDto;
import com.openclassrooms.mddapi.services.ArticleService;

@RestController
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    
    @GetMapping("/article/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable String id){
        return ResponseEntity.ok().body(articleService.getArticleById(id));
    }

    @PostMapping("/article")
    public ResponseEntity<?> createArticle(ArticleDto article){
        return ResponseEntity.ok().body(articleService.createArticle(article));
    }

    @GetMapping("/articles")
    public ResponseEntity<?> getArticles(){
        return ResponseEntity.ok().body(articleService.getAllArticles());
    }
}
