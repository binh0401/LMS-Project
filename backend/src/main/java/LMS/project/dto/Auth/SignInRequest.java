package LMS.project.dto.Auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class SignInRequest {

    @NotBlank(message = "Please enter valid email.")
    @Email(message = "Invalid email format.")
    private String email;

    @NotBlank(message = "Please enter your password.")
    private String password;

    @JsonProperty("signInAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime signInAt;

    //  Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setGmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getSignInAt() {
        return signInAt;
    }

    public void setSignInAt(LocalDateTime signInAt) {
        this.signInAt = signInAt;
    }

}
