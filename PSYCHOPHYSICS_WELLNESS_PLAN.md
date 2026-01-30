# Psychophysics-Based Wellness Plan for Better Youth Hub

## Overview

This document outlines a plan to integrate psychophysics principles into the Better Youth Hub platform to prevent overwhelm for both **students** (at-risk youth in foster care learning animation/film) and **mentors** (industry professionals guiding them).

Psychophysics studies the relationship between physical/environmental stimuli and human perception, sensation, and response. By applying these principles, we can design systems that respect cognitive limits, detect early warning signs of overwhelm, and create sustainable learning and mentoring experiences.

---

## Part 1: Preventing Student Overwhelm

At-risk youth face unique challenges: navigating foster care, completing school, learning new creative skills, and managing equipment. Each of these creates cognitive and emotional load.

### 1.1 The Student Load Model

Students experience load from multiple domains simultaneously:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STUDENT LOAD DOMAINS                                 │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │   LIFE       │   │   SCHOOL     │   │  LEARNING    │   │  EQUIPMENT   │
  │   STRESS     │   │   DEMANDS    │   │  (Animation) │   │  MANAGEMENT  │
  ├──────────────┤   ├──────────────┤   ├──────────────┤   ├──────────────┤
  │ • Housing    │   │ • Homework   │   │ • New skills │   │ • Setup      │
  │ • Food       │   │ • Exams      │   │ • Projects   │   │ • Software   │
  │ • Transport  │   │ • Attendance │   │ • Deadlines  │   │ • Maintenance│
  │ • Emotions   │   │ • Social     │   │ • Feedback   │   │ • Returns    │
  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
        │                  │                  │                  │
        └──────────────────┴──────────────────┴──────────────────┘
                                    │
                                    ▼
                        ┌──────────────────────┐
                        │   TOTAL COGNITIVE    │
                        │       LOAD           │
                        │  (Must stay below    │
                        │   threshold)         │
                        └──────────────────────┘
```

### 1.2 Psychophysics Principles for Students

#### Principle 1: Weber-Fechner Law (Gradual Intensity Scaling)

**Concept:** Humans perceive changes in stimuli logarithmically, not linearly. A small increase in workload when already stressed feels much larger than the same increase when relaxed.

**Application:**
- When a student's life stress is high (housing instability, emotional crisis), automatically reduce learning expectations
- Scale new assignments based on current total load, not just available time
- Use a "bandwidth budget" that adjusts dynamically

#### Principle 2: Just Noticeable Difference (JND)

**Concept:** There's a minimum threshold of change that a person can perceive. Below this, changes go unnoticed; above it, they feel significant.

**Application:**
- Introduce new responsibilities in small increments that fall below the "overwhelm threshold"
- Break equipment onboarding into micro-steps (1-2 tasks per week)
- Add learning modules gradually rather than presenting the full curriculum upfront

#### Principle 3: Sensory Adaptation

**Concept:** Prolonged exposure to a stimulus reduces sensitivity to it. This applies to both positive and negative stimuli.

**Application:**
- Rotate learning content types (video → hands-on → discussion) to prevent fatigue
- Vary mentor communication styles and frequencies
- Schedule "adaptation breaks" between intensive learning periods

#### Principle 4: Signal Detection Theory

**Concept:** The ability to detect a "signal" (important information) depends on the amount of "noise" (distractions/stress) present.

**Application:**
- When life stress is high, simplify all communications (fewer notifications, clearer instructions)
- Highlight only the most critical next step, hide optional tasks
- Create "low-noise" modes for students in crisis

### 1.3 Student Wellness Dashboard Features

| Feature | Psychophysics Principle | Description |
|---------|------------------------|-------------|
| **Load Meter** | Weber-Fechner | Visual gauge showing current total load across all domains (0-100%) |
| **Auto-Pacing** | JND | System automatically adjusts learning pace based on load level |
| **Stress Check-Ins** | Signal Detection | Weekly 3-question pulse survey to detect early warning signs |
| **Quiet Mode** | Sensory Adaptation | One-click mode that reduces notifications and simplifies interface |
| **Milestone Celebrations** | Positive Reinforcement | Small rewards at psychologically optimal intervals |
| **Break Reminders** | Adaptation Cycles | Prompts for rest after sustained focus periods |

### 1.4 Student Load Calculation Algorithm

```
STUDENT_LOAD = (
    (Life_Stress × 0.35) +
    (School_Demands × 0.25) +
    (Learning_Tasks × 0.25) +
    (Equipment_Issues × 0.15)
)

