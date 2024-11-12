package dev.group21.rescmeal.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    @NotBlank
    private String identifier;
    @NotBlank
//    @Pattern(regexp = "^(?=.*[A-Z].*[a-z])(?=.*[0-9]).{6,}$", message = "La contraseña debe contener al menos una mayuscula, una minuscula y un numero")
    private String password;
}
