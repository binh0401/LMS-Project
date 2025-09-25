package LMS.project.dto.Auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class SignInGoogleResponse {

    @JsonProperty("userId")
    private String userId;

    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String gender;

    private String role;

    private String email;

    @JsonProperty("signInAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime signInAt;

    private String token;

    // Default constructor
    public SignInGoogleResponse() {
    }

    // Constructor
    public SignInGoogleResponse(String userId, String name, LocalDate dob, String gender,
                          String role, String email, String token) {
        this.userId = userId;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.role = role;
        this.email = email;
        this.signInAt = LocalDateTime.now();
        this.token = token;
    }

    // Factory method to create from User entity
    public static SignInResponse fromUser(LMS.project.modal.User user, String token) {
        return new SignInResponse(
                user.getUserId(),
                user.getName(),
                user.getDob(),
                user.getGender(),
                user.getRole(),
                user.getEmail(),
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

    public LocalDateTime getSignInAt() {
        return signInAt;
    }

    public void setSignInAt(LocalDateTime signInAt) {
        this.signInAt = signInAt;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "SignInResponseDTO{" +
                "userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", dob=" + dob +
                ", gender='" + gender + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", createdAt=" + signInAt +
                '}';
    }
}

