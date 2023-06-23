package de.neuefische.backend.controllers;

import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.models.UserNoAuth;
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
    public UserNoAuth registerUser(@RequestBody UserDTO newUser) {
        return userService.registerUser(newUser);
    }

    @PostMapping("/login")
    public String login() {
        System.out.println(SecurityContextHolder.getContext());
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}