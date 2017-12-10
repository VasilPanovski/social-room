package com.socialroom.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HomeController {

    @GetMapping("api/home")
    public String helloFromAPI() {
        return "Hello From API";
    }
}
