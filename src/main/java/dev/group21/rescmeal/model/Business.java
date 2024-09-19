package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NonNull;

@Entity
@Table(name = "business")
@Data
public class Business {
    @NonNull
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_business;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte [] business_photo;

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
            byte @NonNull [] business_photo,
            @NonNull String business_name,
            @NonNull String business_type,
            @NonNull String address,
            @NonNull String email,
            @NonNull String password,
            @NonNull String phone,
            @NonNull String business_time,
            @NonNull String cvu) {
         this.business_photo = business_photo;
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
