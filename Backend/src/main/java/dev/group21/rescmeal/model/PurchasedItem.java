package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "purchased_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchasedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    @JsonBackReference // Para evitar la recursión infinita
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "business_id")
    @NotNull(message = "El campo business no puede estar vacío.")
    private Business business;

    @ManyToOne
    @JoinColumn(name = "food_id")
    @NotNull(message = "El campo food no puede estar vacío.")
    private Food food;

    @Min(value = 1, message = "La cantidad debe ser al menos 1.")
    private int quantity;

    @Min(value = 0, message = "El precio debe ser positivo.")
    private double price;
}