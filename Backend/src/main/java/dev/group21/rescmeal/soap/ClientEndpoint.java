package dev.group21.rescmeal.soap;

import dev.group21.rescmeal.model.Client;
import dev.group21.rescmeal.repository.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class ClientEndpoint {
    private static final Logger log = LoggerFactory.getLogger(ClientEndpoint.class);
    private static final String NAMESPACE_URI = "http://rescmeal.food/ws-rescmeal";

    @Autowired
    ClientRepository clientRepository;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetClientRequest")
    @ResponsePayload
    public GetClientResponse getClient(@RequestPayload GetClientRequest request) {
        log.info("Received request for client: " + request.getName());
        Client foundClient = clientRepository.findByName(request.getName()).orElse(null);

        GetClientResponse response = new GetClientResponse();
        if(foundClient != null) {
            response.setName(foundClient.getName());
            response.setLastName(foundClient.getLast_name());
            response.setBalance(foundClient.getBalance());
        }

        log.info("Responding with client details: " + response.getName() + " " + response.getLastName());
        return response;
    }
}