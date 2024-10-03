package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

    @NotNull(message = "La imagen es obligatoria")
    private String image;

    @NotNull(message = "El nombre es obligatorio")
    @Size(min = 2, max = 20, message = "El nombre debe tener entre 2 y 20 caracteres")
    private String name;

    @NotNull(message = "El tipo es obligatorio")
    @Size(min = 2, max = 20, message = "El tipo debe tener entre 2 y 20 caracteres")
    private String type;

    @NotNull(message = "La dirección es obligatoria")
    @Size(min = 5, max = 50, message = "La dirección debe tener entre 5 y 50 caracteres")
    private String address;

    //TODO Falta validad si el email existe en la Base de Datos.
    @Email(message = "Debe ser un correo electrónico válido")
    @NotNull(message = "El correo electrónico no puede estar vacío")
    private String email;

    @NotNull(message = "La contraseña es obligatoria")
    @Size(min = 8, max = 30, message = "La contraseña debe tener entre 8 y 30 caracteres")
    private String password;

    @Pattern(regexp = "\\d{10}", message = "El teléfono debe tener 10 dígitos")
    @NotNull(message = "El teléfono es obligatorio")
    private String phone;

    @NotNull(message = "El horario es obligatorio")
    private String schedule;

    //TODO Falta validad si el CVU existe en la Base de Datos.
    @NotNull(message = "El CVU es obligatorio")
    private String cvu;
}
