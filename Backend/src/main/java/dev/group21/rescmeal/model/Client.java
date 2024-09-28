package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Table(name = "client")
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String last_name;
    @Email
    private String email;
    private String phone;
    private String password;
    private BigDecimal balance;
    private String address;
    private LocalDate birthdate;
}