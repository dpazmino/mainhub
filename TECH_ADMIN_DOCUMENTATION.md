# Better Youth Hub - Tech Admin Documentation

**Version:** 1.0

---

## Table of Contents

1. [What is Replit?](#what-is-replit)
2. [System Overview](#system-overview)
3. [Architecture Diagrams](#architecture-diagrams)
4. [Deployment Guide](#deployment-guide)
5. [Runbooks](#runbooks)
6. [Data Models](#data-models)

---

## What is Replit?

Replit is a cloud-based development platform that lets you write, run, and host applications directly in your web browser. Think of it as a complete computer for building software that lives in the cloud.

### Key Features

| Feature | Description |
|---------|-------------|
| **Code Editor** | Write and edit code directly in your browser. No software installation needed. |
| **Instant Preview** | See your changes immediately. The app runs live as you make changes. |
| **Built-in Database** | PostgreSQL database included. No separate database setup required. |
| **One-Click Deploy** | Publish your app to the internet with one click. Get a live URL instantly. |

### Key Terms

| Term | Definition |
|------|------------|
| **Repl** | A project container. Each app is a "Repl" that contains all code and settings. |
| **Fork** | Create your own copy of someone else's Repl to modify. |
| **Publish/Deploy** | Make your app live and accessible on the internet. |
| **Secrets** | Secure storage for passwords, API keys, and sensitive data. |

---

## System Overview

The Better Youth platform consists of four interconnected web applications, each serving a specific purpose. They share common technology and can communicate with each other.

### Better Youth Hub
- **URL:** https://attached-assets-davidpazmino1.replit.app/
- **Replit:** https://replit.com/@davidpazmino1/attached-assets
- **Description:** Main hub with role-based dashboards for students, staff, and mentors
- **Tech Stack:** React, TypeScript, Express, PostgreSQL, Drizzle ORM
- **Features:** Role-based access, Student tracking, Device management, Support requests

### Youth Connect
- **URL:** https://youth-connect.replit.app/
- **Replit:** https://replit.com/@davidpazmino1/youth-connect
- **Description:** Onboarding and engagement platform for new participants
- **Tech Stack:** React, TypeScript, Express, PostgreSQL
- **Features:** Onboarding flow, Profile creation, Resource connection

### Azure Connect
- **URL:** https://azure-connect.replit.app/
- **Replit:** https://replit.com/@davidpazmino1/azure-connect
- **Description:** Azure cloud integration and services portal
- **Tech Stack:** React, TypeScript, Express, Azure SDK
- **Features:** Azure integration, Cloud services, Resource management

### Unity Code Academy
- **URL:** https://unity-code-academy.replit.app/
- **Replit:** https://replit.com/@davidpazmino1/unity-code-academy
- **Description:** Gamified learning platform with XP, levels, and badges
- **Tech Stack:** React, TypeScript, Express, PostgreSQL
- **Features:** XP system, Badges, Learning modules, Progress tracking

---

## Architecture Diagrams

### Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BETTER YOUTH ECOSYSTEM                          │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   End Users     │
                              │ (Students/Staff)│
                              └────────┬────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              REPLIT HOSTING                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                         Load Balancer / CDN                              │ │
│  └──────────────┬──────────────┬──────────────┬──────────────┬─────────────┘ │
│                 │              │              │              │               │
│     ┌───────────▼──┐  ┌────────▼───┐  ┌──────▼────┐  ┌──────▼──────┐       │
│     │ Better Youth │  │   Youth    │  │   Azure   │  │ Unity Code  │       │
│     │     Hub      │  │  Connect   │  │  Connect  │  │   Academy   │       │
│     │  Port 5000   │  │ Port 5000  │  │ Port 5000 │  │  Port 5000  │       │
│     └──────┬───────┘  └──────┬─────┘  └─────┬─────┘  └──────┬──────┘       │
│            │                 │              │               │               │
│     ┌──────▼───────────────────────────────────────────────▼──────┐        │
│     │                     PostgreSQL Databases                     │        │
│     │         (Each app has its own isolated database)             │        │
│     └──────────────────────────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────────────────────────────┘

LEGEND:
  ┌───┐
  │   │ = Application/Service
  └───┘
    │
    ▼  = Data flow direction
```

### Better Youth Hub - Application Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BETTER YOUTH HUB ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React + TypeScript)                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                              PAGES                                       ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  ││
│  │  │  Home Page   │  │ Student Role │  │  Staff Role  │  │ Mentor Role │  ││
│  │  │   (home.tsx) │  │  Dashboard   │  │  Dashboard   │  │  Dashboard  │  ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           COMPONENTS                                     ││
│  │  Sidebar | Cards | Forms | Modals | Tables | Charts | Buttons           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        STATE MANAGEMENT                                  ││
│  │            TanStack Query (React Query) for API Caching                  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ HTTP/REST API
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (Express.js + TypeScript)               │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                              API ROUTES                                  ││
│  │  /api/students | /api/goals | /api/skills | /api/devices | /api/support ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         AUTHENTICATION                                   ││
│  │                    Replit Auth (OpenID Connect)                          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                            STORAGE LAYER                                 ││
│  │                     Drizzle ORM (Type-safe queries)                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ SQL Queries
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PostgreSQL DATABASE                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ students │ │  goals   │ │  skills  │ │ devices  │ │ support  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Youth Connect - Onboarding Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       YOUTH CONNECT ARCHITECTURE                             │
│                    (Onboarding & Engagement Platform)                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              ONBOARDING FLOW                                 │
│                                                                              │
│  Step 1          Step 2          Step 3          Step 4          Step 5    │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐   │
│  │ Welcome │───▶│ Profile │───▶│ Needs   │───▶│ Goals   │───▶│ Connect │   │
│  │  Intro  │    │  Setup  │    │ Assess  │    │ Setting │    │ Match   │   │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘   │
│                                                                              │
│  What happens at each step:                                                  │
│  • Welcome: Introduction to Better Youth program                             │
│  • Profile: Basic info, contact, emergency contact                           │
│  • Needs: Housing, food, transportation assessment                           │
│  • Goals: Career interests, education goals, timeline                        │
│  • Connect: Match with mentors, resources, programs                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA COLLECTED                                    │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │  Personal Info   │  │  Resource Needs  │  │  Program Match   │          │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤          │
│  │ • Name           │  │ • Housing status │  │ • Interests      │          │
│  │ • Age            │  │ • Food security  │  │ • Available time │          │
│  │ • Contact info   │  │ • Transport      │  │ • Learning style │          │
│  │ • School info    │  │ • Healthcare     │  │ • Career goals   │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Azure Connect - Cloud Services Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AZURE CONNECT ARCHITECTURE                            │
│                    (Cloud Integration & Services Portal)                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Dashboard   │  │  Resources   │  │   Storage    │  │   Reports    │    │
│  │   Overview   │  │  Management  │  │   Browser    │  │  & Analytics │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND API LAYER                                 │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         Express.js + TypeScript                          ││
│  │                                                                          ││
│  │   /api/resources    /api/storage    /api/users    /api/reports          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AZURE CLOUD SERVICES                                  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Azure     │  │    Azure     │  │    Azure     │  │    Azure     │    │
│  │   Storage    │  │   Identity   │  │  Functions   │  │   Cosmos DB  │    │
│  │  (Blob/File) │  │    (Auth)    │  │ (Serverless) │  │  (Database)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  Purpose: Provides cloud infrastructure for file storage, authentication,   │
│  serverless compute, and database services for the Better Youth ecosystem.  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Unity Code Academy - Gamification Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      UNITY CODE ACADEMY ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              GAMIFICATION ENGINE                             │
│                                                                              │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐       │
│  │   XP System     │     │  Level System   │     │  Badge System   │       │
│  │                 │     │                 │     │                 │       │
│  │ • Earn XP from  │────▶│ • XP thresholds │────▶│ • Achievement   │       │
│  │   activities    │     │ • Level 1-100   │     │   unlocks       │       │
│  │ • Bonus XP      │     │ • Rank titles   │     │ • Special badges│       │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘       │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         LEARNING MODULES                                 ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                ││
│  │  │  Video   │  │  Quiz    │  │ Project  │  │ Challenge│                ││
│  │  │ Lessons  │  │ Modules  │  │  Based   │  │  Tasks   │                ││
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ API Integration
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BETTER YOUTH HUB INTEGRATION                        │
│                                                                              │
│  GET /api/external/unity-students/{studentId}                               │
│  Returns: { level, totalXp, badges, weeklyProgress, completedModules }      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Deployment Guide

### Deploy on Replit

#### Step 1: Create Your Own Copy (Fork)

1. **Go to the app's Replit page** - Click on any of the "Code" links in the System Overview section above.
2. **Click the "Fork" button** - Located in the top-right corner. This creates your own copy that you can modify.
3. **Wait for the fork to complete** - Replit will copy all files and set up a new database for you automatically.

#### Step 2: Publish Your App

1. **Click the "Publish" button** - Found in the top-right area of the Replit interface.
2. **Choose deployment type** - Select "Autoscale" for most apps. This handles traffic automatically.
3. **Get your live URL** - Your app will be available at yourapp.replit.app within minutes.

#### Step 3: Connect Your Custom Domain (Optional)

1. **Go to Deployments tab** - After publishing, click on the "Deployments" tab in the left sidebar.
2. **Click "Link Custom Domain"** - Enter your domain name (e.g., app.yourdomain.com).
3. **Add DNS records** - Replit will show you the DNS records to add at your domain registrar (GoDaddy, Namecheap, etc.):
   - **A Record:** Points to Replit's servers
   - **TXT Record:** Verifies you own the domain
4. **Wait for verification** - DNS changes can take 15 minutes to 24 hours to take effect.

### Self-Host

#### Server Requirements

| Requirement | Description |
|-------------|-------------|
| Node.js 18+ | JavaScript runtime to run the application |
| PostgreSQL 14+ | Database for storing application data |
| 2GB RAM minimum | Memory for running the application |
| SSL Certificate | For secure HTTPS connections |

#### Step 1: Download the Code

From the Replit project page, click the three-dot menu (⋮) in the file panel and select "Download as ZIP".

**Alternative: Clone with Git**
```bash
git clone https://github.com/your-repo/app-name.git
```

#### Step 2: Set Up Environment Variables

Create a .env file in the root directory with these variables:

```bash
# Database connection
DATABASE_URL=postgresql://user:password@host:5432/database

# Session secret (generate a random string)
SESSION_SECRET=your-secret-key-here

# Application settings
NODE_ENV=production
PORT=5000
```

#### Step 3: Install & Run

```bash
npm install          # Install dependencies
npm run build        # Build for production
npm start            # Start the server
```

---

## Runbooks

### Runbook: Seed Production Database

Populate the database with initial data from CSV files.

> ⚠️ **Warning:** This will add data to your database. Run only once on initial setup.

**Step 1:** Ensure the app is published and running. Verify you can access the live URL.

**Step 2:** Run the seed endpoint. Execute this command in a terminal:
```bash
curl -X POST https://YOUR-APP-URL/api/admin/seed-database
```

**Step 3:** Verify success. You should see: `{"success": true, "message": "Database seeded successfully"}`

### Runbook: Add New Student

How to add a new student to the system.

**Step 1:** Log in as Staff. Navigate to the Staff dashboard.

**Step 2:** Go to Student Management. Click "Students" in the sidebar.

**Step 3:** Click "Add Student". Fill in the required information.

**Step 4:** Submit and verify. The new student should appear in the list.

### Runbook: Backup Database

Export a backup of your PostgreSQL database.

> ℹ️ **Replit Backups:** Replit automatically creates checkpoints. You can also manually export data.

**Option 1: Use Replit Checkpoints**
Checkpoints include database state. View them in the Version History panel.

**Option 2: Export via Shell (Self-hosted)**
Run this command:
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Runbook: Common Issues

#### App shows "Not Found"
- Check if the app is published (not just running in development)
- Verify the URL is correct
- Wait a few minutes after publishing for DNS propagation

#### Database connection error
- Check DATABASE_URL environment variable is set
- Verify PostgreSQL service is running
- Ensure database credentials are correct

#### Login not working
- Replit Auth only works on published apps
- Clear browser cookies and try again
- Check if SESSION_SECRET is configured

---

## Data Models

### Better Youth Hub - Database Schema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BETTER YOUTH HUB DATA MODEL                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│       USERS          │       │      STUDENTS        │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ username             │◄──────│ userId (FK)          │
│ email                │       │ ageRange             │
│ firstName            │       │ enrollmentDate       │
│ lastName             │       │ email                │
│ profileImageUrl      │       │ phone                │
│ createdAt            │       │ gradeLevel           │
│ updatedAt            │       │ schoolType           │
└──────────────────────┘       │ emergencyContact     │
                               │ hasIep               │
                               │ primaryLanguage      │
                               │ transportationNeeds  │
                               │ photoConsent         │
                               │ status               │
                               └──────────┬───────────┘
                                          │
          ┌───────────────────────────────┼───────────────────────────────┐
          │                               │                               │
          ▼                               ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│    STUDENT_GOALS     │       │    STUDENT_SKILLS    │       │     PLACEMENTS       │
├──────────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │       │ id (PK)              │
│ studentId (FK)       │       │ studentId (FK)       │       │ studentId (FK)       │
│ goalType             │       │ skillCategory        │       │ organizationName     │
│ description          │       │ skillName            │       │ role                 │
│ targetDate           │       │ currentLevel         │       │ startDate            │
│ status               │       │ targetLevel          │       │ endDate              │
│ progress             │       │ lastAssessed         │       │ status               │
│ mentorNotes          │       │ certifications       │       │ supervisorName       │
│ createdAt            │       └──────────────────────┘       │ hoursCompleted       │
└──────────────────────┘                                      │ payRate              │
                                                              │ notes                │
                                                              └──────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│       DEVICES        │       │  DEVICE_ALLOCATIONS  │       │   SUPPORT_REQUESTS   │
├──────────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │◄──────│ deviceId (FK)        │       │ id (PK)              │
│ assetTag             │       │ studentId (FK)  ─────┼───────│ studentId (FK)       │
│ deviceType           │       │ allocatedDate        │       │ serviceCategory      │
│ manufacturer         │       │ returnDate           │       │ serviceName          │
│ model                │       │ condition            │       │ description          │
│ serialNumber         │       │ notes                │       │ urgency              │
│ purchaseDate         │       │ status               │       │ status               │
│ warrantyExpiry       │       └──────────────────────┘       │ assignedTo           │
│ status               │                                      │ resolution           │
│ condition            │                                      │ createdAt            │
│ notes                │                                      │ resolvedAt           │
└──────────────────────┘                                      └──────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│       MENTORS        │       │   STUDENT_OUTCOMES   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │       │ studentId (FK)       │
│ firstName            │       │ outcomeType          │
│ lastName             │       │ organization         │
│ email                │       │ title                │
│ phone                │       │ startDate            │
│ organization         │       │ endDate              │
│ expertise            │       │ salary               │
│ availability         │       │ notes                │
│ status               │       │ verifiedBy           │
│ bio                  │       │ verifiedDate         │
└──────────────────────┘       └──────────────────────┘

LEGEND:
  PK = Primary Key (unique identifier)
  FK = Foreign Key (links to another table)
  ◄── = Relationship (one-to-many)
```

### Youth Connect - Data Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        YOUTH CONNECT DATA MODEL                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│    ONBOARDING_USER   │       │   NEEDS_ASSESSMENT   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ firstName            │◄──────│ userId (FK)          │
│ lastName             │       │ housingStatus        │
│ email                │       │ foodSecure           │
│ phone                │       │ transportAccess      │
│ dateOfBirth          │       │ healthcareAccess     │
│ currentStep          │       │ mentalHealthNeeds    │
│ completedAt          │       │ educationStatus      │
│ createdAt            │       │ employmentStatus     │
└──────────┬───────────┘       │ priorityLevel        │
           │                   │ assessedAt           │
           │                   └──────────────────────┘
           │
           ▼
┌──────────────────────┐       ┌──────────────────────┐
│     USER_GOALS       │       │   RESOURCE_MATCHES   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │       │ userId (FK)          │
│ goalCategory         │       │ resourceType         │
│ description          │       │ resourceName         │
│ timeline             │       │ matchScore           │
│ priority             │       │ status               │
│ status               │       │ contactedAt          │
│ createdAt            │       │ enrolledAt           │
└──────────────────────┘       └──────────────────────┘

LEGEND:
  PK = Primary Key
  FK = Foreign Key
```

### Unity Code Academy - Data Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     UNITY CODE ACADEMY DATA MODEL                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│       LEARNERS       │       │   LEARNING_PROGRESS  │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │◄──────│ learnerId (FK)       │
│ currentLevel         │       │ moduleId (FK)        │
│ totalXp              │       │ status               │
│ weeklyXp             │       │ score                │
│ streak               │       │ timeSpent            │
│ rank                 │       │ completedAt          │
│ joinedAt             │       └──────────────────────┘
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐       ┌──────────────────────┐
│      BADGES          │       │      MODULES         │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ learnerId (FK)       │       │ title                │
│ badgeType            │       │ description          │
│ earnedAt             │       │ category             │
│ xpAwarded            │       │ difficulty           │
└──────────────────────┘       │ xpReward             │
                               │ estimatedTime        │
                               └──────────────────────┘

LEGEND:
  PK = Primary Key
  FK = Foreign Key
```

---

*Better Youth Hub - Tech Admin Documentation*  
*Version 1.0*
