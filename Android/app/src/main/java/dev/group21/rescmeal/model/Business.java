package dev.group21.rescmeal.model;

public class Business {
    private Long id;
    private String image;
    private String name;
    private String type;
    private String address;
    private float address_lat;
    private float address_long;
    private String phone;
    private String schedule;
    private String cvu;

    // Constructor with all fields
    public Business(Long id, String image, String name, String type, String address, float address_lat, float address_long, String phone, String schedule, String cvu) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.type = type;
        this.address = address;
        this.address_lat = address_lat;
        this.address_long = address_long;
        this.phone = phone;
        this.schedule = schedule;
        this.cvu = cvu;
    }

    // Constructor with no fields (default constructor)
    public Business() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getAddress_lat() {
        return address_lat;
    }

    public void setAddress_lat(float address_lat) {
        this.address_lat = address_lat;
    }

    public float getAddress_long() {
        return address_long;
    }

    public void setAddress_long(float address_long) {
        this.address_long = address_long;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getCvu() {
        return cvu;
    }

    public void setCvu(String cvu) {
        this.cvu = cvu;
    }
}
