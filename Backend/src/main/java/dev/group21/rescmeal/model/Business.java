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
    private Long id;

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

    // Float es suficiente para la precision de mapa, 00. + 5-6 digitos
    @NotNull(message = "La ubicacion es obligatoria (Latitud)")
    @Pattern(regexp = "^[+-](\\d+)\\.(\\d{5,6})$", message = "Precision maxima de 6 digitos")
    private float address_lat;
    @NotNull(message = "La ubicacion es obligatoria (Longitud)")
    @Pattern(regexp = "^[+-](\\d+)\\.(\\d{5,6})$", message = "Precision maxima de 6 digitos")
    private float address_long;

    @Pattern(regexp = "\\d{10}", message = "El teléfono debe tener 10 dígitos")
    @NotNull(message = "El teléfono es obligatorio")
    @Size(min=9,max=11)
    private String phone;

    @NotNull(message = "El horario es obligatorio")
    @Size(min = 3, max = 50, message = "La dirección debe tener entre 3 y 50 caracteres")
    private String schedule;

    @NotNull(message = "El CVU es obligatorio")
    @Size(min = 22, max = 22, message = "El cvu debe tener 22 caracteres")
    private String cvu;
}
