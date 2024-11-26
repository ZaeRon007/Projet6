package com.openclassrooms.mddapi.model.dto;

import lombok.Data;

@Data
public class CommentDto {
    int id;
    String user;
    String content;
}