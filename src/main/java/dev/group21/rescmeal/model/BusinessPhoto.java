package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "business_photo")
// The error found a: Unknown column 'b1_0.business_photo_id_business'
public class BusinessPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_business;

    @Lob
    private byte [] business_photo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_business") // Posible culprit, its 5 am, I need sleep.
    private Business business;
}