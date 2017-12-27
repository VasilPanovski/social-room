package com.socialroom.controllers;

import com.socialroom.models.bindingModels.RegisterUserModel;
import com.socialroom.services.interfaces.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping(value = "api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity registerUser(@RequestBody RegisterUserModel registerUserModel){
        //this.userService.registerUser(registerUserModel);
        String token = Jwts.builder()
                .setSubject(registerUserModel.getEmail())
                .signWith(SignatureAlgorithm.HS512, "secretKey")
                .compact();

        return new ResponseEntity(JSONParser.quote(token), HttpStatus.OK);
    }
}
