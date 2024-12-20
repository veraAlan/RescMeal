package dev.group21.rescmeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Este campo es obligatorio")
    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 2, max = 20, message = "El nombre de usuario debe tener entre 2 y 20 caracteres")
    private String username;
    // Check if pattern works fine with any mail
    @NotNull(message = "Este campo es obligatorio")
    @Pattern(regexp = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "El mail tiene que ser valido")
    @Email(message = "Tiene que ser un mail valido")
    private String email;
    @NotNull(message = "Este campo es obligatorio")
    private String password;
    @OneToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @OneToOne
    @JoinColumn(name = "client_id")
    private Client client;
    @OneToOne
    @JoinColumn(name = "carrier_id")
    private Carrier carrier;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
