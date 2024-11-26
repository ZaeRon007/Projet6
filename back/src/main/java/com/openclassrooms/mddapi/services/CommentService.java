package com.openclassrooms.mddapi.services;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.CommentEntity;
import com.openclassrooms.mddapi.model.dto.CommentDto;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    public CommentDto commentArticle(int article_id, String content) throws ParseException {
        CommentDto commentToReturn = new CommentDto();
        int userId = userService.getMe().getId();
        CommentEntity commentToSave = new CommentEntity();
        commentToSave.setArticleId(article_id);
        commentToSave.setContent(content);
        commentToSave.setUserId(userId);

        commentToReturn.setContent(content);
        commentToReturn.setUser(userService.getMe().getName());

        commentRepository.save(commentToSave);

        return commentToReturn;
    }

    public Iterable<CommentEntity> getCommentsByArticleId(int id) {
        return commentRepository.findAllByArticleId(id);
    }
    
}
