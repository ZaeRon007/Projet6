package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.services.ThemeService;

@RestController
@RequestMapping("/api")
public class ThemeController {
    

    @Autowired
    private ThemeService themeService;

    @GetMapping("/themes")
    public ResponseEntity<?> getThemes(){
        return ResponseEntity.ok().body(themeService.getThemes());
    }
}
