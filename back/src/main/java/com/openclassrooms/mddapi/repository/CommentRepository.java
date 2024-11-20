package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.openclassrooms.mddapi.model.CommentEntity;

@Repository
public interface CommentRepository extends CrudRepository<CommentEntity, Integer>{
    Iterable<CommentEntity> findAllByArticleId(int id);
}
