import { db } from "./db";
import { students, studentGoals, studentSkills, placements, studentOutcomes, mentors } from "@shared/schema";
import fs from "fs";
import path from "path";

function parseBool(v: string): boolean {
  return v.trim().toLowerCase() === "true";
}

function parseNum(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function parseNullable(v: string): string | null {
  const t = v.trim();
  return t === "" || t.toLowerCase() === "null" ? null : t;
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out;
}

function parseCsv<T>(csv: string, mapRow: (row: Record<string, string>) => T): T[] {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return mapRow(row);
  });
}

async function seedDatabase() {
  console.log("Starting database seed...");

  // Read CSV files
  const studentsCsv = fs.readFileSync(
    path.join(process.cwd(), "attached_assets/student_synthetic_1769631587193.csv"),
    "utf-8"
  );
  const goalsCsv = fs.readFileSync(
    path.join(process.cwd(), "attached_assets/student_goal_1769631587191.csv"),
    "utf-8"
  );
  const skillsCsv = fs.readFileSync(
    path.join(process.cwd(), "attached_assets/student_skill_1769631587192.csv"),
    "utf-8"
  );
  const placementsCsv = fs.readFileSync(
    path.join(process.cwd(), "attached_assets/placements_1769631587189.csv"),
    "utf-8"
  );
  const outcomesCsv = fs.readFileSync(
    path.join(process.cwd(), "attached_assets/student_ouctome_1769631587190.csv"),
    "utf-8"
  );
  const mentorsCsv = fs.readFileSync(
    path.join(process.cwd(), "attached_assets/mentor_synthetic_1769631587192.csv"),
    "utf-8"
  );

  // Parse students
  const studentData = parseCsv(studentsCsv, (r) => ({
    id: r.student_id,
    userId: null,
    ageRange: r.age_range,
    enrollmentDate: r.enrollment_date,
    email: r.email,
    phone: r.phone,
    gradeLevel: r.grade_level,
    schoolType: r.school_type,
    emergencyContact: r.emergency_contact,
    hasIep: parseBool(r.has_iep),
    primaryLanguage: r.primary_language,
    transportationNeeds: parseBool(r.transportation_needs),
    photoConsent: parseBool(r.photo_consent),
    status: r.status,
  }));

  // Parse goals
  const goalData = parseCsv(goalsCsv, (r) => ({
    id: r.goal_id,
    studentId: r.student_id,
    goalType: r.goal_type,
    goalTitle: r.goal_title,
    description: r.description,
    startDate: r.start_date,
    targetCompletionDate: r.target_completion_date,
    actualCompletionDate: parseNullable(r.actual_completion_date),
    priority: r.priority,
    progressPercentage: parseNum(r.progress_percentage),
    milestonesTotal: parseNum(r.milestones_total),
    milestonesCompleted: parseNum(r.milestones_completed),
    mentorAssignedId: r.mentor_assigned_id,
    staffAssignedId: r.staff_assigned_id,
    programId: r.program_id,
    barriersIdentified: parseNullable(r.barriers_identified),
    supportNeeded: r.support_needed,
    lastReviewDate: r.last_review_date,
    nextReviewDate: r.next_review_date,
    notes: r.notes,
    status: r.status,
  }));

  // Parse skills
  const skillData = parseCsv(skillsCsv, (r) => ({
    id: r.student_skill_id,
    studentId: r.student_id,
    skillId: r.skill_id,
    skillName: r.skill_id, // Using skill_id as name for now
    initialAssessmentDate: r.initial_assessment_date,
    initialProficiencyLevel: r.initial_proficiency_level,
    currentProficiencyLevel: r.current_proficiency_level,
    targetProficiencyLevel: r.target_proficiency_level,
    lastAssessmentDate: r.last_assessment_date,
    assessmentScore: parseNum(r.assessment_score),
    hoursPracticed: parseNum(r.hours_practiced),
    projectsCompleted: parseNum(r.projects_completed),
    assessedByStaffId: r.assessed_by_staff_id,
    learningStyle: r.learning_style,
    strengths: r.strengths,
    areasForImprovement: r.areas_for_improvement,
    recommendedNextSteps: r.recommended_next_steps,
    progressNotes: r.progress_notes,
    status: r.status,
  }));

  // Parse placements
  const placementData = parseCsv(placementsCsv, (r) => ({
    id: r.placement_id,
    studentId: r.student_id,
    placementType: r.placement_type,
    employerName: r.employer_name,
    industry: r.industry,
    jobTitle: r.job_title,
    hourlyWage: r.hourly_wage || "0",
    hoursPerWeek: parseNum(r.hours_per_week),
    startDate: r.start_date,
    endDate: parseNullable(r.end_date),
    isCurrent: parseBool(r.is_current),
    betterYouthReferral: parseBool(r.better_youth_referral),
    performanceRating: r.performance_rating,
    benefitsOffered: parseBool(r.benefits_offered),
    careerAdvancementOpportunity: parseBool(r.career_advancement_opportunity),
    supervisorName: r.supervisor_name,
    supervisorPhone: r.supervisor_phone,
    supervisorEmail: r.supervisor_email,
    mentorAtWorkplace: parseBool(r.mentor_at_workplace),
    skillsMatchTraining: parseBool(r.skills_match_training),
    placementNotes: r.placement_notes,
    status: r.status,
  }));

  // Parse outcomes
  const outcomeData = parseCsv(outcomesCsv, (r) => ({
    id: r.outcome_id,
    studentId: r.student_id,
    metricId: r.metric_id,
    measurementDate: r.measurement_date,
    measurementPeriod: r.measurement_period,
    value: parseNum(r.value),
    previousValue: parseNum(r.previous_value),
    targetValue: parseNum(r.target_value),
    targetMet: parseBool(r.target_met),
    improvementFromBaseline: parseNum(r.improvement_from_baseline),
    percentileRank: parseNum(r.percentile_rank),
    assessedByStaffId: r.assessed_by_staff_id,
    assessmentMethod: r.assessment_method,
    confidenceLevel: r.confidence_level,
    supportingEvidence: r.supporting_evidence,
    contextNotes: r.context_notes,
    programId: r.program_id,
    cohortId: r.cohort_id,
    followUpRequired: parseBool(r.follow_up_required),
    interventionRecommended: parseNullable(r.intervention_recommended),
    dataQualityFlag: r.data_quality_flag,
  }));

  // Parse mentors
  const mentorData = parseCsv(mentorsCsv, (r) => ({
    id: r.mentor_id,
    userId: null,
    email: r.email,
    phone: r.phone,
    mentorType: r.mentor_type,
    industry: r.industry,
    companyType: r.company_type,
    roleCategory: r.role_category,
    yearsExperience: parseNum(r.years_experience),
    skillsOffered: r.skills_offered,
    availability: r.availability,
    maxMentees: parseNum(r.max_mentees),
    currentMentees: parseNum(r.current_mentees),
    backgroundCheckStatus: r.background_check_status,
    trainingCompleted: parseBool(r.training_completed),
    startDate: r.start_date,
    status: r.status,
  }));

  // Insert data in order
  console.log(`Inserting ${studentData.length} students...`);
  if (studentData.length > 0) {
    await db.insert(students).values(studentData).onConflictDoNothing();
  }

  console.log(`Inserting ${goalData.length} goals...`);
  if (goalData.length > 0) {
    await db.insert(studentGoals).values(goalData).onConflictDoNothing();
  }

  console.log(`Inserting ${skillData.length} skills...`);
  if (skillData.length > 0) {
    await db.insert(studentSkills).values(skillData).onConflictDoNothing();
  }

  console.log(`Inserting ${placementData.length} placements...`);
  if (placementData.length > 0) {
    await db.insert(placements).values(placementData).onConflictDoNothing();
  }

  console.log(`Inserting ${outcomeData.length} outcomes...`);
  if (outcomeData.length > 0) {
    await db.insert(studentOutcomes).values(outcomeData).onConflictDoNothing();
  }

  console.log(`Inserting ${mentorData.length} mentors...`);
  if (mentorData.length > 0) {
    await db.insert(mentors).values(mentorData).onConflictDoNothing();
  }

  console.log("Database seed completed!");
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
