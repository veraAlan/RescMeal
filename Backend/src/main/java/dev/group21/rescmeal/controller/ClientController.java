package dev.group21.rescmeal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.security.jwt.JwtUtils;
import dev.group21.rescmeal.services.ClientService;
import dev.group21.rescmeal.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.2.2:3000"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    JwtUtils jwtUtils;
    private final ClientService clientService;
    private final UserService userService;

    @Autowired
    public ClientController(ClientService clientService, UserService userService) {
        this.clientService = clientService;
        this.userService = userService;
    }

    /**
     * Validate the form of Client.
     * @param client Client Object
     * @return ResponseEntity
     */
    @PostMapping("/valid")
    public ResponseEntity<Client> validateClient(@Valid @RequestBody Client client){
        return ResponseEntity.ok().body(client);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@Valid @RequestPart("client") Client client, @RequestPart(value = "user") Long userid) {
        try {
            Client createdClient = clientService.createClient(client);
            userService.updateClient(userid, createdClient);
            return ResponseEntity.ok(createdClient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PutMapping
    public ResponseEntity<Client> updateClient(@RequestPart("client") Client newClient) {
        try {
            if (clientService.getClient(newClient.getId()) == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(clientService.updateClient(newClient));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PatchMapping
    public ResponseEntity<Client> dynamicUpdateClient(@Valid @RequestBody Client newClient) {
        try {
            Client oldClient = clientService.getClient(newClient.getId());
            if (oldClient == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(clientService.dynamicUpdateClient(oldClient, newClient));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        try {
            if (id != null) {
                clientService.deleteClient(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        try {
            Client client = clientService.getClient(id);
            if (client != null) {
                return ResponseEntity.ok(client);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<PagedModel<EntityModel<Client>>> getAllClients(Pageable pageable, PagedResourcesAssembler<Client> assembler) {
        try {
            Page<Client> clientPage = clientService.getAllClients(pageable);
            if (clientPage.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(assembler.toModel(clientPage));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PostMapping("/{id}/add")
    public ResponseEntity<Client> addBalance(@PathVariable Long id, @RequestParam BigDecimal amount) {
        try {
            Client updatedClient = clientService.addBalance(id, amount);
            return ResponseEntity.ok(updatedClient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }


    /**
     * Add error message to header and log Exception thrown.
     * @param e Exception thrown
     * @return HttpHeader
     */
    private HttpHeaders errorHeader(Exception e) {
        System.err.println(e.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Error-Message", e.getMessage());
        return headers;
    }
}
