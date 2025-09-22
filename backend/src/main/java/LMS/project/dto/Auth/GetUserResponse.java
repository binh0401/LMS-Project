package LMS.project.dto.Auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class GetUserResponse {
    private String name;
    private LocalDate dob;        // ISO string, or LocalDate if you prefer
    private String gender;
    private String role;
    private String email;

    @JsonProperty("userId")
    private String userId;

    private LocalDateTime getInAt;  // timestamp when validated

    public GetUserResponse(String name, LocalDate dob, String gender,
                           String role, String email,
                           String userId) {
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.role = role;
        this.email = email;
        this.userId = userId;
        this.getInAt = LocalDateTime.now();
    }

    // getters and setters

    // --- getters (needed by Jackson) ---
    public String getName() { return name; }
    public LocalDate getDob() { return dob; }
    public String getGender() { return gender; }
    public String getRole() { return role; }
    public String getEmail() { return email; }
    public String getUserId() { return userId; }

    @Override
    public String toString() {
        return "GetUserResponse{" +
                "name='" + name + '\'' +
                ", dob='" + dob + '\'' +
                ", gender='" + gender + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
