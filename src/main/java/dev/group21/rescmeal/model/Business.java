package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.validator.constraints.UUID;

@Entity
@Table(name = "business")
@Data
public class Business {
    @NonNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_business;

    // TODO Relationship not working, check
//    @OneToOne(mappedBy = "business", cascade=CascadeType.ALL)
//    private BusinessPhoto businessPhoto;

    @NonNull
    private String business_name;

    @NonNull
    private String business_type;

    @NonNull
    private String address;

    @Email
    @NonNull
    private String email;

    @NonNull
    private String password;

    @Pattern(regexp= "\\d{10}")
    @NonNull
    private String phone;

    @NonNull
    private String business_time;

    @NonNull
    private String cvu;

    protected Business() {}

    public Business(
            @NonNull String business_name,
            @NonNull String business_type,
            @NonNull String address,
            @NonNull String email,
            @NonNull String password,
            @NonNull String phone,
            @NonNull String business_time,
            @NonNull String cvu) {
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
