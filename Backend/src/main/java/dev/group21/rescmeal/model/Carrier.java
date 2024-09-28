package dev.group21.rescmeal.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;


import java.time.LocalDate;

@Entity
@Table(name = "carrier")
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Carrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Required name")
    private String name;

    @NotBlank(message = "Required last name")
    private String lastName;

    @Email
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Required password")
    private String password;

    private String vehicleType;

    @Pattern(regexp= "\\d{10}", message = "El numero de telefono debe tener menos de 10 digitos")
    private String phone;

    @NotBlank(message = "Required date")

    @Past(message = "La fecha ingresada no es valida")
    @Min(value = 18, message = "Debes ser mayor de dieciocho años para poder registrarte")
    private LocalDate date;

}