Where each factor is scored 0-100 based on:
- Life_Stress: Self-reported + support request frequency + housing status
- School_Demands: Current grades + upcoming deadlines + attendance
- Learning_Tasks: Active modules + overdue items + project complexity
- Equipment_Issues: Open device tickets + setup status + software problems

THRESHOLD LEVELS:
- Green (0-50%): Normal pace, full curriculum access
- Yellow (51-70%): Reduced recommendations, priority focus only
- Orange (71-85%): Essential tasks only, mentor check-in triggered
- Red (86-100%): Pause new assignments, immediate support outreach
```

### 1.5 Implementation: Student Features

#### Phase 1: Data Collection (Weeks 1-4)
- Add weekly wellness check-in (3 questions, 30 seconds)
- Track learning module completion times and patterns
- Monitor support request frequency and types
- Integrate school calendar for exam/deadline awareness

#### Phase 2: Load Visualization (Weeks 5-8)
- Build Load Meter component for student dashboard
- Create color-coded status indicators
- Add "How I'm Doing" self-assessment tool
- Implement Quiet Mode toggle

#### Phase 3: Adaptive Responses (Weeks 9-12)
- Auto-pacing algorithm for learning modules
- Smart notification throttling based on load level
- Mentor alert triggers for high-stress students
- Break reminders and celebration moments

---

## Part 2: Preventing Mentor Overwhelm

Mentors are volunteering their expertise while managing their own careers. They can experience compassion fatigue, decision overload, and boundary erosion.

### 2.1 The Mentor Load Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MENTOR LOAD DOMAINS                                 │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │   NUMBER OF  │   │  COMPLEXITY  │   │  EMOTIONAL   │   │  TIME        │
  │   STUDENTS   │   │  OF NEEDS    │   │  INTENSITY   │   │  COMMITMENT  │
  ├──────────────┤   ├──────────────┤   ├──────────────┤   ├──────────────┤
  │ • Active     │   │ • Crisis     │   │ • Heavy      │   │ • Hours/week │
  │   mentees    │   │   situations │   │   topics     │   │ • Response   │
  │ • Inquiries  │   │ • Technical  │   │ • Attachment │   │   time       │
  │ • Follow-ups │   │   challenges │   │ • Boundaries │   │ • Scheduling │
  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
        │                  │                  │                  │
        └──────────────────┴──────────────────┴──────────────────┘
                                    │
                                    ▼
                        ┌──────────────────────┐
                        │   MENTOR CAPACITY    │
                        │      REMAINING       │
                        └──────────────────────┘
```

### 2.2 Psychophysics Principles for Mentors

#### Principle 1: Cognitive Load Theory

**Concept:** Working memory has limited capacity. Complex decisions and emotional processing consume the same cognitive resources.

**Application:**
- Limit active mentee assignments based on complexity, not just headcount
- Provide decision support tools that reduce cognitive overhead
- Batch similar tasks (all check-ins on same day) to reduce context-switching

#### Principle 2: Emotional Bandwidth Depletion

**Concept:** Empathy and emotional support draw from a finite daily reserve that must be replenished.

**Application:**
- Track emotional intensity of interactions (crisis conversations vs. routine check-ins)
- Suggest "light" mentees after heavy emotional sessions
- Mandatory cool-down periods after crisis interventions

#### Principle 3: Habituation and Burnout Prevention

**Concept:** Repeated exposure to intense stimuli without recovery leads to desensitization or burnout.

**Application:**
- Rotate mentors through high-need and lower-need students
- Enforce maximum consecutive weeks of high-intensity mentoring
- Provide variety in mentoring activities (1:1, group sessions, content review)

#### Principle 4: Perceived Control

**Concept:** Feeling in control of one's workload significantly reduces stress perception, even if actual workload is high.

**Application:**
- Let mentors set their own boundaries (max students, availability windows)
- Provide clear "decline" options without guilt
- Give visibility into upcoming commitments and the ability to adjust

### 2.3 Mentor Wellness Dashboard Features

