package com.capitec.booking.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${JWT_SECRET:}")
    private String jwtSecretEnv;

    private Key key;
    private final long expirationMs = 1000L * 60 * 60 * 8; // 8 hours

    @PostConstruct
    public void init() {
        if (jwtSecretEnv != null && !jwtSecretEnv.isBlank()) {
            byte[] keyBytes;
            try {
                // try Base64 first (common)
                keyBytes = Base64.getDecoder().decode(jwtSecretEnv);
            } catch (IllegalArgumentException ex) {
                // not base64 -> use raw bytes
                keyBytes = jwtSecretEnv.getBytes();
            }

            try {
                this.key = Keys.hmacShaKeyFor(keyBytes);
                return;
            } catch (WeakKeyException e) {
                System.err.println("Provided JWT_SECRET is too weak (must be >= 256 bits). Falling back to a generated secure key. Set a stronger JWT_SECRET in env.");
            }
        } else {
            System.err.println("JWT_SECRET not set. Generating a temporary random key. For persistence set JWT_SECRET env var.");
        }

        // fallback secure random key (suitable for HS256)
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}