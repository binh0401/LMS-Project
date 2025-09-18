package LMS.project.service;

import LMS.project.dto.SignUpRequest;
import LMS.project.dto.SignUpResponse;


public interface AuthService {
    public SignUpResponse signUp(SignUpRequest signUpRequest);

}