| Feature | Psychophysics Principle | Description |
|---------|------------------------|-------------|
| **Capacity Meter** | Cognitive Load | Shows remaining capacity based on student complexity, not just count |
| **Emotional Load Tracker** | Bandwidth Depletion | Flags when recent interactions have been emotionally intensive |
| **Smart Matching** | Habituation Prevention | Suggests student assignments based on mentor capacity and fit |
| **Boundary Controls** | Perceived Control | Easy toggles for availability, max students, response expectations |
| **Recovery Mode** | Adaptation Cycles | Option to pause new assignments for 2-4 weeks |
| **Impact Summary** | Positive Reinforcement | Monthly report showing mentor's positive impact on student outcomes |

### 2.4 Mentor Capacity Calculation Algorithm

```
MENTOR_CAPACITY = Base_Capacity - Current_Load

Where:
- Base_Capacity: Set by mentor (e.g., 10 points = 2-3 students typically)
- Current_Load: Sum of student complexity scores

STUDENT COMPLEXITY SCORING:
- Low complexity (2 points): Stable student, routine check-ins, technical focus
- Medium complexity (4 points): Some life challenges, needs encouragement
- High complexity (7 points): Active crisis, frequent support needs, emotional intensity
- Critical (10 points): Immediate intervention needed, dedicated attention required

CAPACITY STATES:
- Available (load < 70% of capacity): Can accept new students
- At Capacity (70-90%): No new assignments, focus on current mentees
- Overloaded (90-100%): Redistribute students, trigger peer support
- Recovery Needed (>100%): Mandatory pause, staff intervention
```

### 2.5 Implementation: Mentor Features

#### Phase 1: Capacity Setup (Weeks 1-4)
- Add mentor profile settings for capacity preferences
- Create student complexity scoring system
- Build capacity visualization component
- Implement availability calendar integration

#### Phase 2: Smart Matching (Weeks 5-8)
- Algorithm to match students with mentors based on capacity and expertise
- Automatic complexity recalculation as student situations change
- Mentor recommendations for rebalancing
- Peer mentor support pairing for high-need students

#### Phase 3: Wellness Monitoring (Weeks 9-12)
- Emotional load tracking from interaction logs
- Recovery mode functionality
- Impact summaries and appreciation features
- Burnout warning system with staff escalation

---

## Part 3: System-Wide Wellness Architecture

### 3.1 Data Flow for Wellness Monitoring

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       WELLNESS MONITORING SYSTEM                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STUDENT    │     │   MENTOR     │     │   WELLNESS   │     │   STAFF      │
│   INPUTS     │     │   INPUTS     │     │   ENGINE     │     │   ALERTS     │
├──────────────┤     ├──────────────┤     ├──────────────┤     ├──────────────┤
│ • Check-ins  │────▶│ • Capacity   │────▶│ • Calculate  │────▶│ • Dashboard  │
│ • Activity   │     │   settings   │     │   load scores│     │ • Notifs     │
│ • Support    │     │ • Interaction│     │ • Detect     │     │ • Reports    │
│   requests   │     │   logs       │     │   patterns   │     │ • Escalate   │
│ • Progress   │     │ • Feedback   │     │ • Trigger    │     │              │
│              │     │              │     │   responses  │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                │
                                                ▼
                              ┌──────────────────────────────┐
                              │     ADAPTIVE RESPONSES       │
                              ├──────────────────────────────┤
                              │ • Adjust learning pace       │
                              │ • Rebalance mentor loads     │
                              │ • Trigger check-ins          │
                              │ • Enable quiet modes         │
                              │ • Celebrate milestones       │
                              └──────────────────────────────┘
```

### 3.2 Database Schema Additions

```
NEW TABLES:

┌──────────────────────┐       ┌──────────────────────┐
│   WELLNESS_CHECKINS  │       │   LOAD_SNAPSHOTS     │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │       │ userId (FK)          │
│ userType (student/   │       │ userType             │
│   mentor)            │       │ loadScore            │
│ stressLevel (1-5)    │       │ domainBreakdown      │
│ energyLevel (1-5)    │       │ thresholdStatus      │
│ overwhelmRating (1-5)│       │ snapshotDate         │
│ notes (optional)     │       └──────────────────────┘
│ createdAt            │
└──────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│   MENTOR_CAPACITY    │       │  ADAPTIVE_SETTINGS   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ mentorId (FK)        │       │ userId (FK)          │
│ baseCapacity         │       │ userType             │
│ currentLoad          │       │ quietModeEnabled     │
│ maxStudents          │       │ notificationLevel    │
│ availableHours       │       │ pacingPreference     │
│ recoveryModeUntil    │       │ boundarySettings     │
│ lastUpdated          │       │ updatedAt            │
└──────────────────────┘       └──────────────────────┘

