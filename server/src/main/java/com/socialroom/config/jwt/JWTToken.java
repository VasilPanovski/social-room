package com.socialroom.config.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JWTToken {

    private String authToken;

    public JWTToken(String authToken) {
        this.authToken = authToken;
    }

    @JsonProperty("auth_token")
    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
