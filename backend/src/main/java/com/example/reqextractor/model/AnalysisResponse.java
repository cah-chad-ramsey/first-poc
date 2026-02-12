package com.example.reqextractor.model;

import java.util.List;

public class AnalysisResponse {
    private String transcript;
    private List<Requirement> requirements;

    public AnalysisResponse() {
    }

    public String getTranscript() {
        return transcript;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    public List<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<Requirement> requirements) {
        this.requirements = requirements;
    }
}
