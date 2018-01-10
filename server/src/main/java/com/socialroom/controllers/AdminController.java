package com.socialroom.controllers;

import com.socialroom.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("api/delete-user/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        this.userService.deleteUser(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
