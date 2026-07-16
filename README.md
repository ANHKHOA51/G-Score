# G-Scores

This project is a solution for the Web Developer Intern Assignment at [Golden Owl](https://goldenowl.asia/). It provides a simple and responsive web application to check the 2024 THPT exam scores, view statistical reports, and discover the top students in various subject groups.

## 🧠 Technical Choices & Problem Solving

### 1. Technology Stack
- **Backend (NestJS)**: Chosen because it is lightweight, extremely fast, and allows for rapid development. It provides excellent built-in support for **Object-Oriented Programming (OOP)** (which aligns perfectly with the assignment's requirements) and consumes minimal resources, making it highly suitable for deployment on free-tier cloud providers.
- **Frontend (React)**: Chosen due to high developer familiarity, strong component reusability, and robust ecosystem.
- **Database (Supabase + PostgreSQL)**: Selected for its reliability, developer familiarity, and ready-to-use cloud capabilities.

### 2. Database Design & Optimization (Problem Solving)
Handling a dataset with millions of records (from the CSV file) requires a highly optimized database structure to ensure fast response times.

**Data Splitting (Denormalization):**
Instead of calculating everything on the fly, the database is split into three core tables:
1. `student`: Stores the raw scores for each subject. The Registration Number (`sbd`) is set as the Primary Key for instant O(1) score lookups.
2. `student_group_score`: Pre-calculates and stores the total score of a student for specific subject groups (e.g., A00, B00). This prevents the database from performing expensive additions (e.g., `toan + vat_li + hoa_hoc`) for millions of rows on every request.
3. `subject_statistic`: Pre-calculates and caches the score level statistics (>=8, >=6, etc.) during the database seeding phase. This allows the reporting dashboard chart to load instantly without running `COUNT()` queries over the entire dataset.

**Indexing Strategy:**
To get the top 10 students of any group instantly, a **Composite Index** was created on the `student_group_score` table:
```prisma
@@index([groupCode, totalScore(sort: Desc)], name: "idx_group_score_ranking")
```
This index clusters the data by `groupCode` and pre-sorts the `totalScore` in descending order. When the API queries the top 10 students, PostgreSQL simply reads the first 10 rows from the index directly, completely eliminating the need to scan or sort millions of records!

### 3. Scalability
The system is designed to be open for extension but closed for modification. By storing group scores dynamically via a `groupCode` column in the database and managing subject groups through OOP polymorphism (`class GroupA00 extends SubjectGroup`), adding new subject combinations (e.g., A01, D01) requires zero changes to the database schema, core ranking logic, or the API.

---

## 🚀 Live Demo

- **Application**: [https://g-score-ottk.vercel.app](https://g-score-ottk.vercel.app)

## ✨ Features Implemented

### Must Have
- ✅ **Database Migration & Seeding**: Converted the raw `diem_thi_thpt_2024.csv` into a structured PostgreSQL database using Prisma ORM and custom seeder scripts.
- ✅ **Score Lookup**: Search for a student's score using their registration number (SBD).
- ✅ **Statistical Report**: Visualized statistics for 4 score levels (>=8, 6-8, 4-6, <4) across all subjects using responsive charts.
- ✅ **Top 10 Students**: List of the top 10 students for Group A00 (Math, Physics, Chemistry). (The system also supports dynamic selection for other combinations!)

### Nice to Have
- ✅ **Responsive Design**: Beautiful UI built with Tailwind CSS that works seamlessly across desktops, tablets, and mobile devices.
- ✅ **Dockerized Setup**: The entire application (Frontend + Backend + Reverse Proxy) is containerized using Docker for easy local deployment.
- ✅ **Cloud Deployment**: Deployed the frontend and backend on Vercel for free public access.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Recharts (for charts), React Router.
- **Backend**: NestJS, TypeScript, Prisma ORM, PostgreSQL (hosted on Supabase).
- **Deployment**: Docker, Docker Compose, Nginx, Vercel.

---

## 🏁 Getting Started (Local Setup)

You can run this project locally using either **Docker (Recommended)** or **Manual Setup**.

### Prerequisites
- [Docker Desktop](https://www.docker.com/) (For Docker setup)
- [Node.js 22+](https://nodejs.org/) (For Manual setup)
- A PostgreSQL Database URL (You can use a local Postgres instance or a free cloud DB like Supabase).
- The raw dataset file: `diem_thi_thpt_2024.csv` must be placed in the **root** folder (`/`) of the project.

### 1. Environment Configuration

You will need to set up the `.env` files for both the backend and frontend.

**Backend (`backend/.env`)**
Create a `.env` file in the `backend/` directory based on the `.env.example`:
```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/gscore"
DIRECT_URL="postgresql://postgres:password@localhost:5432/gscore"
PORT=3000
FRONTEND_URL="http://localhost:8080"
```

**Frontend (`frontend/.env`)**
Create a `.env` file in the `frontend/` directory based on `.env.example`:
```env
# Pointing to the Docker Nginx Proxy or Local Backend
VITE_API_BASE_URL=/api
```

*(Note: In the Docker setup, Nginx automatically proxies `/api` to the backend container).*

### 2. Database Migration and Seeding

Before running the application, you must push the schema and seed the initial data from the `.csv` file.

1. Ensure the `diem_thi_thpt_2024.csv` file is located at the root of the project (`d:\Code\GoldenOwl\diem_thi_thpt_2024.csv`).
2. Navigate to the backend directory and run:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma db push
   
   # Run the seeder script to import data
   npx ts-node src/seed.ts
   ```
*(This process may take a few minutes depending on your hardware since it parses and imports over 3.3 million subject records).*

### 3. Run with Docker (Recommended)

Once the database is ready, you can start the entire stack with a single command from the root directory:

```bash
docker-compose up --build -d
```

- **Frontend UI**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

### 4. Run Manually (Development Mode)

If you prefer to run the development servers directly without Docker:

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run start:dev
```
*(Backend runs on http://localhost:3000)*

**Terminal 2 (Frontend):**
Modify `frontend/.env` to `VITE_API_BASE_URL=http://localhost:3000` for local dev without Nginx.
```bash
cd frontend
npm install
npm run dev
```
*(Frontend runs on http://localhost:5173)*

## 📂 Project Structure

- `/frontend` - React SPA (Vite, Tailwind, Recharts)
- `/backend` - NestJS API (Prisma, PostgreSQL)
- `/docker-compose.yml` - Orchestration file
- `REQUIREMENT.md` - Original assignment instructions
