package dev.group21.rescmeal.model;

public class SignupRequest {
    private String username;
    private String email;
    private String role;
    private String password;

    // Constructor with all fields
    public SignupRequest(String username, String email, String role, String password) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    // Constructor with no fields (default constructor)
    public SignupRequest() {}

    // Getter and Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmal() {
        return email;
    }

    public void setEmal(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
