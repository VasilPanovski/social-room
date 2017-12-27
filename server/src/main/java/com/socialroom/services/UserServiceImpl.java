package com.socialroom.services;

import com.socialroom.entities.User;
import com.socialroom.models.bindingModels.RegisterUserModel;
import com.socialroom.repositories.UserRepository;
import com.socialroom.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void registerUser(RegisterUserModel userModel) {
        User user = this.modelMapper.map(userModel, User.class);
        this.userRepository.save(user);
    }
}
