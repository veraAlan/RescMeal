package dev.group21.rescmeal.model;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignupRequest {
    @NotEmpty(message = "Este campo es obligatorio")
    @Size(min = 3, max = 20, message = "El nombre de usuario tiene que contener entre 3 y 20 caracteres")
    private String username;
    @NotEmpty(message = "Este campo es obligatorio")
    @Size(max = 40, message = "El mail puede ser un maximo de 40 caracteres")
    @Email
    private String email;
    private String role;
    @NotEmpty(message = "Este campo es obligatorio")
    @Size(min = 6, max = 30, message = "La contraseña tiene que contener entre 6 y 30 caracteres")
    @Pattern(regexp = "(?=.*[A-Z].*[a-z])(?=.*[0-9]).{6,}", message = "La contraseña debe contener al menos una mayuscula, una minuscula y un numero")
    private String password;
}
