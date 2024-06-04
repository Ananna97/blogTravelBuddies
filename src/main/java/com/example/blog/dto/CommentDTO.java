package com.example.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentDTO {
    private Long id;
    private String text;
    private String authorCommentFirstName;
    private String authorCommentLastName;

    public CommentDTO(Long id, String text) {
        this.id = id;
        this.text = text;
    }
}
