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
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Business business;

    @Lob
    private byte [] photo;
}