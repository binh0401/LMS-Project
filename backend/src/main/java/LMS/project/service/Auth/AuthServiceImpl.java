package LMS.project.service.Auth;

import LMS.project.dto.Auth.*;
import LMS.project.exception.BadRequestException;
import LMS.project.exception.UnauthorizedException;
import LMS.project.modal.User;
import LMS.project.modal.EmailOtp;
import LMS.project.repository.UserRepository;
import LMS.project.repository.EmailOtpRepository;
import LMS.project.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private  OtpService service;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailOtpRepository emailOtpRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    public void  signUp(SignUpRequest signUpRequest){
        //check if user's email exists
        if(userRepository.existsByEmail(signUpRequest.getEmail())){
            throw new BadRequestException("Email already exists");
        }
        service.sendOtpToEmail(signUpRequest.getEmail());
    }

    @Override
    public SignInResponse signIn(SignInRequest signInRequest){
        String email = signInRequest.getEmail();

        //check if user's email exists
        if (!userRepository.existsByEmail(email)){
            throw new BadRequestException("Invalid email");
        }

        User user = userRepository.findByEmail(email);

        //check if user enter right password
        if (!passwordEncoder.matches(signInRequest.getPassword(), user.getHashedPassword())) {
            throw new UnauthorizedException("Invalid password");
        }
        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getRole());

        return SignInResponse.fromUser(user, token);

    }

    @Override
    public GetUserResponse getUser(String token) {
        //If invalid token
        if (!jwtUtil.validateToken(token)) {
            System.out.println("Unauthorized");
            throw new UnauthorizedException("Invalid or expired token");
        }

        String userId = jwtUtil.extractUserId(token);
        // Or extractEmail(...) if that’s your subject — adjust to your JwtUtil
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        GetUserResponse response = new GetUserResponse(
                user.getName(),
                user.getDob(),
                user.getGender(),
                user.getRole(),
                user.getEmail(),
                user.getUserId()
        );
        return response;
    }

    @Override
    public SignUpResponse verify(SignUpRequest signUpRequest, String email, String submittedCode) {
        // Find the OTP record for this email
        var otpRecord = emailOtpRepository.findTopByEmailAndUsedIsFalseOrderByIdDesc(email);
        
        if (otpRecord.isEmpty()) {
            throw new UnauthorizedException("No OTP found for this email");
        }
        
        EmailOtp otp = otpRecord.get();
        
        // Check if OTP is expired
        if (otp.getExpiresAt().isBefore(java.time.Instant.now())) {
            throw new UnauthorizedException("OTP has expired");
        }
        
        // Check attempt limit
        if (otp.getAttempts() >= 5) {
            throw new UnauthorizedException("Too many attempts. Please request a new OTP");
        }
        
        // Verify the submitted code against the hash
        boolean isValid = BCrypt.checkpw(submittedCode, otp.getCodeHash());
        
        if (!isValid) {
            // Increment attempts on failure
            otp.setAttempts(otp.getAttempts() + 1);
            emailOtpRepository.save(otp);
            throw new UnauthorizedException("Invalid OTP code");
        }
        
        // Mark OTP as used
        otp.setUsed(true);
        emailOtpRepository.save(otp);
        
        // Create user after OTP validation succeeds
        User user = new User();
        user.setUserId(java.util.UUID.randomUUID().toString());
        user.setName(signUpRequest.getName());
        user.setDob(signUpRequest.getDob());
        user.setGender(signUpRequest.getGender());
        user.setRole(signUpRequest.getRole());
        user.setEmail(signUpRequest.getEmail());
        user.setHashedPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getRole());
        
        // Return SignUpResponse with token
        return SignUpResponse.fromUser(user, token);
    }
}
