package de.neuefische.backend.controllers;

import de.neuefische.backend.models.User;
import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.services.MongoUserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
    private final MongoUserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }
}