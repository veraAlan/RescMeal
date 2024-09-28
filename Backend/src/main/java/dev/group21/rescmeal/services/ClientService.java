package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        if (updateClient.getEmail() == null) updateClient.setEmail(existingClient.getEmail());
        if (updateClient.getPhone() == null) updateClient.setPhone(existingClient.getPhone());
        if (updateClient.getPassword() == null) updateClient.setPassword(existingClient.getPassword());
        if (updateClient.getBalance() == null) updateClient.setBalance(existingClient.getBalance());
        if (updateClient.getAddress() == null) updateClient.setAddress(existingClient.getAddress());
        if (updateClient.getBirthdate() == null) updateClient.setBirthdate(existingClient.getBirthdate());
        return clientRepository.saveAndFlush(updateClient);
    }

    /**
     * Delete a Client entity by id.
     * @param id Integer id of Client entity.
     */
    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    /**
     * Get method for Client entity, finds by entity id.
     *
     * @param id Integer id of Client entity.
     * @return Client entity.
     */
    public Client getClient(Integer id) {
        return clientRepository.findById(id).orElse(null);
    }

    /**
     * Get method for all Client entities.
     * @return List of Client entities.
     */
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
