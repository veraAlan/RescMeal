package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "photo")
// The error found a: Unknown column 'b1_0.business_photo_id_business'
public class BusinessPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id_business") // Posible culprit, its 5 am, I need sleep.
    private Business business;

    @Lob
    private byte [] photo;
}