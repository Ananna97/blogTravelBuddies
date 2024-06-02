package com.example.blog.controller;

import com.example.blog.dto.CommentDTO;
import com.example.blog.dto.PostDTO;
import com.example.blog.dto.PostDetailsDTO;
import com.example.blog.model.Comment;
import com.example.blog.model.Post;
import com.example.blog.model.User;
import com.example.blog.service.CommentService;
import com.example.blog.service.PostService;
import com.example.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final UserService userService;

    @GetMapping
    public List<CommentDTO> getComments() {
        List<Comment> comments = commentService.findAll();
        return comments.stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getText(),
                        comment.getUser().getFirstName(),
                        comment.getUser().getLastName()))
                .collect(Collectors.toList());
    }
    @GetMapping("/{id}")
//    @PreAuthorize("isAuthenticated()")
    public CommentDTO getComment(@PathVariable Long id) {
        Comment comment = commentService.findById(id);
        return new CommentDTO(
                comment.getId(),
                comment.getText(),
                comment.getUser().getFirstName(),
                comment.getUser().getLastName());
    }

    @PostMapping("/{id}")
//    @PreAuthorize("isAuthenticated()")
    public String createNewComment(@PathVariable Long id, @ModelAttribute Comment comment, Principal principal) {
        String authUsername = "anonymousUser";

        if (principal != null) {
            authUsername = principal.getName();
        }

        User user = userService.findByEmail(authUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));
        comment.setUser(user);

        Optional<Post> optionalPost = Optional.ofNullable(postService.findById(id));
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            comment.setPost(post);
        }
        commentService.save(comment);
        return "redirect:/posts/" + id;
    }
}
