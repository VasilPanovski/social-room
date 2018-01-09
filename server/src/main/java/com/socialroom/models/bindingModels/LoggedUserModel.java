package com.socialroom.models.bindingModels;


public class LoggedUserModel {

    private String token;

    public LoggedUserModel() {
    }

    public LoggedUserModel(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
