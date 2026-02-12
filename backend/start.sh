#!/bin/bash
# Set GCP credentials for Gemini API authentication
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/gcp-credentials.json"

# Run Spring Boot backend with SSL verification disabled for Maven Central/Milestones
mvn -Dmaven.resolver.transport=wagon -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Daether.connector.https.securityMode=insecure spring-boot:run
