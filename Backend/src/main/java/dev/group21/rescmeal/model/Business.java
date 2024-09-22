package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "business")
@Data
@DynamicUpdate
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne(mappedBy = "business", fetch = FetchType.LAZY)
    @JsonManagedReference
    private BusinessPhoto businessPhoto;
    private String business_name;
    private String business_type;
    private String address;
    @Email
    private String email;
    private String password;
    @Pattern(regexp= "\\d{10}")
    private String phone;
    private String business_time;
    private String cvu;

    protected Business() {}

    public Business(
            String business_name,
            String business_type,
            String address,
            String email,
            String password,
            String phone,
            String business_time,
            String cvu) {
         this.business_name = business_name;
         this.business_type = business_type;
         this.address = address;
         this.email = email;
         this.password = password;
         this.phone = phone;
         this.business_time = business_time;
         this.cvu = cvu;
    }
}
