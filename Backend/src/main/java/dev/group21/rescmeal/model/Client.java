package dev.group21.rescmeal.model;

import dev.group21.rescmeal.validation.MinAge;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

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

    @NotNull(message = "Este campo es obligatorio")
    @Size(min = 2, max = 20, message = "El nombre debe tener entre 2 y 20 caracteres")
    private String name;

    @NotNull(message = "Este campo es obligatorio")
    @Size(min = 2, max = 20, message = "El apellido debe tener entre 2 y 20 caracteres")
    private String last_name;

    @NotNull(message = "Este campo es obligatorio")
    @Size(min = 10, max = 15, message = "El teléfono debe tener entre 10 y 15 caracteres")
    private String phone;

    private BigDecimal balance;

    @NotNull(message = "Este campo es obligatorio")
    @Size(min = 5, max = 50, message = "La dirección debe tener entre 5 y 50 caracteres")
    private String address;

    @NotNull(message = "Este campo es obligatorio")
    @Past(message = "La fecha de nacimiento debe ser anterior a la actual")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @MinAge(value = 18, message = "El cliente debe tener al menos 18 años")
    private Date birthdate;
}