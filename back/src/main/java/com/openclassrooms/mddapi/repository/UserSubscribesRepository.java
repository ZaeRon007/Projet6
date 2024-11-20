package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.openclassrooms.mddapi.model.UserSubscribesEntity;

@Repository
public interface UserSubscribesRepository extends CrudRepository<UserSubscribesEntity, Integer> {
    Iterable<UserSubscribesEntity> findAllById(int id);
    Iterable<UserSubscribesEntity> findAllByUserId(String id);
    UserSubscribesEntity findByUserIdAndThemeId(String userId, String ThemeId);
}