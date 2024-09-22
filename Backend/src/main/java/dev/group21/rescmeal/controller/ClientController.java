package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        Optional<Client> client = clientRepository.findById(id);
        return client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientRepository.save(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client clientDetails) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            Client updatedClient = client.get();
            updatedClient.setName(clientDetails.getName());
            updatedClient.setLastName(clientDetails.getLastName());
            updatedClient.setEmail(clientDetails.getEmail());
            updatedClient.setPhone(clientDetails.getPhone());
            updatedClient.setPassword(clientDetails.getPassword());
            updatedClient.setBalance(clientDetails.getBalance());
            updatedClient.setAddress(clientDetails.getAddress());
            updatedClient.setBirthdate(clientDetails.getBirthdate());
            return ResponseEntity.ok(clientRepository.save(updatedClient));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            clientRepository.delete(client.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}