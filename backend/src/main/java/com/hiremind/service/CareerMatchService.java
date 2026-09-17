package com.hiremind.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hiremind.dto.CareerMatchResponse;
import com.hiremind.exception.ResourceNotFoundException;
import com.hiremind.model.ATSResult;
import com.hiremind.model.CareerMatch;
import com.hiremind.model.InterviewSession;
import com.hiremind.model.User;
import com.hiremind.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CareerMatchService {

    private final CareerMatchRepository careerMatchRepository;
    private final ATSResultRepository atsResultRepository;
    private final InterviewSessionRepository interviewSessionRepository;
    private final CodingSubmissionRepository codingSubmissionRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public CareerMatchResponse computeCareerMatch(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Latest ATS score
        List<ATSResult> atsResults = atsResultRepository.findByUserOrderByCreatedAtDesc(user);
        int atsScore = atsResults.isEmpty() ? 60 : atsResults.get(0).getOverallScore();

        // Latest Interview score
        List<InterviewSession> sessions = interviewSessionRepository.findByUserOrderByCompletedAtDesc(user);
        int interviewScore = sessions.isEmpty() ? 60 : sessions.get(0).getOverallScore();

        // Coding score: % of passed submissions * 100
        List<com.hiremind.model.CodingSubmission> submissions = codingSubmissionRepository.findByUser(user);
        int codingScore = 60;
        if (!submissions.isEmpty()) {
            long passed = submissions.stream().filter(com.hiremind.model.CodingSubmission::isPassed).count();
            codingScore = (int) Math.round((double) passed / submissions.size() * 100);
        }

        int combined = (int) Math.round(atsScore * 0.30 + interviewScore * 0.40 + codingScore * 0.30);

        List<Map<String, Object>> companies = getMatchedCompanies(combined);
        List<Map<String, Object>> skills = getSkillsToLearn();
        long[] salary = getSalaryRange(combined);

        try {
            String companiesJson = objectMapper.writeValueAsString(companies);
            String skillsJson = objectMapper.writeValueAsString(skills);

            CareerMatch match = careerMatchRepository.findByUser(user).orElse(new CareerMatch());
            match.setUser(user);
            match.setCombinedScore(combined);
            match.setMatchedCompaniesJson(companiesJson);
            match.setSkillsToLearnJson(skillsJson);
            match.setSalaryMin(salary[0]);
            match.setSalaryMax(salary[1]);
            match.setUpdatedAt(LocalDateTime.now());
            careerMatchRepository.save(match);

            return CareerMatchResponse.builder()
                    .userId(userId)
                    .combinedScore(combined)
                    .matchedCompanies(companiesJson)
                    .skillsToLearn(skillsJson)
                    .salaryMin(salary[0])
                    .salaryMax(salary[1])
                    .updatedAt(match.getUpdatedAt())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Error computing career match", e);
        }
    }

    public CareerMatchResponse getCareerMatch(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Optional<CareerMatch> existing = careerMatchRepository.findByUser(user);
        if (existing.isPresent()) {
            CareerMatch m = existing.get();
            return CareerMatchResponse.builder()
                    .userId(userId)
                    .combinedScore(m.getCombinedScore())
                    .matchedCompanies(m.getMatchedCompaniesJson())
                    .skillsToLearn(m.getSkillsToLearnJson())
                    .salaryMin(m.getSalaryMin())
                    .salaryMax(m.getSalaryMax())
                    .updatedAt(m.getUpdatedAt())
                    .build();
        }
        return computeCareerMatch(userId);
    }

    private List<Map<String, Object>> getMatchedCompanies(int score) {
        List<Map<String, Object>> list = new ArrayList<>();
        if (score >= 80) {
            list.add(company("Google", 92, "Software Engineer", 180000, 250000));
            list.add(company("Meta", 88, "Full Stack Engineer", 170000, 240000));
            list.add(company("Amazon", 85, "SDE II", 150000, 220000));
            list.add(company("Stripe", 82, "Backend Engineer", 160000, 230000));
        } else if (score >= 60) {
            list.add(company("Stripe", 79, "Frontend Engineer", 140000, 200000));
            list.add(company("Airbnb", 75, "Full Stack Developer", 135000, 195000));
            list.add(company("Shopify", 72, "React Developer", 120000, 180000));
            list.add(company("Notion", 70, "Software Engineer", 115000, 175000));
        } else {
            list.add(company("TechStartup A", 65, "Junior Developer", 80000, 110000));
            list.add(company("GrowthCo", 60, "Full Stack Engineer", 75000, 100000));
        }
        return list;
    }

    private Map<String, Object> company(String name, int match, String role, long salMin, long salMax) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("name", name); m.put("matchPct", match);
        m.put("role", role); m.put("salaryMin", salMin); m.put("salaryMax", salMax);
        return m;
    }

    private List<Map<String, Object>> getSkillsToLearn() {
        List<Map<String, Object>> list = new ArrayList<>();
        String[][] skills = {{"Docker", "95"}, {"System Design", "88"}, {"TypeScript Advanced", "82"},
                {"CI/CD Pipelines", "79"}, {"AWS Cloud Basics", "74"}, {"GraphQL", "68"}};
        for (String[] s : skills) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("skill", s[0]); m.put("relevance", Integer.parseInt(s[1]));
            list.add(m);
        }
        return list;
    }

    private long[] getSalaryRange(int score) {
        if (score >= 80) return new long[]{130000, 200000};
        if (score >= 60) return new long[]{95000, 130000};
        return new long[]{65000, 95000};
    }
}
