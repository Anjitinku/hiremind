package com.hiremind.service;
import com.hiremind.dto.ProfileRequest;
import com.hiremind.dto.ProfileResponse;
import com.hiremind.dto.RegisterRequest;
import com.hiremind.model.Profile;
import com.hiremind.model.User;
import com.hiremind.repository.ProfileRepository;
import com.hiremind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void seedAdmin() {
        if (userRepository.findByEmail("admin@hiremind.ai").isEmpty()) {
            User admin = User.builder()
                    .name("Site Administrator")
                    .email("admin@hiremind.ai")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(com.hiremind.model.Role.ADMIN)
                    .enabled(true)
                    .build();
            User saved = userRepository.save(admin);
            Profile profile = Profile.builder().user(saved).bio("System Administrator for HireMind AI platform").title("Administrator").build();
            profileRepository.save(profile);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPasswordHash(), new ArrayList<>());
    }

    public User registerUser(RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        User savedUser = userRepository.save(user);
        Profile profile = Profile.builder().user(savedUser).build();
        profileRepository.save(profile);
        return savedUser;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ProfileResponse getProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findByUser(user).orElse(Profile.builder().user(user).build());
        return ProfileResponse.builder()
                .id(profile.getId())
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .bio(profile.getBio())
                .title(profile.getTitle())
                .location(profile.getLocation())
                .phone(profile.getPhone())
                .linkedinUrl(profile.getLinkedinUrl())
                .githubUrl(profile.getGithubUrl())
                .skills(profile.getSkills())
                .resumeUrl(profile.getResumeUrl())
                .avatarUrl(profile.getAvatarUrl())
                .yearsOfExperience(profile.getYearsOfExperience())
                .build();
    }

    public ProfileResponse updateProfile(Long userId, ProfileRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findByUser(user).orElse(Profile.builder().user(user).build());
        profile.setBio(request.getBio());
        profile.setTitle(request.getTitle());
        profile.setLocation(request.getLocation());
        profile.setPhone(request.getPhone());
        profile.setLinkedinUrl(request.getLinkedinUrl());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setSkills(request.getSkills());
        profile.setYearsOfExperience(request.getYearsOfExperience());
        profileRepository.save(profile);
        return getProfile(userId);
    }
}
