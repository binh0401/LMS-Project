package LMS.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class SignUpResponse {

    @JsonProperty("userId")
    private String userId;

    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String gender;

    private String role;

    private String email;

    @JsonProperty("createdAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    private String token;

    // Default constructor
    public SignUpResponse() {}

    // Constructor with all fields
    public SignUpResponse(String userId, String name, LocalDate dob, String gender,
                           String role, String email, LocalDateTime createdAt, String token) {
        this.userId = userId;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.role = role;
        this.email = email;
        this.createdAt = createdAt;
        this.token = token;
    }

    // Factory method to create from User entity
    public static SignUpResponse fromUser(LMS.project.modal.User user, String token) {
        return new SignUpResponse(
                user.getUserId(),
                user.getName(),
                user.getDob(),
                user.getGender(),
                user.getRole(),
                user.getEmail(),
                user.getCreatedAt(),
                token
        );
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "UserResponseDTO{" +
                "userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", dob=" + dob +
                ", gender='" + gender + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}