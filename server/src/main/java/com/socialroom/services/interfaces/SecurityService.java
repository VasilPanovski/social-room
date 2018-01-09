package com.socialroom.services.interfaces;

/**
 * Created by ACER on 30.12.2017 г..
 */
public interface SecurityService {

    String findLoggedInUsername();

    void autologin(String username, String password);
}
