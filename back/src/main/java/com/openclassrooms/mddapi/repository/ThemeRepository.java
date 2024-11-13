package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.openclassrooms.mddapi.model.ThemeEntity;

@Repository
public interface ThemeRepository extends CrudRepository<ThemeEntity, Integer>{
    
}
