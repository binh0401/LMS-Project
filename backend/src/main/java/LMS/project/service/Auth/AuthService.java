package LMS.project.service.Auth;

import LMS.project.dto.Auth.*;


public interface AuthService {
    public void signUp(SignUpRequest signUpRequest);

    public SignInResponse signIn(SignInRequest signInRequest);

    public GetUserResponse getUser(String token);

    public SignUpResponse verify(SignUpRequest signUpRequest, String email, String submittedCode);
}
