package dev.group21.rescmeal.model;

import java.time.LocalDate;

public class Carrier {
    private Long id;
    private String name;
    private String last_name;
    private String vehicle_type;
    private String phone;
    private LocalDate birthdate;

    // Constructor with all fields
    public Carrier(Long id, String name, String last_name, String vehicle_type, String phone, LocalDate birthdate) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.vehicle_type = vehicle_type;
        this.phone = phone;
        this.birthdate = birthdate;
    }

    // Constructor with no fields (default constructor)
    public Carrier() {}

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

    // Getter and Setter for vehicle_type
    public String getVehicleType() {
        return vehicle_type;
    }

    public void setVehicleType(String vehicle_type) {
        this.vehicle_type = vehicle_type;
    }

    // Getter and Setter for phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter and Setter for birthdate
    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }
}
