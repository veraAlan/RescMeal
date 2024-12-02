package dev.group21.rescmeal.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Client {
    private Long id;
    private String name;
    private String last_name;
    private String phone;
    private BigDecimal balance;
    private String birthdate;

    // Constructor with all fields
    public Client(Long id, String name, String last_name, String phone, BigDecimal balance, String birthdate) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.phone = phone;
        this.balance = balance;
        this.birthdate = birthdate;
    }

    // Constructor with no fields (default constructor)
    public Client() {}

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for last_name
    public String getLastName() {
        return last_name;
    }

    public void setLastName(String last_name) {
        this.last_name = last_name;
    }

    // Getter and Setter for phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter and Setter for balance
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    // Getter and Setter for birthdate
    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }
}