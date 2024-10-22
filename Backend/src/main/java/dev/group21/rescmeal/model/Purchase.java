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

    @NotNull(message = "Debe seleccionar un metodo de pago.")
    private String payment_method;

    @Min(value = 0, message = "El costo total debe ser positivo.")
    private double total_cost;

    @NotNull(message = "Desea retirar su pedido o que se lo entreguen.")
    private Boolean pickup;

    @Column(name = "creation_date")
    @Temporal(TemporalType.DATE)
    private Date creation_date;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Para evitar la recursión infinita
    private List<PurchasedItem> purchasedItems = new ArrayList<>();
}