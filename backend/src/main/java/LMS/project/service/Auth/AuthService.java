package LMS.project.service.Auth;

import LMS.project.dto.Auth.*;


public interface AuthService {
    public SignUpResponse signUp(SignUpRequest signUpRequest);

    public SignInResponse signIn(SignInRequest signInRequest);

    public GetUserResponse getUser(String token);

    public SignInGoogleResponse signInGoogle(SignInGoogleRequest signInGoogleRequest);



}
