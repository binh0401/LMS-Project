# Google OAuth Backend API Requirements

This document outlines the backend API endpoints and implementation requirements for Google OAuth integration.

## Required Backend Endpoints

### 1. Google Sign-In Endpoint

```
POST /auth/google/signin
```

**Request Body:**

```json
{
  "token": "google-jwt-token-here"
}
```

**Response (Success - 200):**

```json
{
  "token": "your-jwt-token",
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "userId": "user-id-here",
  "role": "user",
  "gender": "male",
  "dob": "1990-01-01",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Response (Error - 400/401):**

```json
{
  "message": "Invalid Google token"
}
```

### 2. Google Sign-Up Endpoint

```
POST /auth/google/signup
```

**Request Body:**

```json
{
  "token": "google-jwt-token-here",
  "role": "user",
  "gender": "male"
}
```

**Response (Success - 201):**

```json
{
  "token": "your-jwt-token",
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "userId": "user-id-here",
  "role": "user",
  "gender": "male",
  "dob": "1990-01-01",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Response (Error - 400/409):**

```json
{
  "message": "User already exists" // or other error message
}
```

## Backend Implementation Steps

### 1. Install Required Dependencies

For Spring Boot (Java):

```xml
<dependency>
    <groupId>com.google.api-client</groupId>
    <artifactId>google-api-client</artifactId>
    <version>2.0.0</version>
</dependency>
<dependency>
    <groupId>com.google.auth</groupId>
    <artifactId>google-auth-library-oauth2-http</artifactId>
    <version>1.19.0</version>
</dependency>
```

For Node.js/Express:

```bash
npm install google-auth-library
```

### 2. Google Token Verification

You need to verify the Google JWT token on the backend. Here's how:

#### Java (Spring Boot) Example:

```java
@Service
public class GoogleAuthService {

    private static final String GOOGLE_CLIENT_ID = "your-google-client-id";

    public GoogleIdToken verifyToken(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance()
            )
            .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
            .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                return idToken;
            } else {
                throw new RuntimeException("Invalid ID token.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Token verification failed: " + e.getMessage());
        }
    }

    public UserInfo extractUserInfo(GoogleIdToken idToken) {
        Payload payload = idToken.getPayload();

        return UserInfo.builder()
            .email(payload.getEmail())
            .name((String) payload.get("name"))
            .picture((String) payload.get("picture"))
            .emailVerified(payload.getEmailVerified())
            .build();
    }
}
```

#### Node.js/Express Example:

```javascript
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified,
    };
  } catch (error) {
    throw new Error("Invalid token: " + error.message);
  }
}
```

### 3. Database Schema Updates

Ensure your user table can handle Google OAuth users:

```sql
-- Add columns for Google OAuth (if not already present)
ALTER TABLE users ADD COLUMN google_id VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN provider VARCHAR(50) DEFAULT 'local';
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);

-- Create index for faster lookups
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_provider ON users(provider);
```

### 4. Controller Implementation

#### Java (Spring Boot) Example:

```java
@RestController
@RequestMapping("/auth")
public class GoogleAuthController {

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private UserService userService;

    @PostMapping("/google/signin")
    public ResponseEntity<?> googleSignIn(@RequestBody GoogleSignInRequest request) {
        try {
            // Verify Google token
            GoogleIdToken idToken = googleAuthService.verifyToken(request.getToken());
            UserInfo userInfo = googleAuthService.extractUserInfo(idToken);

            // Find or create user
            User user = userService.findByEmail(userInfo.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found. Please sign up first."));

            // Generate JWT token
            String jwtToken = jwtService.generateToken(user);

            return ResponseEntity.ok(new AuthResponse(jwtToken, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/google/signup")
    public ResponseEntity<?> googleSignUp(@RequestBody GoogleSignUpRequest request) {
        try {
            // Verify Google token
            GoogleIdToken idToken = googleAuthService.verifyToken(request.getToken());
            UserInfo userInfo = googleAuthService.extractUserInfo(idToken);

            // Check if user already exists
            if (userService.findByEmail(userInfo.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("User already exists"));
            }

            // Create new user
            User user = userService.createGoogleUser(userInfo, request.getRole(), request.getGender());

            // Generate JWT token
            String jwtToken = jwtService.generateToken(user);

            return ResponseEntity.status(201).body(new AuthResponse(jwtToken, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
```

### 5. Environment Variables

Add these to your backend environment:

```env
GOOGLE_CLIENT_ID=your-google-client-id-here
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=86400000
```

## Security Considerations

1. **Token Verification**: Always verify Google tokens on the backend
2. **Rate Limiting**: Implement rate limiting for OAuth endpoints
3. **CORS**: Configure CORS properly for your frontend domain
4. **HTTPS**: Use HTTPS in production
5. **Client ID Validation**: Validate the audience in the Google token

## Testing

1. Test with valid Google tokens
2. Test with invalid/expired tokens
3. Test user creation and login flows
4. Test error handling scenarios

## Frontend Configuration

Make sure to set the Google Client ID in your frontend environment:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

The frontend will automatically use this environment variable for Google OAuth initialization.
