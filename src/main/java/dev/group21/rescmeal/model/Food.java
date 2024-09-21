/*
package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFoot;

    @ManyToOne
    @JoinColumn(name = "id_business", nullable = false)
    private Business idBusiness;

    @Column(length = 100)
    private String foodName;

    @Column(length = 50)
    private String category;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer quantity;

    private LocalDate expirationDate;

    private LocalDate productionDate;

    @Lob
    private byte[] image;

    // Constructor
    protected Food() {
    }

    public Food(Business business, String foodName, String category, BigDecimal price, String description, Integer quantity, LocalDate expirationDate, LocalDate productionDate, byte[] image) {
        this.business = business;
        this.foodName = foodName;
        this.category = category;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.expirationDate = expirationDate;
        this.productionDate = productionDate;
        this.image = image;
    }


    // Getters
    public Integer getIdFoot() {
        return idFoot;
    }


    public Business getIdBusiness() {
        return idBusiness;
    }


    public String getFoodName() {
        return foodName;
    }


    public String getCategory() {
        return category;
    }



    public BigDecimal getPrice() {
        return price;
    }


    public String getDescription() {
        return description;
    }


    public Integer getQuantity() {
        return quantity;
    }


    public LocalDate getExpirationDate() {
        return expirationDate;
    }


    public LocalDate getProductionDate() {
        return productionDate;
    }


    public byte[] getImage() {
        return image;
    }


    //Setters
    public void setIdFoot(Integer idFoot) {
        this.idFoot = idFoot;
    }


    public void setIdBusiness(Business idBusiness) {
        this.idBusiness = idBusiness;
    }


    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }


    public void setCategory(String category) {
        this.category = category;
    }


    public void setPrice(BigDecimal price) {
        this.price = price;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }


    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }


    public void setImage(byte[] image) {
        this.image = image;
    }
}
*/
