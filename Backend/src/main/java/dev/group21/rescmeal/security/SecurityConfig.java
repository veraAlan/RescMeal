package dev.group21.rescmeal.security;

import dev.group21.rescmeal.security.jwt.AuthEntryPointJwt;
import dev.group21.rescmeal.security.jwt.AuthTokenFilter;
import dev.group21.rescmeal.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${group21.rescmeal.crossOrigin}")
    String crossOrigin;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // TODO Needs checking the methods possible and what the endpoint should do.
    @Bean
    public SecurityFilterChain authFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPointJwt))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                // Session methods
                                .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/auth/**").permitAll()
                                // User
                                .requestMatchers(HttpMethod.POST, "/api/*/valid").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/user/me").hasAnyRole("CLIENT", "BUSINESS", "CARRIER", "ADMIN")
                                // Food
                                .requestMatchers(HttpMethod.GET, "/api/food/list").permitAll()
                                // Client
                                .requestMatchers(HttpMethod.POST, "/api/client").hasRole("CLIENT")
                                .requestMatchers(HttpMethod.PUT, "/api/client").hasRole("CLIENT")
                                .requestMatchers(HttpMethod.PATCH, "/api/client").hasRole("CLIENT")
                                .requestMatchers("/api/api/purchase").hasAnyRole("CLIENT")
                                // Business
                                .requestMatchers(HttpMethod.POST, "/api/business", "/api/food").hasRole("BUSINESS")
                                .requestMatchers(HttpMethod.PUT, "/api/business", "/api/food").hasRole("BUSINESS")
                                .requestMatchers(HttpMethod.PATCH, "/api/business").hasRole("BUSINESS")
                                .requestMatchers(HttpMethod.GET, "/api/food/me", "/api/food/*","/api/sales/dashboard", "/api/sales/stock", "/api/sales/revenue", "/api/sales/customers").hasRole("BUSINESS")
                                // Carrier
                                .requestMatchers(HttpMethod.POST, "/api/delivery", "/api/purchase", "/api/carrier").hasRole("CARRIER")
                                .requestMatchers(HttpMethod.GET, "/api/delivery/list", "/api/purchase/list", "/api/delivery/taken", "/api/delivery/{id}", "/api/carrier/{id}", "/api/delivery/carrierByPurchase/{id}").hasRole("CARRIER")
                                .requestMatchers(HttpMethod.PUT, "/api/purchase").hasRole("CARRIER")
                                // MultiRole
                                .requestMatchers(HttpMethod.POST, "/api/purchase/process-payment").hasAnyRole("CARRIER", "ADMIN", "CLIENT")
                                .requestMatchers(HttpMethod.POST, "/api/purchase").hasAnyRole("CARRIER", "ADMIN", "CLIENT")
                                .requestMatchers(HttpMethod.GET, "/api/business/list").hasAnyRole("CARRIER", "ADMIN", "CLIENT")
                                .requestMatchers(HttpMethod.GET, "/api/purchase/{id}").hasAnyRole("CARRIER", "ADMIN", "CLIENT")
//                    .requestMatchers(HttpMethod.PUT, "").hasAnyRole("")
//                    .requestMatchers(HttpMethod.PATCH, "").hasAnyRole("")
//                    .requestMatchers(HttpMethod.GET, "").hasAnyRole("")
                                // ADMIN
                                .requestMatchers("/api/**").hasRole("ADMIN")
                )
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
