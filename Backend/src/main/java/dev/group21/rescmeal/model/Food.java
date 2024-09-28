package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.time.LocalDate;


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
    private String name;
    private String category;
    private BigDecimal price;
    private String image;
    private String description;
    private Integer quantity;
    private LocalDate expiration_date;
    private LocalDate production_date;
}
