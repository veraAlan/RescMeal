package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.UUID;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "food")
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @NotNull(message = "Este campo es obligatorio")
    @Size(min = 2, max = 20, message = "El nombre debe tener entre 2 y 20 caracteres")
    private String name;

    @NotNull(message = "La categoría es obligatoria")
    @Size(min = 2, max = 20, message = "La categoría debe tener entre 2 y 20 caracteres")
    private String category;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    private BigDecimal price;

    @NotNull(message = "La imagen es obligatoria")
    private String image;

    @Size(max = 100, message = "La descripción no puede tener más de 100 caracteres")
    private String description;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 0, message = "La cantidad debe ser mayor a 0")
    private Integer quantity;

    @NotNull(message = "La fecha de expiración es obligatoria")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date expiration_date;

    @NotNull(message = "La fecha de producción es obligatoria")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @PastOrPresent(message = "La fecha de producción debe ser una fecha pasada o presente")
    private Date production_date;
}
