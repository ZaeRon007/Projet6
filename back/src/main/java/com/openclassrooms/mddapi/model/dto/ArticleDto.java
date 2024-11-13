package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class ArticleDto {
    int themeId;
    String title;
    String content;
}
