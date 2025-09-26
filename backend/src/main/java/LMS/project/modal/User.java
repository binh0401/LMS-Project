package LMS.project.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "userID", nullable = false, length = 36)
    private String userId;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(length = 50, nullable = true)
    private String gender;

    @Column(length = 50, nullable = false)
    private String role;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String hashedPassword;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private boolean profileCompleted = true; //Set true by default, false when use 3rd party to sign in/sign up

    // --- Constructors ---
    public User() {}

    public User(String userId, String name, LocalDate dob, String gender,
                String role, String email, String hashedPassword) {
        this.userId = userId;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.role = role;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }

    // --- Getters and Setters ---
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHashedPassword() { return hashedPassword; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public boolean getProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }
}
