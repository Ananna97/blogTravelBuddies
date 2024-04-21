package com.example.blog.controller;

import com.example.blog.dto.LoginDTO;
import com.example.blog.model.User;
import com.example.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

//    @GetMapping
//    public String getLogin() {
//
//        return "login";
//    }
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        try {
            userService.authenticate(loginDTO.getEmail(), loginDTO.getPassword());
            return ResponseEntity.ok("Login successful");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
