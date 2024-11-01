package dev.group21.rescmeal.soap;

import lombok.Data;

@Data
public class GetClientResponse {
    private String name;
    private String last_name;
    private Integer balance;
}
