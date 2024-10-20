package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.model.User;
import dev.group21.rescmeal.security.jwt.JwtUtils;
import dev.group21.rescmeal.services.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    JwtUtils jwtUtils;
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@Valid @RequestBody Client client) {
        try {
            Client createdClient = clientService.createClient(client);
            return ResponseEntity.ok(createdClient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PutMapping
    public ResponseEntity<Client> updateClient(@Valid @RequestBody Client newClient) {
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
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
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
    public ResponseEntity<Client> getClient(@PathVariable Integer id) {
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

    @GetMapping()
    public ResponseEntity<List<Client>> getAllClients() {
        try {
            List<Client> clientList = clientService.getAllClients();
            if (clientList.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(clientList);
            }
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
