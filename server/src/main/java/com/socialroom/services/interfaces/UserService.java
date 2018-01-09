package com.socialroom.services.interfaces;

import com.socialroom.models.bindingModels.UpdateUserModel;
import com.socialroom.models.bindingModels.UserRegistrationModel;
import com.socialroom.models.viewModels.LoggedUser;
import com.socialroom.models.viewModels.UserViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    UserViewModel registerUser(UserRegistrationModel userModel);

    UserViewModel getUserByUsername(String username);

    LoggedUser getLoggedUser(String username);

    void updateUser(UpdateUserModel userModel, Long userId);
}
