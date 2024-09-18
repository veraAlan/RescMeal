package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.repository.ClientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    public void testCreateClient() throws Exception {
        String clientJson = "{ \"name\": \"John\", \"lastName\": \"Doe\", \"email\": \"john.doe@example.com\", \"phone\": \"1234567890\", \"password\": \"password123\", \"balance\": 100.00, \"address\": \"123 Main St\", \"birthdate\": \"1990-01-01\" }";

        mockMvc.perform(post("/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clientJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    public void testGetAllClients() throws Exception {
        mockMvc.perform(get("/clients"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetClientById() throws Exception {
        Client client = new Client("John", "Doe", "john.doe@example.com", "1234567890", "password123", new BigDecimal("100.00"), "123 Main St", LocalDate.of(1990, 1, 1));
        clientRepository.save(client);

        mockMvc.perform(get("/clients/" + client.getIdClient()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    public void testUpdateClient() throws Exception {
        Client client = new Client("John", "Doe", "john.doe@example.com", "1234567890", "password123", new BigDecimal("100.00"), "123 Main St", LocalDate.of(1990, 1, 1));
        clientRepository.save(client);

        String updatedClientJson = "{ \"name\": \"Jane\", \"lastName\": \"Doe\", \"email\": \"jane.doe@example.com\", \"phone\": \"0987654321\", \"password\": \"newpassword123\", \"balance\": 200.00, \"address\": \"456 Main St\", \"birthdate\": \"1991-02-02\" }";

        mockMvc.perform(put("/clients/" + client.getIdClient())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedClientJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Jane"))
                .andExpect(jsonPath("$.email").value("jane.doe@example.com"));
    }

    @Test
    public void testDeleteClient() throws Exception {
        Client client = new Client("John", "Doe", "john.doe@example.com", "1234567890", "password123", new BigDecimal("100.00"), "123 Main St", LocalDate.of(1990, 1, 1));
        clientRepository.save(client);

        mockMvc.perform(delete("/clients/" + client.getIdClient()))
                .andExpect(status().isNoContent());
    }
}
