package LMS.project.service.Auth;

import LMS.project.dto.Auth.SignInRequest;
import LMS.project.dto.Auth.SignInResponse;
import LMS.project.dto.Auth.SignUpRequest;
import LMS.project.dto.Auth.SignUpResponse;


public interface AuthService {
    public SignUpResponse signUp(SignUpRequest signUpRequest);

    public SignInResponse signIn(SignInRequest signInRequest);
}
