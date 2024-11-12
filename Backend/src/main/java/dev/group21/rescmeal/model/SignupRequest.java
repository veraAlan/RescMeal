package dev.group21.rescmeal.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.HashMap;
import java.util.Optional;
import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20, message = "El nombre de usuario tiene que contener entre 3 y 20 caracteres")
    private String username;
    @NotBlank
    @Size(max = 40, message = "El mail puede ser un maximo de 40 caracteres")
    @Email
    private String email;
    private String role;
    @NotBlank
    @Size(min = 6, max = 30, message = "La contraseña tiene que contener entre 6 y 30 caracteres")
    @Pattern(regexp = "(?=.*[A-Z].*[a-z])(?=.*[0-9]).{6,}", message = "La contraseña debe contener al menos una mayuscula, una minuscula y un numero")
    private String password;
}
