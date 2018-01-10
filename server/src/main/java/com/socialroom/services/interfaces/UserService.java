package com.socialroom.services.interfaces;

import com.socialroom.models.bindingModels.UpdateUserModel;
import com.socialroom.models.bindingModels.UserRegistrationModel;
import com.socialroom.models.viewModels.LoggedUser;
import com.socialroom.models.viewModels.PeopleModel;
import com.socialroom.models.viewModels.UserViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    UserViewModel registerUser(UserRegistrationModel userModel);

    UserViewModel getUserByUsername(String username);

    LoggedUser getLoggedUser(String username);

    LoggedUser getUserData(Long userId);

    void updateUser(UpdateUserModel userModel, Long userId);

    List<PeopleModel> getAllUsers();

    void deleteUser(Long id);
}
