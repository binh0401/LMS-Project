package LMS.project.controller;

import LMS.project.dto.SignUpRequest;
import LMS.project.dto.SignUpResponse;
import LMS.project.modal.User;
import LMS.project.service.AuthService;
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
        System.out.println("Hello");
        SignUpResponse response = authService.signUp(request);

        return ResponseEntity.ok(response);
    }
}
