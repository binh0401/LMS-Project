package LMS.project.controller;

import LMS.project.service.AuthService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1")
public class AuthController {
    @Autowired
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (AuthService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }
        User saved = AuthService.addUser(user);
        return ResponseEntity.ok(saved);
    }
}
