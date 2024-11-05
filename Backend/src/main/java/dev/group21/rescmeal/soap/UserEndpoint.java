package dev.group21.rescmeal.soap;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.model.User;
import dev.group21.rescmeal.repository.BusinessRepository;
import dev.group21.rescmeal.repository.CarrierRepository;
import dev.group21.rescmeal.repository.ClientRepository;
import dev.group21.rescmeal.repository.UserRepository;
import dev.group21.rescmeal.services.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.util.Collection;
import java.util.Optional;

@Endpoint
public class UserEndpoint {
    private static final Logger log = LoggerFactory.getLogger(UserEndpoint.class);
    private static final String NAMESPACE_URI = "http://rescmeal.food/ws-rescmeal";

    @Autowired
    UserRepository userRepository;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    BusinessRepository businessRepository;
    @Autowired
    CarrierRepository carrierRepository;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetUserRequest")
    @ResponsePayload
    public GetUserResponse getUser(@RequestPayload GetUserRequest request) {
        log.info("Received request for client: " + request.getUsername());
        User foundUser = null;
        if (request.getUsername() != null) {
             foundUser = userRepository.findByUsername(request.getUsername()).orElse(null);
        } else if (request.getEmail() != null) {
            foundUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        }

        GetUserResponse response = new GetUserResponse();
        if(foundUser != null) {
            response.setUsername(foundUser.getUsername());
            response.setEmail(foundUser.getEmail());
        } else {
            response.setMessage("No se encuentra el usuario: " + request.getUsername());
        }

        log.info("Responding with user details: " + response.getUsername());
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetUserRoleRequest")
    @ResponsePayload
    public GetUserRoleResponse getUserRoleInfo(@RequestPayload GetUserRoleRequest request) {
        log.info("Received request for client: " + request.getUsername());
        User foundUser = null;
        if (request.getUsername() != null) {
            foundUser = userRepository.findByUsername(request.getUsername()).orElse(null);
        } else if (request.getEmail() != null) {
            foundUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        }

        GetUserRoleResponse response = new GetUserRoleResponse();
        if(foundUser != null) {
            Collection<? extends GrantedAuthority> userDetails = userDetailsService.loadUserByUsername(foundUser.getUsername()).getAuthorities();
            switch (userDetails.stream().toList().getFirst().toString()) {
                case "ROLE_CLIENT":
                    Client client = clientRepository.findById(foundUser.getClient().getId()).orElse(null);
                    if(client != null) {
                        response.setBalance(client.getBalance());
                        response.setLastName(client.getLast_name());
                        response.setBirthdate(client.getBirthdate());
                        response.setAddress(client.getAddress());
                    } else {
                        response.setMessage("No se encuentra el Cliente.");
                    }
                    break;
                case "ROLE_BUSINESS":
                    Business business = businessRepository.findById(foundUser.getBusiness().getId()).orElse(null);
                    if(business != null) {
                        response.setType(business.getType());
                        response.setSchedule(business.getSchedule());
                        response.setPhone(business.getPhone());
                        response.setAddress(business.getAddress());
                    } else {
                        response.setMessage("No se encuentra el Local.");
                    }
                    break;
                case "ROLE_CARRIER":
                    Carrier carrier = carrierRepository.findById(foundUser.getCarrier().getId()).orElse(null);
                    if(carrier != null) {
                        response.setVehicle_type(carrier.getVehicleType());
                        response.setLastName(carrier.getLastName());
                        response.setPhone(carrier.getPhone());
                        response.setBirthdate(carrier.getBirthdate());
                        response.setPhone(carrier.getPhone());
                    } else {
                        response.setMessage("No se encuentra el Repartidor.");
                    }
                    break;
                case "ROLE_ADMIN":
                    response.setMessage("No se puede proporcionar informacion de rol Admin.");
                    break;
            }
            log.info("Responding with user details: " + response.getName());
        } else {
            response.setMessage("No se encuentra el usuario.");
        }

        return response;
    }
}