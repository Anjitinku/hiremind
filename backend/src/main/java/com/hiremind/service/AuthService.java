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

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        var user = userService.registerUser(request);
        var userDetails = userService.loadUserByUsername(user.getEmail());
        var token = jwtUtil.generateToken(userDetails);
        return AuthResponse.builder().token(token).user(user).build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var userDetails = userService.loadUserByUsername(request.getEmail());
        var token = jwtUtil.generateToken(userDetails);
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return AuthResponse.builder().token(token).user(user).build();
    }
}
