package com.socialroom.services;

import com.socialroom.entities.user.Authority;
import com.socialroom.entities.user.GenderType;
import com.socialroom.entities.user.User;
import com.socialroom.entities.user.UserImage;
import com.socialroom.exceptions.UserExistsException;
import com.socialroom.exceptions.UserNotFoundException;
import com.socialroom.models.bindingModels.UpdateUserModel;
import com.socialroom.models.bindingModels.UserRegistrationModel;
import com.socialroom.models.viewModels.LoggedUser;
import com.socialroom.models.viewModels.PeopleModel;
import com.socialroom.models.viewModels.UserViewModel;
import com.socialroom.repositories.AuthorityRepository;
import com.socialroom.repositories.UserRepository;
import com.socialroom.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AuthorityRepository authorityRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findOneByUsername(username);
        if(user == null){
            throw new UserNotFoundException();
        }

        return user;
    }

    @Override
    public UserViewModel registerUser(UserRegistrationModel userModel) {
        User user = this.userRepository.findOneByUsernameOrEmail(userModel.getUsername(), userModel.getEmail());
        if (user != null) {
            throw new UserExistsException();
        }

        user = this.modelMapper.map(userModel, User.class);
        user.setPassword(passwordEncoder.encode(userModel.getPassword()));
        Authority authority = this.authorityRepository.findOneByAuthority("ROLE_USER");
        user.getAuthorities().add(authority);

        this.userRepository.save(user);

        return this.modelMapper.map(user, UserViewModel.class);
    }

    @Override
    public UserViewModel getUserByUsername(String username) {
        User user = this.userRepository.findOneByUsername(username);
        if (user == null) {
            throw new UserNotFoundException();
        }

        return this.modelMapper.map(user, UserViewModel.class);
    }

    @Override
    public LoggedUser getLoggedUser(String username) {
        User user = this.userRepository.findOneByUsername(username);
        LoggedUser loggedUser = this.modelMapper.map(user, LoggedUser.class);
        loggedUser.setDateOfBirth(user.getDateOfBirth());
        loggedUser.setAuthorities(user.getAuthorities().stream().map(Authority::getAuthority).collect(Collectors.toSet()));
        loggedUser.setImages(user.getImages().stream().map(UserImage::getProfilPicUrl).collect(Collectors.toList()));

        return loggedUser;
    }

    @Override
    public LoggedUser getUserData(Long userId) {
        User user = this.userRepository.findOne(userId);
        LoggedUser userData = this.modelMapper.map(user, LoggedUser.class);
        userData.setAuthorities(user.getAuthorities().stream().map(Authority::getAuthority).collect(Collectors.toSet()));
        return userData;
    }

    @Transactional
    @Override
    public void updateUser(UpdateUserModel userModel, Long id) {
        User user = userRepository.findOne(id);
        String newEmail = userModel.getEmail();
        if (newEmail.equals(user.getEmail())) {
            user.setEmail(newEmail);
        }

        String newUsername = userModel.getUsername();
        if (newUsername.equals(user.getUsername())) {
            user.setUsername(newUsername);
        }

        user.setUsername(userModel.getUsername());
        user.setGender(GenderType.valueOf(userModel.getGender()));
        user.setDateOfBirth(userModel.getDateOfBirth());
        user.setLocation(userModel.getLocation());
        user.setProfilePicUrl(userModel.getProfilePicUrl());
        String newPassword = passwordEncoder.encode(userModel.getNewPassword());
        if (user.getPassword().equals(newPassword)) {
            user.setPassword(newPassword);
        }
    }

    @Override
    public List<PeopleModel> getAllUsers() {
        List<User> users = this.userRepository.findAll();
        List<PeopleModel> people = new ArrayList<>();
        PeopleModel peopleModel = null;
        for (User user : users) {
            peopleModel = this.modelMapper.map(user, PeopleModel.class);
            peopleModel.setGender(String.valueOf(user.getGender()));
            people.add(peopleModel);
        }

        return people;
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        User user = this.userRepository.findOne(id);
        this.userRepository.delete(user);
    }
}
