package LMS.project.service;

import LMS.project.dto.SignUpRequest;
import LMS.project.dto.SignUpResponse;
import LMS.project.modal.User;
import LMS.project.repository.UserRepository;
import LMS.project.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest){
        //check if user's email exists
        if(userRepository.existsByEmail(signUpRequest.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        //Save user's data into DB
        User user = new User();
        user.setUserId(java.util.UUID.randomUUID().toString());
        user.setName(signUpRequest.getName());
        user.setDob(signUpRequest.getDob());
        user.setGender(signUpRequest.getGender());
        user.setRole(signUpRequest.getRole());
        user.setEmail(signUpRequest.getEmail());
        user.setHashedPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getRole());

        return SignUpResponse.fromUser(user, token);
    }
}
