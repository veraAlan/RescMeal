package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFood;

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

    @OneToOne(mappedBy = "food", fetch = FetchType.LAZY)
    @JsonManagedReference
    private FoodPhoto foodPhoto;

    // Constructor
    protected Food() {
    }

    public Food(Business idBusiness, String foodName, String category, BigDecimal price, String description, Integer quantity, LocalDate expirationDate, LocalDate productionDate, FoodPhoto foodPhoto) {
        this.idBusiness = idBusiness;
        this.foodName = foodName;
        this.category = category;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.expirationDate = expirationDate;
        this.productionDate = productionDate;
        this.foodPhoto = foodPhoto;
    }


    // Getters
    public Integer getIdFood() {
        return idFood;
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


    public FoodPhoto getFoodPhoto() {
        return foodPhoto;
    }


    //Setters
    public void setIdFood(Integer idFood) {
        this.idFood = idFood;
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


    public void setFoodPhoto(FoodPhoto foodPhoto) {
        this.foodPhoto = foodPhoto;
    }
}
