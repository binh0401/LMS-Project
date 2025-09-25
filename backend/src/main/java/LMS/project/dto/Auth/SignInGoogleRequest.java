package LMS.project.dto.Auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SignInGoogleRequest {

    @JsonProperty("code")
    private String code;

    // Default constructor
    public SignInGoogleRequest() {}

    // Constructor
    public SignInGoogleRequest(String code) {
        this.code = code;
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "GoogleAuthRequest{" +
                "code='" + code + '\'' +
                '}';
    }
}
