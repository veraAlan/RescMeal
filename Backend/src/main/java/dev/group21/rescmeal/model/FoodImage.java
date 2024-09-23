/*
package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "food_image")
public class FoodImage {
    @Id
    private Long food_id;

    @Lob
    private byte[] image;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idFood") // TODO Nombre de la columna en Food para el id.
    @JsonBackReference
    private  Food food;
}
*/