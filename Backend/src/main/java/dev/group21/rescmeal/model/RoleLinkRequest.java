package dev.group21.rescmeal.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Optional;

@Data
public class RoleLinkRequest {
    @NotBlank
    private String identifier;
    private Optional<Client> client;
    private Optional<Business> business;
    private Optional<Carrier> carrier;
}
