package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.repository.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;


@Service
@Transactional
public class ClientService {
    private final ClientRepository clientRepository;

    /**
     * Init methods for Client Service.
     * @param clientRepository Client Repository.
     */
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    /**
     * Create a Client entity.
     * @param client complete Client entity.
     * @return Client entity
     */
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    /**
     * Update method, needs a complete Client entity. No null properties.
     * @param updateClient Client entity with updated values.
     * @return Client entity
     */
    public Client updateClient(Client updateClient) {
        return clientRepository.saveAndFlush(updateClient);
    }

    /**
     * Update method, works even while sending a partially different Client entity.
     * @param existingClient old Client entity without changed values.
     * @param updateClient updated Client entity, may have null properties.
     * @return Client entity
     */
    public Client dynamicUpdateClient(Client existingClient, Client updateClient) {
        if (updateClient.getName() == null) updateClient.setName(existingClient.getName());
        if (updateClient.getLast_name() == null) updateClient.setLast_name(existingClient.getLast_name());
        if (updateClient.getPhone() == null) updateClient.setPhone(existingClient.getPhone());
        if (updateClient.getBalance() == null) updateClient.setBalance(existingClient.getBalance());
        if (updateClient.getBirthdate() == null) updateClient.setBirthdate(existingClient.getBirthdate());
        return clientRepository.saveAndFlush(updateClient);
    }

    /**
     * Delete a Client entity by id.
     * @param id Integer id of Client entity.
     */
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    /**
     * Get method for Client entity, finds by entity id.
     *
     * @param id Integer id of Client entity.
     * @return Client entity.
     */
    public Client getClient(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    /**
     * Get method for all Client entities.
     * @return List of Client entities.
     */
    public Page<Client> getAllClients(Pageable parameters) {
        return clientRepository.findAll(parameters);
    }


    public Optional<Client> getClientById(Long id) { return clientRepository.findById(id); }


    public Client addBalance(Long clientId, BigDecimal balance) throws Exception {
        Client client = clientRepository.findById(clientId).orElseThrow(() -> new Exception("Cliente no encontrado"));
        client.setBalance(client.getBalance().add(balance));
        return clientRepository.save(client);
    }
}
