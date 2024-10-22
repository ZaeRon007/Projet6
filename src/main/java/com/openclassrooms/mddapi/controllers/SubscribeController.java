package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.services.SubscribeService;

@RestController
@RequestMapping("/api")
public class SubscribeController {
    
    @Autowired
    private SubscribeService subscribeService;

    @GetMapping("/subscribes")
    public ResponseEntity<?> getAllSubscribes(){
        return ResponseEntity.ok().body(subscribeService.getAllSubscribes());
    }

    @PostMapping("/subscribe/{id}")
    public ResponseEntity<?> subscribeToArticle(@PathVariable String id){
        subscribeService.subscribeToArticle(id);
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribeToArticle(@PathVariable String id){
        subscribeService.unsubscribeToArticle(id);
        return ResponseEntity.ok().body(null);
    }
}
