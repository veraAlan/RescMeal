package dev.group21.rescmeal.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

@Data
@XmlRootElement(name = "GetUserRoleRequest", namespace = "http://rescmeal.food/ws-rescmeal")
@XmlAccessorType(XmlAccessType.FIELD)
public class GetUserRoleRequest {
    @XmlElement
    private String username;
    @XmlElement
    private String email;
}
