package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "business", uniqueConstraints = @UniqueConstraint(columnNames = {"cvu", "email", "phone"}))
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    @Pattern(regexp = "\\d{10}", message = "El teléfono debe tener 10 dígitos")
    @NotNull(message = "El teléfono es obligatorio")
    private String phone;

    @NotNull(message = "El horario es obligatorio")
    private String schedule;

    @NotNull(message = "El CVU es obligatorio")
    private String cvu;
}
