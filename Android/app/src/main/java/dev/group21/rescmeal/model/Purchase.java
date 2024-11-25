package dev.group21.rescmeal.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Purchase {
    private Integer id;
    private Client client;
    private String payment_method;
    private double total_cost;
    private Boolean pickup;
    private LocalDate creation_date;
    private String address;
    private Float address_lat;
    private Float address_long;
    private List<PurchasedItem> purchasedItems = new ArrayList<>();


    // Constructor with all fields
    public Purchase(Integer id, Client client, String payment_method, double total_cost, Boolean pickup, LocalDate creation_date, String address, Float address_lat, Float address_long, List<PurchasedItem> purchasedItems) {
        this.id = id;
        this.client = client;
        this.payment_method = payment_method;
        this.total_cost = total_cost;
        this.pickup = pickup;
        this.creation_date = creation_date;
        this.address = address;
        this.address_lat = address_lat;
        this.address_long = address_long;
        this.purchasedItems = purchasedItems;
    }

    // Constructor with no fields (default constructor)
    public Purchase() {}

    // Getter and Setter for id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // Getter and Setter for client
    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    // Getter and Setter for payment_method
    public String getPaymentMethod() {
        return payment_method;
    }

    public void setPaymentMethod(String payment_method) {
        this.payment_method = payment_method;
    }

    // Getter and Setter for total_cost
    public double getTotalCost() {
        return total_cost;
    }

    public void setTotalCost(double total_cost) {
        this.total_cost = total_cost;
    }

    // Getter and Setter for pickup
    public Boolean getPickup() {
        return pickup;
    }

    public void setPickup(Boolean pickup) {
        this.pickup = pickup;
    }

    // Getter and Setter for creation_date
    public LocalDate getCreationDate() {
        return creation_date;
    }

    public void setCreationDate(LocalDate creation_date) {
        this.creation_date = creation_date;
    }

    // Getter and Setter for address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Getter and Setter for address_lat
    public Float getAddressLat() {
        return address_lat;
    }

    public void setAddressLat(Float address_lat) {
        this.address_lat = address_lat;
    }

    // Getter and Setter for address_long
    public Float getAddressLong() {
        return address_long;
    }

    public void setAddressLong(Float address_long) {
        this.address_long = address_long;
    }

    // Getter and Setter for purchasedItems
    public List<PurchasedItem> getPurchasedItems() {
        return purchasedItems;
    }

    public void setPurchasedItems(List<PurchasedItem> purchasedItems) {
        this.purchasedItems = purchasedItems;
    }
}