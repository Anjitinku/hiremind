package com.hiremind.service;

import com.hiremind.dto.ApplicationResponse;
import com.hiremind.dto.JobRequest;
import com.hiremind.dto.JobResponse;
import com.hiremind.exception.ResourceNotFoundException;
import com.hiremind.model.Application;
import com.hiremind.model.Job;
import com.hiremind.model.User;
import com.hiremind.repository.ApplicationRepository;
import com.hiremind.repository.JobRepository;
import com.hiremind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public List<JobResponse> getAllJobs(String search, String location, String type) {
        List<Job> jobs = jobRepository.findByIsActiveTrue();
        return jobs.stream()
                .filter(j -> search == null || j.getTitle().toLowerCase().contains(search.toLowerCase())
                        || j.getCompany().toLowerCase().contains(search.toLowerCase()))
                .filter(j -> location == null || (j.getLocation() != null && j.getLocation().toLowerCase().contains(location.toLowerCase())))
                .filter(j -> type == null || (j.getJobType() != null && j.getJobType().toString().equalsIgnoreCase(type)))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return toResponse(job);
    }

    public JobResponse createJob(JobRequest req, Long recruiterId) {
        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Job job = new Job();
        job.setTitle(req.getTitle());
        job.setCompany(req.getCompany());
        job.setDescription(req.getDescription());
        job.setLocation(req.getLocation());
        job.setJobType(req.getJobType() != null ? Job.JobType.valueOf(req.getJobType()) : Job.JobType.FULL_TIME);
        job.setSalaryMin(req.getSalaryMin());
        job.setSalaryMax(req.getSalaryMax());
        job.setSkillsRequired(req.getSkillsRequired());
        job.setPostedBy(recruiter);
        job.setActive(true);
        job.setCreatedAt(LocalDateTime.now());
        return toResponse(jobRepository.save(job));
    }

    public JobResponse updateJob(Long jobId, JobRequest req, Long recruiterId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        job.setTitle(req.getTitle());
        job.setCompany(req.getCompany());
        job.setDescription(req.getDescription());
        job.setLocation(req.getLocation());
        if (req.getJobType() != null) job.setJobType(Job.JobType.valueOf(req.getJobType()));
        job.setSalaryMin(req.getSalaryMin());
        job.setSalaryMax(req.getSalaryMax());
        job.setSkillsRequired(req.getSkillsRequired());
        return toResponse(jobRepository.save(job));
    }

    public void deleteJob(Long jobId, Long recruiterId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        job.setActive(false);
        jobRepository.save(job);
    }

    public ApplicationResponse applyToJob(Long jobId, Long userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean alreadyApplied = applicationRepository.findByApplicantAndJob(user, job).isPresent();
        if (alreadyApplied) throw new RuntimeException("You have already applied to this job.");

        Application app = new Application();
        app.setApplicant(user);
        app.setJob(job);
        app.setStatus(Application.ApplicationStatus.APPLIED);
        app.setAppliedAt(LocalDateTime.now());
        return toAppResponse(applicationRepository.save(app));
    }

    public List<ApplicationResponse> getApplicationsByJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        return applicationRepository.findByJob(job).stream()
                .map(this::toAppResponse).collect(Collectors.toList());
    }

    public List<ApplicationResponse> getMyApplications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return applicationRepository.findByApplicant(user).stream()
                .map(this::toAppResponse).collect(Collectors.toList());
    }

    public List<JobResponse> getJobsByRecruiter(Long recruiterId) {
        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return jobRepository.findByPostedBy(recruiter).stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    private JobResponse toResponse(Job j) {
        return JobResponse.builder()
                .id(j.getId())
                .title(j.getTitle())
                .company(j.getCompany())
                .description(j.getDescription())
                .location(j.getLocation())
                .jobType(j.getJobType() != null ? j.getJobType().toString() : null)
                .salaryMin(j.getSalaryMin())
                .salaryMax(j.getSalaryMax())
                .skillsRequired(j.getSkillsRequired())
                .postedByName(j.getPostedBy() != null ? j.getPostedBy().getName() : null)
                .postedById(j.getPostedBy() != null ? j.getPostedBy().getId() : null)
                .createdAt(j.getCreatedAt())
                .isActive(j.isActive())
                .build();
    }

    private ApplicationResponse toAppResponse(Application a) {
        return ApplicationResponse.builder()
                .id(a.getId())
                .jobId(a.getJob().getId())
                .jobTitle(a.getJob().getTitle())
                .company(a.getJob().getCompany())
                .applicantId(a.getApplicant().getId())
                .applicantName(a.getApplicant().getName())
                .status(a.getStatus().toString())
                .appliedAt(a.getAppliedAt())
                .notes(a.getNotes())
                .build();
    }
}
