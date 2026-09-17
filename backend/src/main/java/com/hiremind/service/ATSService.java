package com.hiremind.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hiremind.dto.ATSResultResponse;
import com.hiremind.exception.ResourceNotFoundException;
import com.hiremind.model.ATSResult;
import com.hiremind.model.User;
import com.hiremind.repository.ATSResultRepository;
import com.hiremind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ATSService {

    private final ATSResultRepository atsResultRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

    public ATSResultResponse analyzeResume(MultipartFile file, Long userId) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Save file
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
        String filename = userId + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.write(filePath, file.getBytes());

        // Mock AI analysis
        ATSResultResponse response = mockAIAnalysis(userId);

        // Persist result
        ATSResult result = new ATSResult();
        result.setUser(user);
        result.setOverallScore(response.getOverallScore());
        result.setKeywordsScore(response.getKeywordsScore());
        result.setFormatScore(response.getFormatScore());
        result.setSkillsScore(response.getSkillsScore());
        result.setExperienceScore(response.getExperienceScore());
        result.setMissingKeywords(response.getMissingKeywords());
        result.setImprovementTips(response.getImprovementTips());
        result.setSectionFeedback(response.getSectionFeedback());
        result.setCreatedAt(LocalDateTime.now());
        ATSResult saved = atsResultRepository.save(result);
        response.setId(saved.getId());
        return response;
    }

    private ATSResultResponse mockAIAnalysis(Long userId) {
        Random rand = new Random();
        int overall    = 65 + rand.nextInt(20);
        int keywords   = 60 + rand.nextInt(20);
        int format     = 70 + rand.nextInt(20);
        int skills     = 60 + rand.nextInt(20);
        int experience = 65 + rand.nextInt(20);

        List<String> allKeywords = new ArrayList<>(Arrays.asList(
                "Docker", "Kubernetes", "CI/CD", "System Design",
                "Microservices", "GraphQL", "Redis", "AWS", "Terraform", "React Native"));
        Collections.shuffle(allKeywords);
        List<String> missing = allKeywords.subList(0, 3 + rand.nextInt(3));

        List<String> tips = Arrays.asList(
                "Add a professional summary section at the top of your resume.",
                "Quantify your achievements with metrics (e.g., 'Improved page load time by 40%').",
                "Include relevant certifications and online courses.",
                "Tailor your skills section to match the target job description.",
                "Use strong action verbs to start each bullet point (e.g., Built, Led, Optimized)."
        );

        Map<String, Boolean> sections = new LinkedHashMap<>();
        sections.put("Contact", true);
        sections.put("Summary", rand.nextBoolean());
        sections.put("Experience", true);
        sections.put("Skills", true);
        sections.put("Education", true);

        try {
            return ATSResultResponse.builder()
                    .userId(userId)
                    .overallScore(overall)
                    .keywordsScore(keywords)
                    .formatScore(format)
                    .skillsScore(skills)
                    .experienceScore(experience)
                    .missingKeywords(objectMapper.writeValueAsString(missing))
                    .improvementTips(objectMapper.writeValueAsString(tips))
                    .sectionFeedback(objectMapper.writeValueAsString(sections))
                    .createdAt(LocalDateTime.now())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Error generating ATS analysis", e);
        }
    }

    public List<ATSResultResponse> getATSResultsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return atsResultRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(r -> ATSResultResponse.builder()
                        .id(r.getId())
                        .userId(r.getUser().getId())
                        .overallScore(r.getOverallScore())
                        .keywordsScore(r.getKeywordsScore())
                        .formatScore(r.getFormatScore())
                        .skillsScore(r.getSkillsScore())
                        .experienceScore(r.getExperienceScore())
                        .missingKeywords(r.getMissingKeywords())
                        .improvementTips(r.getImprovementTips())
                        .sectionFeedback(r.getSectionFeedback())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
