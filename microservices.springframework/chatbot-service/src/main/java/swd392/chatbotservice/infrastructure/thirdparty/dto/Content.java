package swd392.chatbotservice.infrastructure.thirdparty.dto;

import java.util.List;

public class Content {
    private List<Part> parts;
    private String role;

    public Content() {}

    public Content(List<Part> parts, String role) {
        this.parts = parts;
        this.role = role;
    }

    public List<Part> getParts() {
        return parts;
    }

    public void setParts(List<Part> parts) {
        this.parts = parts;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
