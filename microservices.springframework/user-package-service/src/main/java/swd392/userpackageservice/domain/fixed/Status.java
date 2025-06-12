package swd392.userpackageservice.domain.fixed;

public enum Status {
    SUCCESS("SUCCESS"),
    FAILED("FAILED");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
