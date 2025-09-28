package LMS.project.modal;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "email_otp", indexes = @Index(name="idx_email", columnList="email"))
public class EmailOtp {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String email;

    @Column(nullable=false, length=80)
    private String codeHash;

    @Column(nullable=false)
    private Instant expiresAt;

    @Column(nullable=false)
    private int attempts = 0;

    @Column(nullable=false)
    private boolean used = false;

    // getters/setters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCodeHash() { return codeHash; }
    public void setCodeHash(String codeHash) { this.codeHash = codeHash; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
    public int getAttempts() { return attempts; }
    public void setAttempts(int attempts) { this.attempts = attempts; }
    public boolean isUsed() { return used; }
    public void setUsed(boolean used) { this.used = used; }
}