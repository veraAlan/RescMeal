package dev.group21.rescmeal.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GetClientRequest", namespace = "http://rescmeal.food/ws-rescmeal")
@XmlAccessorType(XmlAccessType.FIELD)
public class GetClientRequest {

    @XmlElement(required = true)
    private String name;

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
