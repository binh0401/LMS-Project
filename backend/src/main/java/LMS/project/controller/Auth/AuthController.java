package LMS.project.controller.Auth;

import LMS.project.dto.Auth.SignInRequest;
import LMS.project.dto.Auth.SignInResponse;
import LMS.project.dto.Auth.SignUpRequest;
import LMS.project.dto.Auth.SignUpResponse;
import LMS.project.service.Auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signup(@RequestBody SignUpRequest request) throws Exception {
        SignUpResponse response = authService.signUp(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest request) throws Exception{
        SignInResponse response = authService.signIn(request);

        return ResponseEntity.ok(response);
    }
}
