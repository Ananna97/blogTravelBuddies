package com.example.blog.controller;

import com.example.blog.dto.CommentDTO;
import com.example.blog.model.Comment;
import com.example.blog.model.Post;
import com.example.blog.model.User;
import com.example.blog.service.CommentService;
import com.example.blog.service.PostService;
import com.example.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final UserService userService;
    private static final List<String> romanianFirstNames = Arrays.asList("Ion", "Maria", "Ana", "Gheorghe", "Elena");
    private static final List<String> romanianLastNames = Arrays.asList("Popescu", "Ionescu", "Georgescu", "Dumitrescu", "Stoica");
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


    @PostMapping("/{postId}")
    public CommentDTO createNewComment(@PathVariable Long postId, @RequestBody CommentDTO commentDTO) {
        Random rand = new Random();
        String randomFirstName = romanianFirstNames.get(rand.nextInt(romanianFirstNames.size()));
        String randomLastName = romanianLastNames.get(rand.nextInt(romanianLastNames.size()));

        User randomUser = new User();
        randomUser.setFirstName(randomFirstName);
        randomUser.setLastName(randomLastName);
        randomUser.setPassword("defaultPassword");

        User savedUser = userService.save(randomUser);

        Comment comment = new Comment();
        comment.setText(commentDTO.getText());
        comment.setUser(savedUser);

        Post post = postService.findById(postId);
        comment.setPost(post);

        Comment savedComment = commentService.save(comment);

        return new CommentDTO(
                savedComment.getId(),
                savedComment.getText(),
                randomFirstName,
                randomLastName);
    }

}
