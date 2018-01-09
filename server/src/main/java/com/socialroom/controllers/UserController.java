package com.socialroom.controllers;

import com.socialroom.config.jwt.JWTConfigurer;
import com.socialroom.config.jwt.JWTToken;
import com.socialroom.config.jwt.TokenProvider;
import com.socialroom.models.bindingModels.LoggedUserModel;
import com.socialroom.models.bindingModels.LoginModel;
import com.socialroom.models.bindingModels.UpdateUserModel;
import com.socialroom.models.bindingModels.UserRegistrationModel;
import com.socialroom.models.viewModels.LoggedUser;
import com.socialroom.models.viewModels.UserViewModel;
import com.socialroom.services.interfaces.SecurityService;
import com.socialroom.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collections;


@RestController
@CrossOrigin
@RequestMapping(value = "api")
public class UserController {

    private final UserService userService;
    private final SecurityService securityService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, SecurityService securityService, TokenProvider tokenProvider, AuthenticationManager authenticationManager, ModelMapper modelMapper) {
        this.userService = userService;
        this.securityService = securityService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/login")
    public ResponseEntity authorize(@Valid @RequestBody LoginModel loginModel, HttpServletResponse response) {
        UserViewModel user = this.userService.getUserByUsername(loginModel.getUsername());

        try {
            String jwtToken = this.generateJWTToken(loginModel.getUsername(), loginModel.getPassword(), response, loginModel.isRememberMe());
            user.setToken(jwtToken);
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (AuthenticationException ae) {
            return new ResponseEntity<>(Collections.singletonMap("AuthenticationException",
                    ae.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody UserRegistrationModel userRegistrationModel, HttpServletResponse response){
        UserViewModel registeredUser = this.userService.registerUser(userRegistrationModel);

        try {
            String jwtToken = this.generateJWTToken(userRegistrationModel.getUsername(), userRegistrationModel.getPassword(), response, null);
            registeredUser.setToken(jwtToken);
            return new ResponseEntity<>(registeredUser, HttpStatus.OK);

        } catch (AuthenticationException ae) {
            return new ResponseEntity<>(Collections.singletonMap("AuthenticationException",
                    ae.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/loggedUser")
    public ResponseEntity getLoggedUser(@Valid @RequestBody LoggedUserModel loggedUserModel) {
        Authentication auth = this.tokenProvider.getAuthentication(loggedUserModel.getToken());
        String loggedUserName = auth.getName();
        if (loggedUserName != null) {
            LoggedUser loggedUser = this.userService.getLoggedUser(loggedUserName);
            return new ResponseEntity<>(loggedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/users/user/{id}")
    public ResponseEntity updateUser(@RequestBody UpdateUserModel userModel, @PathVariable(name = "id") Long id) {
        this.userService.updateUser(userModel, id);
        return new ResponseEntity(HttpStatus.OK);
    }

    private String generateJWTToken(String username, String password, HttpServletResponse response,  Boolean isRememberMe) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (isRememberMe == null) ? false : isRememberMe;
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        response.addHeader(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new JWTToken(jwt).getAuthToken();
    }
}
