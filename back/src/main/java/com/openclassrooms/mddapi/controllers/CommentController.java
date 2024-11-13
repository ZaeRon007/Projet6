package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.services.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<?> commentArticle(){
        return ResponseEntity.ok().body(commentService.commentArticle());
    }
}
