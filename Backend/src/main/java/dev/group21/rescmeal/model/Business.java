package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "business")
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String image;
    private String name;
    private String type;
    private String address;
    @Email
    private String email;
    private String password;
    @Pattern(regexp= "\\d{10}")
    private String phone;
    private String schedule;
    private String cvu;
}
