# Requirement Extractor POC

This is a proof-of-concept for an AI-powered meeting transcript analyzer that extracts and categorizes software requirements into **Epics**, **Stories**, and **Features**.

## Project Structure

- `/` - Next.js Frontend (TypeScript, CSS Modules)
- `/backend` - Spring Boot Backend (Java 17, Maven)

## Prerequisites

- **Node.js**: v20 or higher
- **Java**: Java 17 or higher
- **Maven**: (Embedded in backend wrapper)

## Getting Started

### 1. Run the Backend

Navigate to the `backend` directory and start the Spring Boot application:

```bash
cd backend
./start.sh
```

The backend runs on [http://localhost:8080](http://localhost:8080).

### 2. Run the Frontend

In the root directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **File Upload**: Upload transcripts (text/markdown) for AI analysis.
- **Demo Mode**: Instant access to a pre-populated dashboard with a complex requirement hierarchy (**Epic -> Story -> Feature**).
- **Hierarchical View**: Clean, indented visualization of requirement relationships.
- **Transcript Viewer**: Side-by-side view of the original source text and extracted data.

## Deployment Note

The project is configured for local network development. The frontend dynamically resolves the backend URL based on the current hostname to facilitate sharing within a private network (pending local firewall exceptions).
