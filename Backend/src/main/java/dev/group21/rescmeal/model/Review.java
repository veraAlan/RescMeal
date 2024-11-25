package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "review")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Temporal(TemporalType.DATE)
    private LocalDate review_date;

    @Column(name = "mark")
    private int mark;

    @Column(name = "description", columnDefinition = "text")
    private String description;
}