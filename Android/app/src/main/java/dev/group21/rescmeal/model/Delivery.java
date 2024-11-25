package dev.group21.rescmeal.model;

import java.math.BigDecimal;
import java.time.LocalTime;

public class Delivery {
    private int id;
    private Purchase purchase;
    private Carrier carrier;
    private String address;
    private LocalTime delivery_time;
    private LocalTime arrival_time;
    private LocalTime waiting_time;
    private String delivery_state;
    private BigDecimal tip;

    // Constructor with all fields
    public Delivery(int id, Purchase purchase, Carrier carrier, String address, LocalTime delivery_time, LocalTime arrival_time, LocalTime waiting_time, String delivery_state, BigDecimal tip) {
        this.id = id;
        this.purchase = purchase;
        this.carrier = carrier;
        this.address = address;
        this.delivery_time = delivery_time;
        this.arrival_time = arrival_time;
        this.waiting_time = waiting_time;
        this.delivery_state = delivery_state;
        this.tip = tip;
    }

    // Constructor with no fields (default constructor)
    public Delivery() {}

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for purchase
    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    // Getter and Setter for carrier
    public Carrier getCarrier() {
        return carrier;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    // Getter and Setter for address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Getter and Setter for delivery_time
    public LocalTime getDeliveryTime() {
        return delivery_time;
    }

    public void setDeliveryTime(LocalTime delivery_time) {
        this.delivery_time = delivery_time;
    }

    // Getter and Setter for arrival_time
    public LocalTime getArrivalTime() {
        return arrival_time;
    }

    public void setArrivalTime(LocalTime arrival_time) {
        this.arrival_time = arrival_time;
    }

    // Getter and Setter for waiting_time
    public LocalTime getWaitingTime() {
        return waiting_time;
    }

    public void setWaitingTime(LocalTime waiting_time) {
        this.waiting_time = waiting_time;
    }

    // Getter and Setter for delivery_state
    public String getDeliveryState() {
        return delivery_state;
    }

    public void setDeliveryState(String delivery_state) {
        this.delivery_state = delivery_state;
    }

    // Getter and Setter for tip
    public BigDecimal getTip() {
        return tip;
    }

    public void setTip(BigDecimal tip) {
        this.tip = tip;
    }
}