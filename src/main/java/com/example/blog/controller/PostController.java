package com.example.blog.controller;

import com.example.blog.dto.PostDTO;
import com.example.blog.dto.PostDetailsDTO;
import com.example.blog.model.Comment;
import com.example.blog.model.Post;
import com.example.blog.model.Rating;
import com.example.blog.model.User;
import com.example.blog.repository.PostRepository;
import com.example.blog.service.CategoryService;
import com.example.blog.service.CommentService;
import com.example.blog.service.PostService;
import com.example.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final CategoryService categoryService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostRepository postRepository;
    @GetMapping
    public List<PostDTO> getPosts() {
        List<Post> posts = postService.findAll();
        return posts.stream()
                .map(post -> new PostDTO(
                        post.getId(),
                        post.getTitle(),
                        post.getBody(),
                        post.getUser().getFirstName(),
                        post.getUser().getLastName(),
                        post.getCreatedAt(),
                        post.getCategory().getCategoryName()))
                .collect(Collectors.toList());
    }
    @GetMapping("/{id}")
//    @PreAuthorize("isAuthenticated()")
    public PostDetailsDTO getPost(@PathVariable Long id) {
        Post post = postService.findById(id);
        return new PostDetailsDTO(
                post.getId(),
                post.getTitle(),
                post.getBody(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getUser().getFirstName(),
                post.getUser().getLastName(),
                post.getRatings(),
                post.getComments(),
                post.getCategory().getCategoryName());
    }

    @GetMapping("/new")
//    @PreAuthorize("isAuthenticated()")
    public String createNewPost(Model model) {
        Post post = new Post();
        model.addAttribute("post", new Post());
        model.addAttribute("categories", categoryService.findAll());
        return "post_new";
    }

    @PostMapping("/new")
//    @PreAuthorize("isAuthenticated()")
    public String createNewPost(@ModelAttribute Post post, Principal principal) {
        String authUsername = "anonymousUser";
        if (principal != null) {
            authUsername = principal.getName();
        }

        User user = userService.findByEmail(authUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));

        post.setUser(user);
        postService.save(post);
        return "redirect:/";
    }

    @GetMapping("/{id}/edit")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getPostForEdit(@PathVariable Long id, Model model) {
        Optional<Post> optionalPost = Optional.ofNullable(postService.findById(id));
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            model.addAttribute("post", post);
            return "post_edit";
        } else {
            return "error";
        }
    }

    @PostMapping("/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String updatePost(@PathVariable Long id, Post post) {

        Optional<Post> optionalPost = Optional.ofNullable(postService.findById(id));
        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();

            existingPost.setTitle(post.getTitle());
            existingPost.setBody(post.getBody());

            postService.save(existingPost);
        }

        return "redirect:/posts/" + post.getId();
    }


    @GetMapping("/{id}/delete")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String deletePost(@PathVariable Long id) {
        Optional<Post> optionalPost = Optional.ofNullable(postService.findById(id));
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            postService.delete(post);
            return "redirect:/";
        } else {
            return "error";
        }
    }
}