package dev.group21.rescmeal.soap;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import javax.annotation.security.PermitAll;

@Endpoint
@PermitAll
public class ClientEndpoint {
    private static final String NAMESPACE_URI = "http://rescmeal.food/ws-rescmeal";

    private ClientRepository clientRepository;

    @Autowired
    public ClientEndpoint(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetClientRequest")
    @ResponsePayload
    public GetClientResponse getClient(@RequestPayload GetClientRequest request) {
        GetClientResponse response = new GetClientResponse();
        Client client = clientRepository.findByName(request.getName()).orElseThrow(() -> new RuntimeException("Client not found"));

        response.setName(client.getName());
        response.setLast_name(client.getLast_name());
        response.setBalance(client.getBalance().intValue());
        return response;
    }
}
