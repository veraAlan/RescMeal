package dev.group21.rescmeal.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    @NotEmpty(message = "Este campo es obligatorio")
    private String identifier;
    @NotEmpty(message = "Este campo es obligatorio")
    // TODO Enable secure password validation.
//    @Pattern(regexp = "^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{6,}$", message = "La contraseña debe contener al menos una mayuscula, una minuscula y un numero")
    private String password;
}
