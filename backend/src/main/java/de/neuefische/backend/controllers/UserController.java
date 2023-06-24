package de.neuefische.backend.controllers;

import de.neuefische.backend.models.MongoUser;
import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.services.MongoUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class UserController {
    private final MongoUserService userService;

    @PostMapping("/register")
    public UserDTO registerUser(@RequestBody MongoUser newUser) {
        return userService.registerUser(newUser);
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}