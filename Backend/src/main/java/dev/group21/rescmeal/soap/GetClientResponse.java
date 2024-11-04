package dev.group21.rescmeal.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GetClientResponse", namespace = "http://rescmeal.food/ws-rescmeal")
@XmlAccessorType(XmlAccessType.FIELD)
public class GetClientResponse {

    @XmlElement(required = true)
    private String name;
    @XmlElement(required = true)
    private String lastName;
    @XmlElement(required = true)
    private int balance;

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
}