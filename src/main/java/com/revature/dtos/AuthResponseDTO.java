package com.revature.dtos;

import com.revature.models.Person;

import java.util.List;

public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";

    private int userId;

    public AuthResponseDTO() {

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    public AuthResponseDTO(String accessToken, String tokenType, int userId) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.userId = userId;
    }

    public AuthResponseDTO(String accessToken, int userId) {
        this.accessToken = accessToken;
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    @Override
    public String toString() {
        return "AuthResponseDTO{" +
                "accessToken='" + accessToken + '\'' +
                ", tokenType='" + tokenType + '\'' +
                ", userId=" + userId +
                '}';
    }
}
