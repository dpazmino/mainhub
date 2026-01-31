# Psychophysics Wellness System: Risks and Ethical Considerations

## Overview

This document examines the potential risks, ethical concerns, and necessary safeguards for implementing a psychophysics-based wellness monitoring system in the Better Youth Hub platform. Given that we are serving vulnerable populations (at-risk youth in foster care), we must approach this implementation with exceptional care.

---

## Part 1: The Non-Deterministic Nature of Human Experience

### 1.1 What Psychophysics Can and Cannot Predict

Psychophysics provides reliable laws about perception under controlled conditions. However, applying these principles to real-world human behavior introduces fundamental uncertainty:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DETERMINISM VS. REALITY                                   │
└─────────────────────────────────────────────────────────────────────────────┘

PSYCHOPHYSICS THEORY              HUMAN REALITY
(Controlled, Deterministic)       (Complex, Non-Deterministic)

┌──────────────────────┐          ┌──────────────────────┐
│ "Stimulus X produces │          │ Same stimulus may    │
│  response Y in       │    ≠     │ produce different    │
│  predictable ways"   │          │ responses based on:  │
└──────────────────────┘          │ • Mood               │
                                  │ • History            │
                                  │ • Relationships      │
                                  │ • Culture            │
                                  │ • Trauma             │
                                  │ • Time of day        │
                                  │ • Unknown factors    │
                                  └──────────────────────┘
```

### 1.2 Sources of Unpredictability

| Factor | Description | Impact on System |
|--------|-------------|------------------|
| **Individual variation** | Each person has unique thresholds and responses | One-size-fits-all algorithms will fail for many |
| **Context sensitivity** | The same workload feels different depending on circumstances | Static calculations miss dynamic reality |
| **Emotional complexity** | Humans experience multiple, conflicting emotions simultaneously | Simple scales cannot capture this richness |
| **Trauma responses** | Past experiences shape present perceptions unpredictably | Algorithm cannot know what it doesn't know |
| **Growth and change** | People's capacities evolve over time | Yesterday's limit isn't today's limit |
| **Social dynamics** | Relationships affect stress perception | Cannot be reduced to individual metrics |

### 1.3 The Measurement Problem

When we ask students to self-report their stress levels, we face fundamental challenges:

- **Alexithymia**: Some people struggle to identify or describe their emotions
- **Social desirability**: Youth may report what they think adults want to hear
- **Trust barriers**: Foster youth have reasons to distrust institutional monitoring
- **Cultural differences**: Stress expression varies across cultures
- **State vs. trait**: Momentary feelings may not reflect underlying patterns

---

## Part 2: Potential Harms to Students

### 2.1 Direct Harms

#### Harm 1: Algorithmic Mislabeling

**Risk:** The system incorrectly categorizes a student's capacity.

| Type | Description | Consequence |
|------|-------------|-------------|
| **False Negative** | System says student is fine when they're struggling | Student doesn't receive needed support, may drop out or crisis |
| **False Positive** | System says student is overwhelmed when they're capable | Student is held back, loses opportunities, feels patronized |

**Real Example:** A student scores "Green" on the load meter because they've learned to mask their struggles. Staff assumes they're fine. The student drops out without warning.

#### Harm 2: Self-Fulfilling Prophecy

**Risk:** Labels become reality.

- A student labeled "high complexity" may internalize that identity
- A student told they're "at capacity" may stop pushing themselves
- Mentors may unconsciously treat "high load" students as less capable

**Research Note:** Rosenthal's Pygmalion Effect demonstrates that expectations shape outcomes. Algorithmic labels can function like teacher expectations.

#### Harm 3: Learned Helplessness

**Risk:** Students rely on the system instead of developing their own resilience.

- They wait for the system to tell them when to rest instead of listening to their bodies
- They expect external regulation instead of building self-regulation
- They lose agency over their own experience

#### Harm 4: Privacy and Surveillance

**Risk:** Wellness monitoring becomes surveillance.

- Students may feel watched and judged
- Data could be used against them in unintended ways
- Foster youth have experienced institutional control; this may trigger trauma
- Power imbalance between youth and administrators is amplified

#### Harm 5: Dehumanization

**Risk:** Reducing complex human experience to numbers feels invalidating.

- "Your load score is 67" doesn't capture the grief of losing a foster placement
- Algorithms cannot hold space for the complexity of trauma
- Quantification can trivialize suffering

### 2.2 Systemic Harms

#### Harm 6: Algorithmic Bias

**Risk:** The algorithm may disadvantage certain groups.

| Potential Bias | How It Could Manifest |
|----------------|----------------------|
| **Cultural** | Students from cultures that discourage self-disclosure score artificially low on stress |
| **Gender** | System calibrated on data that doesn't reflect gendered differences in stress expression |
| **Neurodivergent** | Students with autism or ADHD may be systematically miscategorized |
| **Trauma patterns** | Hypervigilant students may appear "fine" while actually in distress |

#### Harm 7: Resource Allocation Inequity

**Risk:** System creates winners and losers.

- Students who "game" the system get more resources
- Students who struggle to articulate needs get less support
- Mentors may be assigned to "easy" students, leaving complex students underserved

#### Harm 8: Mission Drift

**Risk:** Focus shifts from relationships to metrics.

- Staff optimize for load scores instead of genuine connection
- "Improving numbers" replaces "improving lives"
- The quantifiable crowds out the meaningful

---

## Part 3: Potential Harms to Mentors

### 3.1 Direct Mentor Harms

| Harm | Description |
|------|-------------|
| **Guilt from declining** | System says they have "capacity" but they feel exhausted; declining feels like failure |
| **Reduced autonomy** | Algorithmic matching overrides mentor preferences and intuition |
| **Devalued expertise** | Their years of experience reduced to a "complexity score" |
| **Surveillance anxiety** | Feeling watched and evaluated by the system |
| **Compassion conflict** | Told to take "recovery mode" when a student needs them |

### 3.2 Relationship Harms

| Harm | Description |
|------|-------------|
| **Algorithmic pairing failures** | System matches mentor-student pairs that don't click |
| **Interrupted attachments** | "Rebalancing" disrupts established relationships |
| **Transactional framing** | Mentoring becomes about capacity utilization, not connection |

---

## Part 4: Ethical Framework

### 4.1 Core Principles

Any wellness monitoring system for vulnerable youth must adhere to:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ETHICAL PRINCIPLES                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│    BENEFICENCE       │   │    NON-MALEFICENCE   │   │      AUTONOMY        │
│                      │   │                      │   │                      │
│ System must actively │   │ System must not      │   │ Students and mentors │
│ improve wellbeing,   │   │ cause harm, even     │   │ must have meaningful │
│ not just monitor it  │   │ with good intentions │   │ control over their   │
│                      │   │                      │   │ participation        │
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘

┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│      JUSTICE         │   │    TRANSPARENCY      │   │      HUMILITY        │
│                      │   │                      │   │                      │
│ Benefits and burdens │   │ How the system works │   │ Acknowledge limits   │
│ must be distributed  │   │ must be clear and    │   │ of algorithmic       │
│ fairly               │   │ understandable       │   │ understanding        │
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

### 4.2 The Primacy of Relationship

Technology should support, never replace, human connection.

**Key Principle:** No algorithmic output should override the judgment of a caring adult who knows the student.

```
HIERARCHY OF TRUST:

