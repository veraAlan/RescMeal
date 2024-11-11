package dev.group21.rescmeal.security;

import dev.group21.rescmeal.security.jwt.AuthEntryPointJwt;
import dev.group21.rescmeal.security.jwt.AuthTokenFilter;
import dev.group21.rescmeal.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
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
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

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
    @Order(1)
    public SecurityFilterChain basicFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPointJwt))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/auth/validate").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/auth/signin").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/auth/signup").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/auth/signout").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/auth/session-id").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/auth/email/{id}").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/purchase/process-payment").permitAll()
                .requestMatchers("/api/api/purchase").hasAnyRole("CLIENT", "ADMIN")
                .requestMatchers(HttpMethod.GET,"/api/food/list", "/api/food").hasAnyRole("CLIENT", "BUSINESS", "CARRIER", "ADMIN")
                .requestMatchers("/api/client", "/api/client/me").hasAnyRole("CLIENT", "ADMIN")
                .requestMatchers("/api/business", "/api/business/**").hasAnyRole("BUSINESS", "ADMIN")
                .requestMatchers("/api/carrier","/api/carrier/me").hasAnyRole("CARRIER", "ADMIN")
                .requestMatchers(HttpMethod.GET,"/api/delivery/list").hasAnyRole("CARRIER", "ADMIN")
                .requestMatchers(HttpMethod.GET,"/api/purchase/list").hasAnyRole("CARRIER", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/sales/dashboard").hasAnyRole("BUSINESS")
                .requestMatchers(HttpMethod.GET, "/api/sales/stock").hasAnyRole("BUSINESS")
                .requestMatchers(HttpMethod.GET, "/api/sales/revenue").hasAnyRole("BUSINESS")
                .requestMatchers(HttpMethod.GET, "/api/sales/customers").hasAnyRole("BUSINESS")
                .requestMatchers(HttpMethod.POST,"/api/delivery").hasAnyRole("CARRIER", "ADMIN")
                .requestMatchers(HttpMethod.POST,"/api/purchase").hasAnyRole("CARRIER", "ADMIN","CLIENT")
                .requestMatchers(HttpMethod.POST, "/api/purchase/process-payment").hasAnyRole("CARRIER", "ADMIN", "CLIENT")
                .requestMatchers(HttpMethod.POST, "/api/food").hasAnyRole("BUSINESS", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/food/me").hasAnyRole("BUSINESS") // TODO Provisional method for uploading only to the business logged in.
                .requestMatchers(HttpMethod.POST, "/api/purchase/process-payment").hasAnyRole("BUSINESS")
                .requestMatchers(HttpMethod.PUT, "/api/food").hasAnyRole("BUSINESS", "ADMIN")
                .requestMatchers(HttpMethod.PUT,"/api/purchase").hasAnyRole("CARRIER", "ADMIN")
                .requestMatchers(HttpMethod.PUT,"/api/food/*/me").hasAnyRole("BUSINESS")) // TODO Same as above but for listing foods of own business.
            .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain adminFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPointJwt))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().hasRole("ADMIN")
                )
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
