package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.*;

@Entity
@Table(name = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    @NotNull(message = "El campo client no puede estar vacío.")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "business_id")
    @NotNull(message = "El campo business no puede estar vacío.")
    private Business business;

    @NotNull(message = "El campo paymentMethod no puede estar vacío.")
    @Size(min = 1, max = 50, message = "El método de pago debe tener entre 1 y 50 caracteres.")
    private String paymentMethod;

    @Min(value = 0, message = "El costo total debe ser positivo.")
    private double totalCost;

    private boolean pickup;
    private Date creationDate;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Para evitar la recursión infinita
    private List<PurchasedItem> purchasedItems = new ArrayList<>();
}