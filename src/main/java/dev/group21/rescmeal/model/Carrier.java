package dev.group21.rescmeal.model;


import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.time.LocalDate;

@Entity
public class Carrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_carrier;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String lastName;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 30)
    private String vehicleType;

    @Column(length = 15)
    private String phone;

    private LocalDate date;


    protected Carrier() {
    }

    public Carrier(String name, String lastName, String email, String password, String vehicleType, String phone, LocalDate date) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.vehicleType = vehicleType;
        this.phone = phone;
        this.date = date;
    }
    //Getters

    public Integer getIdCarrier() {
        return id_carrier;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getDate() {
        return date;
    }

    //Setters
    public void setIdCarrier(Integer idCarrier) {
        this.id_carrier = idCarrier;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

