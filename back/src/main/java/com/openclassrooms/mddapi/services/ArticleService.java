package com.openclassrooms.mddapi.services;

import java.text.ParseException;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.ArticleEntity;
import com.openclassrooms.mddapi.model.UserSubscribesEntity;
import com.openclassrooms.mddapi.model.dto.ArticleDto;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.UserSubscribesRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserSubscribesRepository userSubscribesRepository;

    @Autowired
    private UserService userService;

    public ArticleEntity createArticle(ArticleDto article) throws ParseException {
        int userId = userService.getMe().getId();
        ArticleEntity articleToSave = new ArticleEntity(article.getTitle(),
                                                        article.getThemeId(),
                                                        article.getContent(),
                                                        userId);
        articleToSave.setCreatedAt(new Date());
        articleRepository.save(articleToSave);
        return articleToSave;
    }

    public Optional<ArticleEntity> getArticleById(String id) {
        return articleRepository.findById(Integer.parseInt(id));
    }

    public Iterable<ArticleEntity> getAllArticles() {
        return articleRepository.findAll();
    }

    public Iterable<UserSubscribesEntity> getAllSubscribes() throws ParseException {
        int userId = userService.getMe().getId();
        return userSubscribesRepository.findAllByUserId(String.valueOf(userId));
    }

    public void subscribeToArticle(String id) throws ParseException {
        int userId = userService.getMe().getId();
        UserSubscribesEntity userSubscribesEntity = new UserSubscribesEntity();
        userSubscribesEntity.setUserId(String.valueOf(userId));
        userSubscribesEntity.setThemeId(id);
        userSubscribesRepository.save(userSubscribesEntity);
    }

    public void unsubscribeToArticle(String id) throws ParseException {
        int userId = userService.getMe().getId();
        userSubscribesRepository.delete(userSubscribesRepository.findByUserIdAndThemeId(String.valueOf(userId), id));
    }

    public Optional<ArticleEntity[]> getArticlesByThemeId(String id) {
        return articleRepository.findAllByThemeId(Integer.parseInt(id));
    }
    
}
