package LMS.project.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Date;

@Component
public class JwtUtil {
    private final JwtConfig jwtConfig;

    public JwtUtil(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    /** One consistent key for sign & parse */
    private SecretKey key() {
        byte[] raw = jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8);
        if (raw.length < 32) {
            try {
                raw = Arrays.copyOf(MessageDigest.getInstance("SHA-256").digest(raw), 32);
            } catch (NoSuchAlgorithmException e) {
                throw new IllegalStateException("SHA-256 not available", e);
            }
        }
        return Keys.hmacShaKeyFor(raw);
    }

    public String generateToken(String userId, String email, String role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtConfig.getExpiration());
        return Jwts.builder()
                .setSubject(userId)
                .claim("email", email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key())                 // ← same key
                    .setAllowedClockSkewSeconds(60)       // optional
                    .build()
                    .parseClaimsJws(token);               // throws if invalid/expired
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String extractUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())                 // ← same key
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}

/*

        TODO: code cu, check xem sao deo chay

package LMS.project.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Arrays;

@Component
public class JwtUtil {
    private final JwtConfig jwtConfig;

    public JwtUtil(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String generateToken(String userId, String email, String role) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("email", email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpiration()))
                .signWith(Keys.hmacShaKeyFor(deriveHmacKey(jwtConfig.getSecret())), SignatureAlgorithm.HS256)
                .compact();
    }

    private byte[] deriveHmacKey(String secret) {
        byte[] raw = secret.getBytes(StandardCharsets.UTF_8);
        if (raw.length >= 32) {
            return raw;
        }
        try {
            byte[] sha256 = MessageDigest.getInstance("SHA-256").digest(raw);
            return Arrays.copyOf(sha256, 32);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available for key derivation", e);
        }
    }


    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getExpiration() == null || claims.getExpiration().after(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String extractUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
*/


