package dev.group21.rescmeal.soap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class ClientEndpoint {
    private static final Logger log = LoggerFactory.getLogger(ClientEndpoint.class);
    private static final String NAMESPACE_URI = "http://rescmeal.food/ws-rescmeal";

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetClientRequest")
    @ResponsePayload
    public GetClientResponse getClient(@RequestPayload GetClientRequest request) {
        log.info("Received request for client: " + request.getName());

        GetClientResponse response = new GetClientResponse();
        response.setName("John");
        response.setLastName("Doe");
        response.setBalance(100);

        log.info("Responding with client details: " + response.getName() + " " + response.getLastName());
        return response;
    }
}