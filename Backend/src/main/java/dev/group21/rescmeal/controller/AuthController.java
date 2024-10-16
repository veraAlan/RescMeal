package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.*;
import dev.group21.rescmeal.repository.RoleRepository;
import dev.group21.rescmeal.repository.UserRepository;
import dev.group21.rescmeal.security.jwt.JwtUtils;
import dev.group21.rescmeal.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles, jwtCookie.toString()));
    }

    // TODO SingUp Could be better to create a Sign Up inside of the Role Types (Business, Client & Carrier) Or maybe a first signup here and a postRegistration for the Role Types.
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if(userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if(userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User(signupRequest.getUsername(),
                            signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()));

        String strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();
            Role role;

            switch (strRoles) {
                case "client":
                    role = roleRepository.findByName(ERole.ROLE_CLIENT)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
                case "business":
                    role = roleRepository.findByName(ERole.ROLE_BUSINESS)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
                case "carrier":
                    role = roleRepository.findByName(ERole.ROLE_CARRIER)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
                default:
                    role = roleRepository.findByName(null)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
            }

            roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        LoginRequest login = new LoginRequest(user.getUsername(), user.getPassword());

        return authenticateUser (login);
    }


    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(null);
    }
}



