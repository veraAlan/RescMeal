package dev.group21.rescmeal.model;

import java.util.List;

public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private String token;
    private List<String> roles;

    // Constructor with all fields
    public UserInfoResponse(Long id, String username, String email, String token, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }

    // Constructor with no fields (default constructor)
    public UserInfoResponse() {}

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for username
    public String getUsername() {
        return username;
    }

    // Setter for username
    public void setUsername(String username) {
        this.username = username;
    }

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Setter for token
    public void setToken(String token) {
        this.token = token;
    }

    // Getter for roles
    public List<String> getRoles() {
        return roles;
    }

    // Setter for roles
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
