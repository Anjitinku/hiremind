package com.hiremind.service;
import com.hiremind.dto.AuthRequest;
import com.hiremind.dto.AuthResponse;
import com.hiremind.dto.RegisterRequest;
import com.hiremind.repository.UserRepository;
import com.hiremind.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        var user = userService.registerUser(request);
        var userDetails = userService.loadUserByUsername(user.getEmail());
        var token = jwtUtil.generateToken(userDetails);
        return AuthResponse.builder().token(token).user(user).build();
    }

    public AuthResponse login(AuthRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        // Fallback admin login: allow hard‑coded admin credentials for demo purposes
        if (email.equalsIgnoreCase("admin@hiremind.ai") && request.getPassword().equals("admin123")) {
            // Ensure admin user exists (seeded or create on the fly)
            var adminUser = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(com.hiremind.model.User.builder()
                    .name("Site Administrator")
                    .email(email)
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(com.hiremind.model.Role.ADMIN)
                    .build()));
            var adminDetails = userService.loadUserByUsername(email);
            var token = jwtUtil.generateToken(adminDetails);
            return AuthResponse.builder().token(token).user(adminUser).build();
        }

        var userDetails = userService.loadUserByUsername(email);
        var token = jwtUtil.generateToken(userDetails);
        var user = userRepository.findByEmail(email).orElseThrow();
        return AuthResponse.builder().token(token).user(user).build();
    }
}
