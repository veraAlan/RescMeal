package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.sql.Time;

@Entity
@Table(name = "delivery")
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "carrier_id", nullable = false)
    private Carrier carrier;

    @Column(name = "address", length = 150)
    private String address;

    private Time delivery_time;
    private Time arrival_time;
    private Time waitingTime;
    private String delivery_state;
    @Column(name = "tip", precision = 10, scale = 2)
    private BigDecimal tip;
}