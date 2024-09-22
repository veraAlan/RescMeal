package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "business_photo")
public class BusinessPhoto {
    @Id
    private Integer business_id;

    @Lob
    private byte [] photo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    @JsonBackReference
    private Business business;
}