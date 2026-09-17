package com.hiremind.service;

import com.hiremind.dto.CodingProblemResponse;
import com.hiremind.dto.CodingSubmissionRequest;
import com.hiremind.dto.CodingSubmissionResponse;
import com.hiremind.exception.ResourceNotFoundException;
import com.hiremind.model.CodingProblem;
import com.hiremind.model.CodingSubmission;
import com.hiremind.model.Difficulty;
import com.hiremind.model.User;
import com.hiremind.repository.CodingProblemRepository;
import com.hiremind.repository.CodingSubmissionRepository;
import com.hiremind.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CodingService {

        private final CodingProblemRepository codingProblemRepository;
        private final CodingSubmissionRepository codingSubmissionRepository;
        private final UserRepository userRepository;

        @PostConstruct
        public void initializeProblems() {
                if (codingProblemRepository.count() == 0) {
                        seedProblems();
                }
        }

        public List<CodingProblemResponse> getAllProblems() {
                return codingProblemRepository.findAll().stream()
                                .map(this::toResponse).collect(Collectors.toList());
        }

        public CodingProblemResponse getProblemById(Long id) {
                CodingProblem p = codingProblemRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id: " + id));
                return toResponse(p);
        }

        public CodingSubmissionResponse submitSolution(CodingSubmissionRequest req, Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                CodingProblem problem = codingProblemRepository.findById(req.getProblemId())
                                .orElseThrow(() -> new ResourceNotFoundException("Problem not found"));

                Random rand = new Random();
                boolean passed = rand.nextDouble() < 0.75;
                int runtimeMs = 45 + rand.nextInt(306);
                int memoryMb = 14 + rand.nextInt(32);

                CodingSubmission submission = new CodingSubmission();
                submission.setUser(user);
                submission.setProblem(problem);
                submission.setCode(req.getCode());
                submission.setLanguage(req.getLanguage());
                submission.setPassed(passed);
                submission.setRuntime(runtimeMs + " ms");
                submission.setMemory(memoryMb + " MB");
                submission.setSubmittedAt(LocalDateTime.now());
                CodingSubmission saved = codingSubmissionRepository.save(submission);

                return CodingSubmissionResponse.builder()
                                .id(saved.getId())
                                .problemId(problem.getId())
                                .problemTitle(problem.getTitle())
                                .language(req.getLanguage())
                                .passed(passed)
                                .runtime(runtimeMs + " ms")
                                .memory(memoryMb + " MB")
                                .submittedAt(saved.getSubmittedAt())
                                .build();
        }

        public List<CodingSubmissionResponse> getMySubmissions(Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                return codingSubmissionRepository.findByUser(user).stream()
                                .map(s -> CodingSubmissionResponse.builder()
                                                .id(s.getId())
                                                .problemId(s.getProblem().getId())
                                                .problemTitle(s.getProblem().getTitle())
                                                .language(s.getLanguage())
                                                .passed(s.isPassed())
                                                .runtime(s.getRuntime())
                                                .memory(s.getMemory())
                                                .submittedAt(s.getSubmittedAt())
                                                .build())
                                .collect(Collectors.toList());
        }

        private CodingProblemResponse toResponse(CodingProblem p) {
                return CodingProblemResponse.builder()
                                .id(p.getId())
                                .title(p.getTitle())
                                .difficulty(p.getDifficulty().toString())
                                .description(p.getDescription())
                                .examples(p.getExamples())
                                .constraints(p.getConstraints())
                                .tags(p.getTags())
                                .starterCode(p.getStarterCode())
                                .acceptanceRate(p.getAcceptanceRate())
                                .build();
        }

        private void seedProblems() {
                codingProblemRepository.save(buildProblem("Two Sum",
                                Difficulty.EASY,
                                "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
                                "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]",
                                "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
                                "Array,Hash Table", 49.1,
                                "function twoSum(nums, target) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Valid Parentheses",
                                Difficulty.EASY,
                                "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
                                "Input: s = \"()\"\nOutput: true\n\nInput: s = \"()[]{}\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false",
                                "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'",
                                "String,Stack", 40.8,
                                "function isValid(s) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Reverse Linked List",
                                Difficulty.EASY,
                                "Given the head of a singly linked list, reverse the list, and return the reversed list.",
                                "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n\nInput: head = [1,2]\nOutput: [2,1]",
                                "The number of nodes in the list is in the range [0, 5000]\n-5000 <= Node.val <= 5000",
                                "Linked List,Recursion", 73.2,
                                "function reverseList(head) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Best Time to Buy and Sell Stock",
                                Difficulty.EASY,
                                "You are given an array `prices` where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
                                "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price=1), sell on day 5 (price=6), profit = 6-1 = 5.\n\nInput: prices = [7,6,4,3,1]\nOutput: 0",
                                "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
                                "Array,Dynamic Programming,Greedy", 54.3,
                                "function maxProfit(prices) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Merge Two Sorted Lists",
                                Difficulty.EASY,
                                "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
                                "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n\nInput: list1 = [], list2 = []\nOutput: []",
                                "The number of nodes in both lists is in the range [0, 50]\n-100 <= Node.val <= 100",
                                "Linked List,Recursion", 62.7,
                                "function mergeTwoLists(list1, list2) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Longest Substring Without Repeating Characters",
                                Difficulty.MEDIUM,
                                "Given a string `s`, find the length of the longest substring without repeating characters.",
                                "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\nInput: s = \"bbbbb\"\nOutput: 1\n\nInput: s = \"pwwkew\"\nOutput: 3",
                                "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
                                "Hash Table,String,Sliding Window", 33.8,
                                "function lengthOfLongestSubstring(s) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Add Two Numbers",
                                Difficulty.MEDIUM,
                                "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
                                "Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n\nInput: l1 = [9,9,9,9], l2 = [9,9,9]\nOutput: [8,9,9,0,1]",
                                "The number of nodes in each linked list is in the range [1, 100]\n0 <= Node.val <= 9",
                                "Linked List,Math,Recursion", 40.1,
                                "function addTwoNumbers(l1, l2) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Container With Most Water",
                                Difficulty.MEDIUM,
                                "You are given an integer array `height` of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water.",
                                "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The max area is between indices 1 and 8: min(8,7)*7 = 49.\n\nInput: height = [1,1]\nOutput: 1",
                                "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
                                "Array,Two Pointers,Greedy", 54.7,
                                "function maxArea(height) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("3Sum",
                                Difficulty.MEDIUM,
                                "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
                                "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n\nInput: nums = [0,1,1]\nOutput: []\n\nInput: nums = [0,0,0]\nOutput: [[0,0,0]]",
                                "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
                                "Array,Two Pointers,Sorting", 32.4,
                                "function threeSum(nums) {\n  // Your code here\n}"));

                codingProblemRepository.save(buildProblem("Binary Tree Level Order Traversal",
                                Difficulty.MEDIUM,
                                "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
                                "Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\nInput: root = [1]\nOutput: [[1]]\n\nInput: root = []\nOutput: []",
                                "The number of nodes in the tree is in the range [0, 2000]\n-1000 <= Node.val <= 1000",
                                "Tree,BFS,Binary Tree", 65.2,
                                "function levelOrder(root) {\n  // Your code here\n}"));
        }

        private CodingProblem buildProblem(String title, Difficulty difficulty,
                        String description, String examples, String constraints,
                        String tags, double acceptanceRate, String starterCode) {
                CodingProblem p = new CodingProblem();
                p.setTitle(title);
                p.setDifficulty(difficulty);
                p.setDescription(description);
                p.setExamples(examples);
                p.setConstraints(constraints);
                p.setTags(tags);
                p.setAcceptanceRate(acceptanceRate);
                p.setStarterCode(starterCode);
                return p;
        }
}