1. Student's own voice and expressed needs (highest)
2. Mentor/staff who knows the student personally
3. Patterns observed over time by caring adults
4. Algorithmic analysis (lowest, informational only)
```

---

## Part 5: Required Safeguards

### 5.1 Consent and Opt-Out

| Requirement | Implementation |
|-------------|----------------|
| **Informed consent** | Clear explanation of what's tracked, why, and how it's used |
| **Voluntary participation** | Wellness tracking is optional; opting out has no consequences |
| **Easy withdrawal** | One-click to stop tracking at any time |
| **Age-appropriate consent** | Foster care caseworkers cannot consent on behalf of youth |
| **Ongoing consent** | Regular check-ins to reaffirm participation |

### 5.2 Human Override

| Requirement | Implementation |
|-------------|----------------|
| **Staff override** | Any staff member can override any algorithmic decision |
| **Student appeal** | Students can dispute their load score or categorization |
| **Mentor discretion** | Mentors can accept students outside their "capacity" if they choose |
| **No automatic actions** | System recommends; humans decide |

### 5.3 Transparency

| Requirement | Implementation |
|-------------|----------------|
| **Explainable scores** | Students see exactly why their load is what it is |
| **Algorithm publication** | Full documentation of how calculations work |
| **No hidden factors** | Nothing influences decisions that isn't visible |
| **Data access** | Students can see all data collected about them |

### 5.4 Data Protection

| Requirement | Implementation |
|-------------|----------------|
| **Minimal collection** | Only collect what's necessary |
| **Purpose limitation** | Data used only for wellness support, nothing else |
| **Retention limits** | Data deleted after defined period |
| **Access controls** | Strict limits on who sees what |
| **No external sharing** | Wellness data never shared outside the organization |
| **Breach protocols** | Clear plan if data is compromised |

### 5.5 Equity Audits

| Requirement | Implementation |
|-------------|----------------|
| **Demographic analysis** | Regular review of outcomes by race, gender, disability |
| **Disparity investigation** | If patterns emerge, investigate and correct |
| **Community input** | Foster youth advisory board reviews system |
| **External audit** | Annual third-party review of algorithmic fairness |

### 5.6 Floor, Not Ceiling

| Requirement | Implementation |
|-------------|----------------|
| **Support, don't limit** | Use data to provide more support, never to deny opportunities |
| **No gatekeeping** | High load score doesn't prevent access to programs |
| **Growth mindset** | Recognize that capacity can expand with support |
| **Avoid labels** | Don't categorize students in fixed ways |

---

## Part 6: Governance and Accountability

### 6.1 Oversight Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GOVERNANCE STRUCTURE                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                          ETHICS BOARD                                        │
│  (External experts, foster care alumni, youth advocates)                     │
│  - Annual review of system impact                                            │
│  - Authority to pause or modify system                                       │
└────────────────────────────────────┬─────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       YOUTH ADVISORY COUNCIL                                 │
│  (Current and former participants)                                           │
│  - Quarterly feedback on system experience                                   │
│  - Input on changes and new features                                         │
└────────────────────────────────────┬─────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         STAFF WELLNESS COMMITTEE                             │
│  (Program staff, mentors, social workers)                                    │
│  - Ongoing monitoring of system use                                          │
│  - First responders to concerns                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Decision Rights

| Decision | Who Decides |
|----------|-------------|
| Whether to use wellness system at all | Ethics Board + Youth Council |
| Algorithm changes | Staff Committee with Ethics Board approval |
| Individual student interventions | Staff who know the student |
| Mentor capacity assignments | Mentor themselves |
| System pause or discontinuation | Ethics Board |

### 6.3 Accountability Mechanisms

| Mechanism | Purpose |
|-----------|---------|
| **Incident reporting** | Clear process for reporting harms |
| **Root cause analysis** | When harms occur, understand why |
| **Remediation plans** | Concrete steps to address identified harms |
| **Public reporting** | Annual report on system outcomes (anonymized) |
| **Sunset provisions** | System automatically pauses if harm thresholds exceeded |

---

## Part 7: Alternative Approaches

If the risks outweigh benefits, consider alternatives:

### 7.1 Relationship-First Model

Instead of algorithmic monitoring:
- Small caseloads so staff can know students deeply
- Regular 1:1 check-ins (human, not app-based)
- Mentor training in recognizing distress
- Open-door policies for students to self-advocate

### 7.2 Student-Driven Tools

Instead of system-driven monitoring:
- Optional self-reflection tools students can use privately
- No data stored or shared
- Resources available but not pushed
- Student controls what they share and with whom

### 7.3 Structural Interventions

Instead of monitoring individual stress:
- Reduce actual stressors (transportation, food insecurity)
- Increase resources (more mentors, smaller cohorts)
- Systemic advocacy (foster care policy reform)
- Community building (peer support networks)

---

## Part 8: Red Lines

### 8.1 Things We Will Never Do

| Red Line | Rationale |
|----------|-----------|
| Use wellness data for disciplinary decisions | Violates trust, deters honest reporting |
| Share data with foster care agencies without explicit consent | Could harm placement or services |
| Deny opportunities based on load scores | Creates perverse incentives |
| Automate decisions about student support | Humans must always be in the loop |
| Score or rank students against each other | Not a competition |
| Use data for marketing or fundraising | Exploits vulnerability |

### 8.2 Conditions for Discontinuation

The system should be discontinued if:

- Students report feeling surveilled or unsafe
- Disparities emerge that cannot be corrected
- Staff use data in ways that harm students
- The focus shifts from relationships to metrics
- Youth Advisory Council recommends discontinuation
- Harms outweigh demonstrated benefits

---

## Part 9: Honest Assessment

### 9.1 What We Don't Know

- Whether this approach will actually reduce overwhelm
- Whether the benefits will outweigh the harms
- How students will experience being "monitored"
- Whether our algorithms will be fair across diverse populations
- How this will affect mentor-student relationships

### 9.2 What We're Betting On

- That early detection can prevent crisis
- That transparency and control will mitigate surveillance concerns
- That caring humans will use data wisely
- That we can course-correct as we learn

### 9.3 The Core Question

**Should we build this at all?**

This is not a rhetorical question. The answer should come from:
- Foster care alumni who can speak to their experiences with institutional monitoring
- Youth currently in the program who can share their preferences
- Ethicists who specialize in vulnerable populations
- The organization's leadership weighing mission against risk

The technology is possible. Whether it's wise is a human question.

---

## Conclusion

Psychophysics-based wellness monitoring offers potential benefits but carries real risks, especially for vulnerable youth who have experienced institutional control and trauma.

If we proceed, we must:
1. Center student voice and autonomy
2. Maintain human relationships as primary
3. Build robust safeguards and governance
4. Accept uncertainty and remain humble
5. Be willing to stop if harms emerge

The goal is not to perfect an algorithm. The goal is to help young people thrive. If the algorithm serves that goal, we keep it. If it doesn't, we let it go.

---

*Better Youth Hub - Ethics and Risks Document*  
*Version 1.0*
