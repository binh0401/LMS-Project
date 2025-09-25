package LMS.project.service.Auth;

import LMS.project.dto.Auth.*;
import LMS.project.exception.BadRequestException;
import LMS.project.exception.UnauthorizedException;
import LMS.project.modal.User;
import LMS.project.repository.UserRepository;
import LMS.project.security.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("google_oauth_client_id")
    private String clientId;

    @Value("google_oauth_client_secret")
    private String clientSecret;

    GoogleIdTokenVerifier googleIdTokenVerifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            GsonFactory.getDefaultInstance()
    ).setAudience(Collections.singletonList(clientId)).build();


    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest){
        //check if user's email exists
        if(userRepository.existsByEmail(signUpRequest.getEmail())){
            throw new BadRequestException("Email already exists");
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
        System.out.println(userId);
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

        System.out.println("Response in getuser():" + response);
        return response;
    }

    @Override
    public SignInGoogleResponse signInGoogle(SignInGoogleRequest signInGoogleRequest){
        try{
            //Send Request to Google to exchange code for token
            GoogleTokenResponse request = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance(),
                    "https://oauth2.googleapis.com/token",
                    clientId,
                    clientSecret,
                    signInGoogleRequest.getCode(),
                    "http://localhost:5173"
            ).execute();

            System.out.println(request);
            String idToken = request.getIdToken();

            //Verify idToken
            GoogleIdToken verifiedToken = googleIdTokenVerifier.verify(idToken);

            if(verifiedToken == null){
                throw new RuntimeException("Invalid Id token");
            }

            GoogleIdToken.Payload payload = verifiedToken.getPayload();
            System.out.println("Id token payload"+ payload);





        }catch (GeneralSecurityException | IOException e){
            throw new RuntimeException("Failed to exchange code with Google", e);
        }

        return new SignInGoogleResponse();



    }
}
