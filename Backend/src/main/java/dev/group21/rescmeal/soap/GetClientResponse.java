package dev.group21.rescmeal.soap;

import lombok.Data;
import org.springframework.ws.server.endpoint.annotation.Endpoint;

@Endpoint
@Data
public class GetClientResponse {
    private String name;
    private String last_name;
    private Integer balance;
}
