package dev.group21.rescmeal.model;

import java.util.Optional;

public class RoleLinkRequest {
    private String identifier;
    private Optional<Client> client;
    private Optional<Business> business;
    private Optional<Carrier> carrier;

    // Constructor with all fields
    public RoleLinkRequest(String identifier) {
        this.identifier = identifier;
    }

    // Constructor with no fields (default constructor)
    public RoleLinkRequest() {}

    // Getter and Setter
    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Optional<Client> getClient() {
        return client;
    }

    public void setClient(Optional<Client> client) {
        this.client = client;
    }

    public Optional<Business> getBusiness() {
        return business;
    }

    public void setBusiness(Optional<Business> business) {
        this.business = business;
    }

    public Optional<Carrier> getCarrier() {
        return carrier;
    }

    public void setCarrier(Optional<Carrier> carrier) {
        this.carrier = carrier;
    }
}
