package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.*;
import dev.group21.rescmeal.repository.*;
import dev.group21.rescmeal.security.jwt.JwtUtils;
import dev.group21.rescmeal.services.UserDetailsImpl;
import dev.group21.rescmeal.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Value("${group21.rescmeal.crossOrigin}")
    String crossOrigin;
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
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    BusinessRepository businessRepository;
    @Autowired
    CarrierRepository carrierRepository;
    @Autowired
    UserService userService;

    @PostMapping("/valid")
    public ResponseEntity<SignupRequest> validateUserForm(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok().body(signupRequest);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // Log in with either email or username.
        if (loginRequest.getIdentifier().matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            User user = userRepository.findByEmail(loginRequest.getIdentifier()).orElseThrow(() -> new RuntimeException("Identifier not found."));
            loginRequest.setIdentifier(user.getUsername());
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getIdentifier(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), jwtCookie.getValue(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        // TODO Reformat Response to send a <Key, Value> that can be used in front end as error display text for a specific input.
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = switch (signupRequest.getRole().toUpperCase()) {
            case "CLIENT" ->
                    roleRepository.findByName(ERole.ROLE_CLIENT).orElseThrow(() -> new RuntimeException("Role not found"));
            case "BUSINESS" ->
                    roleRepository.findByName(ERole.ROLE_BUSINESS).orElseThrow(() -> new RuntimeException("Role not found"));
            case "CARRIER" ->
                    roleRepository.findByName(ERole.ROLE_CARRIER).orElseThrow(() -> new RuntimeException("Role not found"));
            default -> roleRepository.findByName(null).orElseThrow(() -> new RuntimeException("Role not found"));
        };

        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        LoginRequest loginRequest = new LoginRequest(signupRequest.getUsername(), signupRequest.getPassword());

        return authenticateUser(loginRequest);
    }

    @GetMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(null);
    }

    // TODO Corregir uso en front y eliminar esta funcion.
    @GetMapping("/session-id")
    public ResponseEntity<Integer> getSessionId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (user.getClient() != null) {
                return ResponseEntity.ok(user.getClient().getId().intValue());
            } else if (user.getBusiness() != null) {
                return ResponseEntity.ok(user.getBusiness().getId().intValue());
            } else if (user.getCarrier() != null) {
                return ResponseEntity.ok(user.getCarrier().getId().intValue());
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/email/{id}")
    public ResponseEntity<String> getEmailBySessionId(@PathVariable("id") Integer sessionId) {
        User user = userRepository.findByClient_Id(sessionId)
                .orElse(userRepository.findByBusiness_Id(sessionId)
                        .orElse(userRepository.findByCarrier_Id(sessionId)
                                .orElseThrow(() -> new RuntimeException("User not found"))));

        return ResponseEntity.ok(user.getEmail());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getOwnInformation(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwtUtils.validateJwtToken(jwt)) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found."));
            return ResponseEntity.ok().body(user);
        }
        return sessionVerify(request);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> sessionVerify(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwtUtils.validateJwtToken(jwt)) {
            return ResponseEntity.ok().body(null);
        }
        ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.status(403).header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(null);
    }

    // TODO revisar y probar la funcion
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(HttpServletRequest request, @RequestBody SignupRequest updateUser) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwtUtils.validateJwtToken(jwt)) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User updatedUser = userService.updateUser(userDetails.getId(), updateUser);
            return ResponseEntity.ok().body(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT token");
        }
    }

    public Business getBusiness () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (user.getBusiness() != null) {
                return user.getBusiness();
            } else {
                return new Business();
            }
        }
        return new Business();
    }

    public Carrier getCarrier () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (user.getCarrier() != null) {
                return user.getCarrier();
            } else {
                return new Carrier();
            }
        }
        return new Carrier();
    }
}