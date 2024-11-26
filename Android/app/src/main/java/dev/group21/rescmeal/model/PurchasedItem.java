package dev.group21.rescmeal.model;

public class PurchasedItem {
    private Integer id;
    private Purchase purchase;
    private Business business;
    private Food food;
    private int quantity;
    private double price;

    // Constructor with all fields
    public PurchasedItem(Integer id, Purchase purchase, Business business, Food food, int quantity, double price) {
        this.id = id;
        this.purchase = purchase;
        this.business = business;
        this.food = food;
        this.quantity = quantity;
        this.price = price;
    }

    // Constructor with no fields (default constructor)
    public PurchasedItem() {}

    // Getter for id
    public Integer getId() {
        return id;
    }

    // Setter for id
    public void setId(Integer id) {
        this.id = id;
    }

    // Getter for purchase
    public Purchase getPurchase() {
        return purchase;
    }

    // Setter for purchase
    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    // Getter for business
    public Business getBusiness() {
        return business;
    }

    // Setter for business
    public void setBusiness(Business business) {
        this.business = business;
    }

    // Getter for food
    public Food getFood() {
        return food;
    }

    // Setter for food
    public void setFood(Food food) {
        this.food = food;
    }

    // Getter for quantity
    public int getQuantity() {
        return quantity;
    }

    // Setter for quantity
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Getter for price
    public double getPrice() {
        return price;
    }

    // Setter for price
    public void setPrice(double price) {
        this.price = price;
    }
}