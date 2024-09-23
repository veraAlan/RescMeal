package dev.group21.rescmeal.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "business")
@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
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
}
