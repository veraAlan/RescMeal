package dev.group21.rescmeal.soap;

import lombok.Data;
import org.springframework.ws.server.endpoint.annotation.Endpoint;

@Endpoint
@Data
public class GetClientRequest {
    private String name;
}