┌──────────────────────┐
│ STUDENT_COMPLEXITY   │
├──────────────────────┤
│ id (PK)              │
│ studentId (FK)       │
│ complexityScore      │
│ factors (JSON)       │
│ lastAssessed         │
│ assessedBy           │
└──────────────────────┘
```

### 3.3 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/wellness/checkin` | POST | Submit wellness check-in (student or mentor) |
| `/api/wellness/load/:userId` | GET | Get current load score and breakdown |
| `/api/wellness/history/:userId` | GET | Get load history for trend analysis |
| `/api/mentor/capacity` | GET/PUT | View/update mentor capacity settings |
| `/api/mentor/recovery` | POST | Enable recovery mode |
| `/api/student/complexity/:id` | GET/PUT | View/update student complexity score |
| `/api/adaptive/settings` | GET/PUT | View/update adaptive UI settings |
| `/api/admin/wellness-dashboard` | GET | Staff view of all wellness metrics |

---

## Part 4: Implementation Roadmap

### Phase 1: Foundation (Month 1)

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Schema & API | New database tables, basic CRUD endpoints |
| 2 | Student Check-In | Weekly check-in UI component, storage |
| 3 | Load Calculation | Algorithm implementation, initial scoring |
| 4 | Basic Visualization | Load meters for student and mentor dashboards |

### Phase 2: Adaptive Features (Month 2)

| Week | Focus | Deliverables |
|------|-------|--------------|
| 5 | Mentor Capacity | Capacity settings, complexity scoring |
| 6 | Smart Matching | Student-mentor matching algorithm |
| 7 | Quiet Mode | Notification throttling, simplified UI mode |
| 8 | Auto-Pacing | Learning module pacing based on load |

### Phase 3: Advanced Wellness (Month 3)

| Week | Focus | Deliverables |
|------|-------|--------------|
| 9 | Pattern Detection | Trend analysis, early warning alerts |
| 10 | Recovery Features | Mentor recovery mode, student break scheduling |
| 11 | Staff Dashboard | Admin wellness overview, escalation tools |
| 12 | Celebration System | Milestone rewards, impact summaries |

---

## Part 5: Success Metrics

### Student Wellness Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Overwhelm incidents | < 2 per student per quarter | Red-level load events |
| Learning completion | > 70% module completion rate | Progress tracking |
| Support response time | < 24 hours for urgent requests | Ticket timestamps |
| Retention | > 85% program retention | Active vs. dropped students |
| Self-reported wellbeing | Average > 3.5 / 5 | Check-in responses |

### Mentor Wellness Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Capacity utilization | 60-80% average | Load / capacity ratio |
| Burnout incidents | 0 per quarter | Recovery mode triggers |
| Mentor retention | > 90% annually | Active mentor count |
| Response satisfaction | > 4 / 5 student rating | Feedback surveys |
| Engagement | > 2 interactions per mentee per month | Activity logs |

---

## Part 6: Research Foundation

This plan draws from established psychophysics and cognitive science research:

1. **Weber-Fechner Law** - Ernst Weber (1834), Gustav Fechner (1860)
2. **Cognitive Load Theory** - John Sweller (1988)
3. **Signal Detection Theory** - Green & Swets (1966)
4. **Compassion Fatigue Research** - Charles Figley (1995)
5. **Self-Determination Theory** - Deci & Ryan (1985)
6. **Stress Inoculation Training** - Donald Meichenbaum (1985)

---

## Summary

By applying psychophysics principles to the Better Youth Hub platform, we can:

**For Students:**
- Detect early signs of overwhelm before crisis
- Automatically adjust expectations based on total life load
- Create a sustainable path through learning animation/film skills
- Reduce dropout and improve outcomes

**For Mentors:**
- Prevent burnout through capacity-aware matching
- Respect emotional bandwidth limits
- Provide control over boundaries and commitments
- Sustain long-term volunteer engagement

The result is a platform that actively protects the wellbeing of everyone involved while still achieving the mission of preparing at-risk youth for careers in creative industries.

---

*Better Youth Hub - Psychophysics Wellness Plan*  
*Version 1.0*
