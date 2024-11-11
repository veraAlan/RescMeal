package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.time.LocalTime;

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

    private LocalTime delivery_time;
    private LocalTime arrival_time;
    private LocalTime waiting_time;
    private String delivery_state;
    @Column(name = "tip", precision = 10, scale = 2)
    private BigDecimal tip;
}