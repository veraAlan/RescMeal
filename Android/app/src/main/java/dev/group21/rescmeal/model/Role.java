package dev.group21.rescmeal.model;

public class Role {
    private Integer id;
    private ERole name;

    // Constructor with all fields
    public Role(Integer id, ERole name) {
        this.id = id;
        this.name = name;
    }

    // Constructor with no fields (default constructor)
    public Role() {}

    // Getter and Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
