package com.openclassrooms.mddapi.services;

import java.text.ParseException;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.ArticleEntity;
import com.openclassrooms.mddapi.model.dto.ArticleDto;
import com.openclassrooms.mddapi.repository.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

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

    public Object getAllSubscribes() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllSubscribes'");
    }

    public void subscribeToArticle(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'subscribeToArticle'");
    }

    public void unsubscribeToArticle(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'unsubscribeToArticle'");
    }
    
}
