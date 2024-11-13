package com.openclassrooms.mddapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.ThemeEntity;
import com.openclassrooms.mddapi.repository.ThemeRepository;

@Service
public class ThemeService {
    
    @Autowired
    private ThemeRepository themeRepository;

    public Iterable<ThemeEntity> getThemes(){
        return themeRepository.findAll();
    }
}
