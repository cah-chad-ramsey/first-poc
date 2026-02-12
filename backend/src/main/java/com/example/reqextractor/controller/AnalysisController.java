package com.example.reqextractor.controller;

import com.example.reqextractor.model.AnalysisResponse;
import com.example.reqextractor.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow Next.js frontend
public class AnalysisController {

    private final GeminiService geminiService;

    public AnalysisController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            // detailed: In a real app, handle audio files via Speech-to-Text here.
            // For this POC, we assume text/markdown files for simplicity or direct audio if
            // multimodal supported later.
            // Currently implementing text-based transcript upload.

            String content = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n"));

            AnalysisResponse response = geminiService.analyzeTranscript(content);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
