# HireMind AI 🧠

> AI-powered job platform — smart hiring for candidates and recruiters.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Spring Boot 3.2 + Java 17 |
| Database | PostgreSQL |
| Auth | JWT (jjwt) |
| AI | Mock AI (swap-in ready for OpenAI) |

---

## Project Structure

```
Hiremind/
├── frontend/        ← React app (port 5173)
└── backend/         ← Spring Boot API (port 8080)
```

---

## Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.9+
- PostgreSQL 15+

---

## Running the Frontend

```bash
cd frontend
npm install          # only first time
npm run dev          # starts on http://localhost:5173
```

---

## Running the Backend

### 1. Create the PostgreSQL database
```sql
CREATE DATABASE hireminddb;
```

### 2. Update credentials in `backend/src/main/resources/application.properties`
```properties
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### 3. Start the server
```bash
cd backend
mvn spring-boot:run   # starts on http://localhost:8080
```

> The database tables are auto-created by Hibernate on first run.  
> 10 coding problems are seeded automatically on startup.

---

## Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET | `/api/jobs` | List all jobs |
| POST | `/api/jobs/{id}/apply` | Apply to job |
| POST | `/api/ats/analyze` | Upload resume → ATS score |
| POST | `/api/interview/score` | Submit transcript → Interview score |
| GET | `/api/problems` | List coding problems |
| POST | `/api/problems/{id}/submit` | Submit code solution |
| GET | `/api/career-match` | Get career match analysis |
| POST | `/api/chat` | AI chatbot message |

---

## Pages

| Route | Page |
|---|---|
| `/` | Home / Landing |
| `/problems` | Coding Problems list |
| `/problems/:id` | Problem editor + runner |
| `/jobs` | Jobs board |
| `/ats` | ATS Resume Checker |
| `/interview` | AI Interview |
| `/profile` | Candidate / Recruiter Profile |
| `/career-match` | Career Match Dashboard |
| `/recruiter` | Recruiter Dashboard |
| `/login` | Login |
| `/register` | Register |

---

## Switching to Real OpenAI

In `ATSService.java`, replace `mockAIAnalysis()` with a call to OpenAI's chat completion API.  
In `InterviewService.java`, replace `mockInterviewScoring()` similarly.  
In `ChatService.java`, replace the keyword-based responses with `openai.chat.completions.create(...)`.

Add your key to `application.properties`:
```properties
openai.api.key=sk-your-key-here
```

---

## Default Accounts (Mock — no backend needed for frontend dev)

Any email + password combination works in frontend-only mode.

---

*Built with ❤️ by HireMind AI*
