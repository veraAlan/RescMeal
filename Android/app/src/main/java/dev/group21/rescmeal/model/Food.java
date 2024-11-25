package dev.group21.rescmeal.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Food {
    private Integer id;
    private Business business;
    private String name;
    private String category;
    private BigDecimal price;
    private String image;
    private String description;
    private Integer quantity;
    private String expiration_date;
    private String production_date;

    // Constructor with all fields
    public Food(Integer id, Business business, String name, String category, BigDecimal price, String image, String description, Integer quantity, String expiration_date, String production_date) {
        this.id = id;
        this.business = business;
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
        this.description = description;
        this.quantity = quantity;
        this.expiration_date = expiration_date;
        this.production_date = production_date;
    }

    // Constructor with no fields (default constructor)
    public Food() {}
    // Getter and Setter for id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // Getter and Setter for business
    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Getter and Setter for price
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // Getter and Setter for image
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Getter and Setter for description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter and Setter for quantity
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    // Getter and Setter for expiration_date
    public String getExpirationDate() {
        return expiration_date;
    }

    public void setExpirationDate(String expiration_date) {
        this.expiration_date = expiration_date;
    }

    // Getter and Setter for production_date
    public String getProductionDate() {
        return production_date;
    }

    public void setProductionDate(String production_date) {
        this.production_date = production_date;
    }
}
