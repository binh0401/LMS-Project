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

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${google_oauth_client_id}")
    private String clientId;

    @Value("${google_oauth_client_secret}")
    private String clientSecret;

    private GoogleIdTokenVerifier googleIdTokenVerifier;

    @PostConstruct //Must have this function to create googleIdTokenVerifier ONLY AFTER @Values are injected
    public void GoogleVeriferInit(){
        //Must use this (or no this, just googleIdTokenVerifer) to mention the property, not creating a variable local to Init function
        this.googleIdTokenVerifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        ).setAudience(Collections.singletonList(clientId)).build();

        System.out.println("GoogleIdTokenVerifier initialized with audience: " + clientId);
    }

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

        return new GetUserResponse(
                user.getName(),
                user.getDob(),
                user.getGender(),
                user.getRole(),
                user.getEmail(),
                user.getUserId()
        );
    }

    @Override
    public SignInGoogleResponse signInGoogle(SignInGoogleRequest signInGoogleRequest){
        try{
            System.out.println("Debug 1, code from frontend: " + signInGoogleRequest.getCode());

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

            System.out.println("Debug 2" + request);

            String idToken = request.getIdToken();

            GoogleIdToken rawToken = GoogleIdToken.parse(GsonFactory.getDefaultInstance(), idToken);
            System.out.println("Raw token audience: " + rawToken.getPayload().getAudience());
            System.out.println("Expected clientId: " + clientId);

            System.out.println("Debug 3 idToken: " + idToken);

            //Verify idToken
            GoogleIdToken verifiedToken = googleIdTokenVerifier.verify(idToken);

            System.out.println("Debug 4: Verfied Token info"+verifiedToken);

            if(verifiedToken == null){
                throw new RuntimeException("Invalid Id token");
            }

            GoogleIdToken.Payload payload = verifiedToken.getPayload();
            System.out.println("Debug 5: Id token payload"+ payload);

            //Extract user's info from payload
            String email = payload.getEmail();
            String name = payload.get("name").toString();

            System.out.println("Extracted user info - Email:" + email + ", Name: " + name);

            //Find existing user by extracted email, Option<User> to handle null safely
            boolean existingUser = userRepository.existsByEmail(email);

            User user; //Init a variable type class User
            if(existingUser){

                user = userRepository.findByEmail(email);
                System.out.println("Existing User found:" + user);
            }else{
                //Create new user and store into DB
                user = new User();
                user.setUserId(java.util.UUID.randomUUID().toString());
                user.setName(name);
                user.setDob(LocalDate.of(1900,1,1));
                user.setGender(null);
                user.setRole("user");
                user.setEmail(email);
                user.setHashedPassword(passwordEncoder.encode(jwtUtil.generateDummyPassword()));
                user.setProfileCompleted(false);
                userRepository.save(user);
            }
            //Generate a token to give back to user
            String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getRole());
            return SignInGoogleResponse.fromUser(user, token);
        }catch (GeneralSecurityException | IOException e){
            throw new RuntimeException("Failed to exchange code with Google", e);
        }

    }
}
