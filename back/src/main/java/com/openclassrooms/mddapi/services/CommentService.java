package com.openclassrooms.mddapi.services;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.CommentEntity;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    public CommentEntity commentArticle(int article_id, String content) throws ParseException {
        int userId = userService.getMe().getId();
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setArticleId(article_id);
        commentEntity.setContent(content);
        commentEntity.setUserId(userId);

        return commentRepository.save(commentEntity);
    }

    public Iterable<CommentEntity> getCommentsByArticleId(int id) {
        return commentRepository.findAllByArticleId(id);
    }
    
}
