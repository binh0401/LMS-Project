package LMS.project.controller.Auth;

import LMS.project.dto.Auth.*;
import LMS.project.exception.UnauthorizedException;
import LMS.project.service.Auth.AuthService;
import LMS.project.service.Auth.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody SignUpRequest request) throws Exception {
        authService.signUp(request);

        return ResponseEntity.accepted().build();
    }
    @PostMapping("/verify")
    public ResponseEntity<SignUpResponse> verify(@RequestBody SignUpRequest request) throws Exception {
        SignUpResponse response = authService.verify(request, request.getEmail(), request.getOtpCode());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest request) throws Exception{
        SignInResponse response = authService.signIn(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-user")

    public ResponseEntity<GetUserResponse> getUser(
            @RequestHeader(name = "Authorization", required = true) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }

        System.out.println(authHeader);
        String token = authHeader.substring(7);


        GetUserResponse response = authService.getUser(token);
        return ResponseEntity.ok(response);
    }
}

