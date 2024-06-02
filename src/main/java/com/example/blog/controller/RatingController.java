package com.example.blog.controller;

import com.example.blog.dto.CommentDTO;
import com.example.blog.dto.RatingDTO;
import com.example.blog.model.Rating;
import com.example.blog.model.Post;
import com.example.blog.model.Rating;
import com.example.blog.model.User;
import com.example.blog.service.PostService;
import com.example.blog.service.RatingService;
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
@RequestMapping("/ratings")
@RequiredArgsConstructor
@Slf4j
public class RatingController {

    private final RatingService ratingService;
    private final PostService postService;
    private final UserService userService;

    @GetMapping
    public List<RatingDTO> getRatings() {
        List<Rating> ratings = ratingService.findAll();
        return ratings.stream()
                .map(rating -> new RatingDTO(
                        rating.getId(),
                        rating.getValue()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
//    @PreAuthorize("isAuthenticated()")
    public RatingDTO getRating(@PathVariable Long id) {
        Rating rating = ratingService.findById(id);
        return new RatingDTO(
                rating.getId(),
                rating.getValue());
    }

    @PostMapping("/{postId}")
//    @PreAuthorize("isAuthenticated()")
    public String addRating(@PathVariable Long postId, @RequestParam int value, Principal principal) {
        String authUsername = principal.getName();
        User user = userService.findByEmail(authUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Post> optionalPost = Optional.ofNullable(postService.findById(postId));
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            Rating newRating = new Rating();
            newRating.setValue(value);
            newRating.setUser(user);
            newRating.setPost(post);
            ratingService.save(newRating);
        }

        return "redirect:/posts/" + postId;
    }
}