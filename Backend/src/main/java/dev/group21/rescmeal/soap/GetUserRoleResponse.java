package dev.group21.rescmeal.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Data
@XmlRootElement(name = "GetUserRoleResponse", namespace = "http://rescmeal.food/ws-rescmeal")
@XmlAccessorType(XmlAccessType.FIELD)
public class GetUserRoleResponse {
    // Universal
    @XmlElement(required = true)
    private String name;

    // Business
    @XmlElement
    private String type;
    @XmlElement
    private String schedule;

    // Client
    @XmlElement
    private BigDecimal balance;

    // Carrier
    @XmlElement
    private String vehicle_type;

    // Client and Carrier
    @XmlElement
    private String lastName;
    @XmlElement
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthdate;
    // Client and Business
    @XmlElement
    private String address;
    // Carrier and Business
    @XmlElement
    private String phone;

    // Server Information (For errors)
    @XmlElement
    private String message;
}
