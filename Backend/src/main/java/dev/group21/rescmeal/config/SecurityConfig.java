package dev.group21.rescmeal.config;


import dev.group21.rescmeal.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UserService userService;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    // TODO Okay, todo lo de abajo era el error anterior, pero sin esto el login funciona correctamente, hay que ver como usar las contraseñas no mas.
    // TODO Not working
    // No se porque usando el http genera un loop cargando el login.
    // Quizas hay otro metodo para CRUD que funcione mejor?
    /* TODO configurar metodo de autentificacion. Http no funca por alguna razon. o Quizas es FilterChain de Security.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
        .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/api/food/**").permitAll()
                .anyRequest().authenticated()
        )
                .userDetailsService(userService)
                .formLogin((form) -> form
                        .loginPage("/login")
                        .permitAll()
                )
                .logout((logout) -> logout.permitAll())
                .build();
    }
     */
}
