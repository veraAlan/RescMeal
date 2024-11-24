package dev.group21.rescmeal.model;

import dev.group21.rescmeal.validation.MinAge;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name = "carrier", uniqueConstraints = @UniqueConstraint(columnNames = {"phone"}))
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Carrier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Este campo es obligatorio")
    @Size(min = 2, max = 20, message = "El nombre debe tener entre 2 y 20 caracteres")
    private String name;

    @NotEmpty(message = "Este campo es obligatorio")
    @Size(min = 2, max = 20, message = "El apellido debe tener entre 2 y 20 caracteres")
    private String last_name;

    @NotEmpty(message = "Este campo es obligatorio")
    private String vehicle_type;

    @NotEmpty(message = "Este campo es obligatorio")
    @Size(min = 10, max = 15, message = "El teléfono debe tener entre 10 y 15 caracteres")
    private String phone;

    @NotNull(message = "Este campo es obligatorio")
    @Past(message = "La fecha de nacimiento debe ser anterior a la actual")
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date birthdate;

}
