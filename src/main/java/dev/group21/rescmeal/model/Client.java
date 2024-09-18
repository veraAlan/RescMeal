package dev.group21.rescmeal.model;
/*
 * import jakarta.persistence.Entity;
 * import jakarta.persistence.GeneratedValue;
 * import jakarta.persistence.GenerationType;
 * import jakarta.persistence.Id;
 * import java.math.BigDecimal;
 * import java.time.LocalDate;
 */

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/*Usamos el Getter y Setter con Lockc.lock?????????*/

@Entity
public class Client {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClient;


    /*El uso de la anotación @Column en JPA es importante para definir cómo se mapea un atributo de una entidad a una columna
    en la base de datos.La anotación @Column no es estrictamente necesaria si estás satisfecho con los valores predeterminados,
    pero proporciona control adicional sobre el mapeo .*/
    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 15)
    private String phone;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(precision = 10, scale = 2)
    private BigDecimal balance;

    @Column(length = 150)
    private String address;


    private LocalDate birthdate;


    //Constructor
    protected Client() {
    }

    public Client(String name, String lastName, String email, String phone, String password, BigDecimal balance, String address, LocalDate birthdate) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.balance = balance;
        this.address = address;
        this.birthdate = birthdate;
    }


    // Getters
    public Long getIdClient() {
        return idClient;
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


    public String getPhone() {
        return phone;
    }


    public String getPassword() {
        return password;
    }


    public BigDecimal getBalance() {
        return balance;
    }


    public String getAddress() {
        return address;
    }


    public LocalDate getBirthdate() {
        return birthdate;
    }

    //Setters
    public void setIdClient(Long idClient) {
        this.idClient = idClient;
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


    public void setPhone(String phone) {
        this.phone = phone;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }


    public void setAddress(String address) {
        this.address = address;
    }


    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }
}
