package dev.group21.rescmeal.model;

public class LoginRequest {
    private String identifier;
    private String password;

    // Constructor with all fields
    public LoginRequest(String identifier, String name) {
        this.identifier = identifier;
        this.password = password;
    }

    // Constructor with no fields (default constructor)
    public LoginRequest() {}

    // Getter and Setter
    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
