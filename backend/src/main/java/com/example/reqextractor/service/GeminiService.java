package com.example.reqextractor.service;

import com.example.reqextractor.model.AnalysisResponse;
import com.example.reqextractor.model.Requirement;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public GeminiService(ChatClient chatClient) {
        this.chatClient = chatClient;
        this.objectMapper = new ObjectMapper();
    }

    public AnalysisResponse analyzeTranscript(String transcriptText) {
        String promptText = """
                You are an expert IT Business Analyst. Analyze the following meeting transcript and extract structured IT requirements.

                TRANSCRIPT:
                {transcript}

                INSTRUCTIONS:
                1. Identify Functional Requirements, Non-Functional Requirements, Constraints, and Action Items.
                2. Assign a priority (High, Medium, Low) based on the context.
                3. Create a unique ID for each requirement (e.g., FR-001, NFR-001).
                4. Return the result as a strict JSON array of objects. Do not include markdown formatting (```json ... ```).
                5. The JSON objects must have the following fields: id, title, description, category, priority.
                """;

        PromptTemplate template = new PromptTemplate(promptText);
        Map<String, Object> input = Map.of("transcript", transcriptText);
        Prompt prompt = template.create(input);

        String responseContent = chatClient.call(prompt).getResult().getOutput().getContent();

        // Cleanup markdown code blocks if present
        if (responseContent != null) {
            if (responseContent.startsWith("```json")) {
                responseContent = responseContent.substring(7);
            } else if (responseContent.startsWith("```")) {
                responseContent = responseContent.substring(3);
            }
            if (responseContent.endsWith("```")) {
                responseContent = responseContent.substring(0, responseContent.length() - 3);
            }
            responseContent = responseContent.trim();
        }

        List<Requirement> requirements = Collections.emptyList();
        try {
            if (responseContent != null && !responseContent.isEmpty()) {
                requirements = objectMapper.readValue(responseContent, new TypeReference<List<Requirement>>() {
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to parse response: " + responseContent);
        }

        AnalysisResponse response = new AnalysisResponse();
        response.setTranscript(transcriptText);
        response.setRequirements(requirements);

        return response;
    }
}
