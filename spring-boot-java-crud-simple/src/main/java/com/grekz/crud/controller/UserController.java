package com.grekz.crud.controller;


import com.grekz.crud.entity.User;
import com.grekz.crud.repository.UserRepository;
import com.oracle.svm.core.annotate.Inject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        Assert.notNull(userRepository, "userRepository must not be null!");
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        User newUser = User.builder().email(user.getEmail()).name(user.getName()).build();
        return userRepository.save(newUser);
    }

}
