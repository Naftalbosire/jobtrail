package com.jobtrail.Jobtrail.service;

import com.jobtrail.Jobtrail.dto.AuthResponse;
import com.jobtrail.Jobtrail.dto.LoginRequest;
import com.jobtrail.Jobtrail.dto.RegisterRequest;
import com.jobtrail.Jobtrail.dto.UserDto;
import com.jobtrail.Jobtrail.entity.User;
import com.jobtrail.Jobtrail.repository.UserRepository;
import com.jobtrail.Jobtrail.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()).isPresent())
            throw new RuntimeException("Email already in use");
        User user = User.builder()
            .name(req.getName()).email(req.getEmail())
            .password(encoder.encode(req.getPassword())).build();
        userRepo.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, new UserDto(user.getId(), user.getName(), user.getEmail()));
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!encoder.matches(req.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, new UserDto(user.getId(), user.getName(), user.getEmail()));
    }
}